import { useState, useEffect, useCallback } from 'react';
import { I18nLangCode, TTSPlaybackState } from '../types';
import { ttsEngine } from '../utils/ttsEngine';

export function useTTS(defaultLang: I18nLangCode = 'en') {
  const [playbackState, setPlaybackState] = useState<TTSPlaybackState>(ttsEngine.getState());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [rate, setRate] = useState<number>(1.0);
  const [activeVoiceName, setActiveVoiceName] = useState<string>('');

  useEffect(() => {
    // Subscribe to engine state changes
    const unsubState = ttsEngine.onStateChange((newState) => {
      setPlaybackState(newState);
    });

    // Subscribe to voice updates
    const unsubVoices = ttsEngine.onVoicesLoaded((loadedVoices) => {
      setVoices(loadedVoices);
      const best = ttsEngine.findBestVoice(defaultLang);
      if (best) {
        setActiveVoiceName(best.name);
      }
    });

    const initialVoices = ttsEngine.getVoices();
    if (initialVoices.length > 0) {
      setVoices(initialVoices);
      const best = ttsEngine.findBestVoice(defaultLang);
      if (best) {
        setActiveVoiceName(best.name);
      }
    }

    return () => {
      unsubState();
      unsubVoices();
    };
  }, [defaultLang]);

  // Update matched voice when defaultLang changes
  useEffect(() => {
    const best = ttsEngine.findBestVoice(defaultLang);
    if (best) {
      setActiveVoiceName(best.name);
    }
  }, [defaultLang, voices]);

  const speak = useCallback(
    (text: string, lang: I18nLangCode = defaultLang) => {
      ttsEngine.speak(text, lang, rate);
    },
    [defaultLang, rate]
  );

  const pause = useCallback(() => {
    ttsEngine.pause();
  }, []);

  const resume = useCallback(() => {
    ttsEngine.resume();
  }, []);

  const stop = useCallback(() => {
    ttsEngine.stop();
  }, []);

  return {
    playbackState,
    isSpeaking: playbackState === 'playing',
    isPaused: playbackState === 'paused',
    voices,
    activeVoiceName,
    rate,
    setRate,
    speak,
    pause,
    resume,
    stop,
    isAvailable: ttsEngine.isAvailable(),
  };
}
