import React from 'react';
import { I18nLangCode } from '../types';
import { useTTS } from '../hooks/useTTS';
import { AUDIO_VISUALIZER_BARS } from '../data/assets';
import { Play, Pause, Square, Volume2, VolumeX, FastForward } from 'lucide-react';
import { LANGUAGE_VOICES } from '../data/voiceConfig';

interface TTSControlBarProps {
  currentLang: I18nLangCode;
  textToRead: string;
  title?: string;
  compact?: boolean;
}

export const TTSControlBar: React.FC<TTSControlBarProps> = ({
  currentLang,
  textToRead,
  title = 'Read Aloud Guide',
  compact = false,
}) => {
  const { isSpeaking, isPaused, rate, setRate, speak, pause, resume, stop, activeVoiceName, isAvailable } =
    useTTS(currentLang);

  if (!isAvailable) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-500">
        <VolumeX className="w-3.5 h-3.5" />
        <span>Text-to-Speech not supported in this browser.</span>
      </div>
    );
  }

  const langDef = LANGUAGE_VOICES[currentLang] || LANGUAGE_VOICES.en;

  const handlePlayToggle = () => {
    if (isSpeaking) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      speak(textToRead, currentLang);
    }
  };

  const handleStop = () => {
    stop();
  };

  const cycleRate = () => {
    const nextRate = rate === 1.0 ? 1.25 : rate === 1.25 ? 1.5 : rate === 1.5 ? 0.75 : 1.0;
    setRate(nextRate);
    if (isSpeaking) {
      speak(textToRead, currentLang);
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800/90 shadow-sm ${
        compact ? 'text-xs' : 'text-xs sm:text-sm'
      }`}
    >
      {/* Left: Speaker Status & Visualizer */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
            isSpeaking
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          <Volume2 className="w-4 h-4" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-white truncate">{title}</span>
            <span className="text-xs px-1.5 py-0.2 rounded bg-slate-800 text-cyan-400 font-mono">
              {langDef.name}
            </span>
          </div>

          <div className="text-[11px] text-slate-400 truncate flex items-center gap-1">
            <span>Voice: {activeVoiceName || `${langDef.name} System Voice`}</span>
          </div>
        </div>
      </div>

      {/* Middle: Sound Wave Bars when active */}
      {isSpeaking && (
        <div className="hidden sm:flex items-center gap-1 px-2">
          {AUDIO_VISUALIZER_BARS.map((bar, idx) => (
            <div
              key={idx}
              className="w-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                height: `${bar.maxHeight}px`,
                animationDelay: bar.delay,
                animationDuration: '600ms',
              }}
            />
          ))}
        </div>
      )}

      {/* Right: Audio Playback Action Buttons */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Speed toggle */}
        <button
          onClick={cycleRate}
          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-[11px] transition-colors flex items-center gap-0.5"
          title="Playback Rate"
        >
          <FastForward className="w-3 h-3" />
          <span>{rate}x</span>
        </button>

        {/* Play / Pause button */}
        <button
          onClick={handlePlayToggle}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isSpeaking
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
          }`}
          title={isSpeaking ? 'Pause' : isPaused ? 'Resume' : 'Speak aloud'}
        >
          {isSpeaking ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{isPaused ? 'Resume' : 'Play'}</span>
            </>
          )}
        </button>

        {/* Stop button */}
        {(isSpeaking || isPaused) && (
          <button
            onClick={handleStop}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-400 transition-colors"
            title="Stop playback"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
