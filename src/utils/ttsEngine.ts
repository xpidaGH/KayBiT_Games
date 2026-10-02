import { I18nLangCode, TTSPlaybackState } from '../types';
import { LANGUAGE_VOICES } from '../data/voiceConfig';
import { APP_CONFIG } from '../data/config';

type StateChangeListener = (state: TTSPlaybackState) => void;
type VoiceChangeListener = (voices: SpeechSynthesisVoice[]) => void;

class TTSEngine {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private state: TTSPlaybackState = 'idle';
  private currentChunks: string[] = [];
  private currentChunkIndex: number = 0;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private keepAliveTimer: number | null = null;
  private stateListeners: Set<StateChangeListener> = new Set();
  private voiceListeners: Set<VoiceChangeListener> = new Set();
  private currentLanguage: I18nLangCode = 'en';
  private currentRate: number = 1.0;
  private currentPitch: number = 1.0;
  private audioContextUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
    }
  }

  /**
   * Unlock WebKit / Mobile Webview audio session category for background playback
   */
  public unlockAudioContext(): void {
    if (this.audioContextUnlocked || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        this.audioContextUnlocked = true;
      }
    } catch {
      // AudioContext fallback ignored if browser blocks
    }
  }

  private initVoices(): void {
    if (!this.synth) return;

    const populate = () => {
      const loaded = this.synth?.getVoices() || [];
      if (loaded.length > 0) {
        this.voices = loaded;
        this.voiceListeners.forEach((listener) => listener(this.voices));
      }
    };

    populate();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = populate;
    }

    // Polling retry for webviews where onvoiceschanged does not fire promptly
    let attempts = 0;
    const pollInterval = window.setInterval(() => {
      attempts++;
      if (this.voices.length > 0 || attempts >= 8) {
        window.clearInterval(pollInterval);
      } else {
        populate();
      }
    }, 250);
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public getState(): TTSPlaybackState {
    return this.state;
  }

  public onStateChange(listener: StateChangeListener): () => void {
    this.stateListeners.add(listener);
    return () => this.stateListeners.delete(listener);
  }

  public onVoicesLoaded(listener: VoiceChangeListener): () => void {
    this.voiceListeners.add(listener);
    if (this.voices.length > 0) {
      listener(this.voices);
    }
    return () => this.voiceListeners.delete(listener);
  }

  private setState(newState: TTSPlaybackState): void {
    this.state = newState;
    this.stateListeners.forEach((listener) => listener(this.state));
  }

  /**
   * Find closest available system voice for any of the 22 languages
   */
  public findBestVoice(langCode: I18nLangCode): SpeechSynthesisVoice | null {
    if (!this.voices || this.voices.length === 0) return null;
    const def = LANGUAGE_VOICES[langCode] || LANGUAGE_VOICES.en;

    // 1. Exact locale matching (e.g., 'fr-FR', 'zh-CN')
    for (const locale of def.locales) {
      const exact = this.voices.find(
        (v) => v.lang.toLowerCase() === locale.toLowerCase() || v.lang.replace('_', '-').toLowerCase() === locale.toLowerCase()
      );
      if (exact) return exact;
    }

    // 2. Language prefix matching (e.g. 'fr' matches 'fr-CA' or 'fr-BE')
    const primaryPrefix = def.code.toLowerCase();
    const prefixMatch = this.voices.find((v) => v.lang.toLowerCase().startsWith(primaryPrefix));
    if (prefixMatch) return prefixMatch;

    // 3. Fallback voice keyword name search (e.g. "Google français", "Samantha")
    for (const keyword of def.fallbackVoiceKeywords) {
      const nameMatch = this.voices.find((v) => v.name.toLowerCase().includes(keyword.toLowerCase()));
      if (nameMatch) return nameMatch;
    }

    // 4. Default system fallback voice
    return this.voices.find((v) => v.default) || this.voices[0] || null;
  }

  /**
   * Splits long text into natural sentence boundaries to prevent speech freeze bug in WebKit / Blink
   */
  private chunkText(text: string, maxLen: number = APP_CONFIG.speechChunkMaxLength): string[] {
    const cleanText = text
      .replace(/[*#_`~>]/g, '') // Strip Markdown symbols
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return [];

    // Split at natural sentence ends: . ! ? ; \n
    const sentences = cleanText.match(/[^.!?;\n]+[.!?;\n]*/g) || [cleanText];
    const chunks: string[] = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;

      if ((currentChunk + ' ' + trimmed).length <= maxLen) {
        currentChunk = currentChunk ? `${currentChunk} ${trimmed}` : trimmed;
      } else {
        if (currentChunk) chunks.push(currentChunk);
        // If single sentence exceeds maxLen, split at comma or space
        if (trimmed.length > maxLen) {
          const words = trimmed.split(' ');
          let subChunk = '';
          for (const w of words) {
            if ((subChunk + ' ' + w).length <= maxLen) {
              subChunk = subChunk ? `${subChunk} ${w}` : w;
            } else {
              if (subChunk) chunks.push(subChunk);
              subChunk = w;
            }
          }
          if (subChunk) chunks.push(subChunk);
          currentChunk = '';
        } else {
          currentChunk = trimmed;
        }
      }
    }
    if (currentChunk) chunks.push(currentChunk);
    return chunks;
  }

  /**
   * Keep-alive ticker for long speech playback on Chromium / WebKit
   */
  private startKeepAlive(): void {
    this.stopKeepAlive();
    this.keepAliveTimer = window.setInterval(() => {
      if (this.synth && this.synth.speaking && !this.synth.paused) {
        this.synth.pause();
        this.synth.resume();
      }
    }, APP_CONFIG.keepAliveIntervalMs);
  }

  private stopKeepAlive(): void {
    if (this.keepAliveTimer !== null) {
      window.clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  /**
   * Speak arbitrary text in the selected language with automatic chunking and voice matching
   */
  public speak(
    text: string,
    langCode: I18nLangCode = 'en',
    customRate?: number,
    customPitch?: number
  ): void {
    if (!this.synth) {
      console.warn('Web Speech API is not supported in this environment.');
      return;
    }

    this.unlockAudioContext();
    this.stop(); // Clear any ongoing speech

    this.currentLanguage = langCode;
    const def = LANGUAGE_VOICES[langCode] || LANGUAGE_VOICES.en;
    this.currentRate = customRate ?? def.defaultRate;
    this.currentPitch = customPitch ?? def.defaultPitch;

    this.currentChunks = this.chunkText(text);
    this.currentChunkIndex = 0;

    if (this.currentChunks.length === 0) {
      this.setState('idle');
      return;
    }

    this.setState('playing');
    this.startKeepAlive();
    this.speakCurrentChunk();
  }

  private speakCurrentChunk(): void {
    if (!this.synth || this.currentChunkIndex >= this.currentChunks.length) {
      this.stop();
      this.setState('idle');
      return;
    }

    const chunk = this.currentChunks[this.currentChunkIndex];
    const utterance = new SpeechSynthesisUtterance(chunk);
    this.currentUtterance = utterance;

    const voice = this.findBestVoice(this.currentLanguage);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      const def = LANGUAGE_VOICES[this.currentLanguage];
      utterance.lang = def ? def.locales[0] : 'en-US';
    }

    utterance.rate = this.currentRate;
    utterance.pitch = this.currentPitch;

    utterance.onend = () => {
      this.currentChunkIndex++;
      if (this.currentChunkIndex < this.currentChunks.length && this.state === 'playing') {
        this.speakCurrentChunk();
      } else {
        this.stop();
        this.setState('idle');
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('Speech synthesis utterance error:', e.error);
      }
      this.stop();
      this.setState('idle');
    };

    this.synth.speak(utterance);
  }

  public pause(): void {
    if (!this.synth || this.state !== 'playing') return;
    this.synth.pause();
    this.stopKeepAlive();
    this.setState('paused');
  }

  public resume(): void {
    if (!this.synth || this.state !== 'paused') return;
    this.synth.resume();
    this.startKeepAlive();
    this.setState('playing');
  }

  public stop(): void {
    this.stopKeepAlive();
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
    this.currentChunks = [];
    this.currentChunkIndex = 0;
    this.setState('stopped');
  }

  public isAvailable(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

export const ttsEngine = new TTSEngine();
