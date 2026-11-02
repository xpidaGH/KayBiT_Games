import React, { useEffect, useRef } from 'react';
import { UIThemeId } from '../types';
import { THEME_OPTIONS } from '../data/themes';
import { X, Palette, Check, Sparkles, Sliders } from 'lucide-react';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: UIThemeId;
  onSelectTheme: (theme: UIThemeId) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (themeId: UIThemeId) => {
    onSelectTheme(themeId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        // Close when clicking overlay backdrop outside the modal
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 transition-all"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-slate-800"
          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-panel)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: 'var(--bg-canvas)',
                border: '1px solid var(--border-color)',
                color: 'var(--accent-primary)',
              }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display">
                  Theme Settings
                </h2>
                <span
                  className="text-xs px-2 py-0.5 rounded font-mono"
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    color: 'var(--accent-primary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  5 UI Styles
                </span>
              </div>
              <p className="text-xs opacity-75">
                Select an architectural theme variation. Changes apply instantly and persist across reloads.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border transition-colors opacity-75 hover:opacity-100"
            style={{
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--bg-canvas)',
            }}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Variations List */}
        <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
          {THEME_OPTIONS.map((item, index) => {
            const isSelected = item.id === currentTheme;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-4 group cursor-pointer ${
                  isSelected
                    ? 'ring-2 shadow-lg'
                    : 'hover:brightness-105 opacity-90 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: item.previewBg,
                  borderColor: isSelected ? item.previewAccent : 'rgba(128, 128, 128, 0.2)',
                  color: item.previewText,
                  boxShadow: isSelected ? `0 0 0 2px ${item.previewAccent}40` : undefined,
                }}
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/20"
                      style={{ backgroundColor: item.previewAccent }}
                    />
                    <span className="font-bold text-sm tracking-tight">
                      {index + 1}. {item.name}
                    </span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded font-medium border"
                      style={{
                        backgroundColor: item.previewCard,
                        borderColor: 'rgba(128, 128, 128, 0.25)',
                        color: item.previewText,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <p
                    className="text-xs leading-relaxed opacity-85"
                    style={{ color: item.previewText }}
                  >
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-[11px] opacity-75">
                    <span className="font-mono">Font: {item.fontTag}</span>
                    <span>·</span>
                    <span>{item.subtitle}</span>
                  </div>
                </div>

                {/* Right: Selected Status Indicator */}
                <div className="shrink-0 pt-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      isSelected ? 'scale-110' : 'opacity-40 group-hover:opacity-75'
                    }`}
                    style={{
                      backgroundColor: isSelected ? item.previewAccent : 'transparent',
                      borderColor: item.previewAccent,
                      color: isSelected ? (item.id === 'editorial' || item.id === 'warm' ? '#ffffff' : '#020617') : item.previewAccent,
                    }}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="px-6 py-3 border-t flex items-center justify-between text-xs"
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--bg-panel)',
          }}
        >
          <div className="flex items-center gap-1.5 opacity-75">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Active theme: <strong className="capitalize">{currentTheme}</strong></span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:brightness-110"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderColor: 'var(--border-color)',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
