import React, { useState } from 'react';
import { PLATFORM_INSTALL_GUIDES } from '../data/config';
import { PLATFORM_ICONS } from '../data/assets';
import { X, Copy, Check, Download, ShieldCheck, Terminal, FileCode } from 'lucide-react';

interface InstallationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallationModal: React.FC<InstallationModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlatformId, setSelectedPlatformId] = useState<'android' | 'ios' | 'windows' | 'macos' | 'pwa'>('android');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentGuide =
    PLATFORM_INSTALL_GUIDES.find((g) => g.id === selectedPlatformId) || PLATFORM_INSTALL_GUIDES[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadInstallScript = () => {
    const scriptContent = `#!/bin/bash
# KayBiT_Games Native Installer & Build Automation Script
# Platform: ${currentGuide.name} (${currentGuide.format})
echo "=========================================================="
echo "KayBiT_Games: Deploying for ${currentGuide.name}..."
echo "=========================================================="

npm run build
${currentGuide.commandSnippets.map((c) => c.command).join('\n')}

echo "Build complete! Check platform output directory."
`;

    const blob = new Blob([scriptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `build-${currentGuide.id}.sh`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display text-white">
                  Native Installation & Downloads
                </h2>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  INSTALLATION.md
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Deploy as a standalone native app across Android, iOS, Windows, macOS, and PWA.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadInstallScript}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
              title="Download Build Script"
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>Get Build Script</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/60 flex flex-wrap gap-2">
          {PLATFORM_INSTALL_GUIDES.map((guide) => {
            const IconComponent =
              guide.id === 'android'
                ? PLATFORM_ICONS.android
                : guide.id === 'ios'
                ? PLATFORM_ICONS.apple
                : guide.id === 'windows'
                ? PLATFORM_ICONS.windows
                : guide.id === 'macos'
                ? PLATFORM_ICONS.macos
                : PLATFORM_ICONS.pwa;

            const isSelected = guide.id === selectedPlatformId;

            return (
              <button
                key={guide.id}
                onClick={() => setSelectedPlatformId(guide.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-750'
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span>{guide.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isSelected ? 'bg-slate-950/30 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                  {guide.format}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-xs sm:text-sm text-slate-300">
          {/* Target Profile Card */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">{currentGuide.name}</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono">
                  {currentGuide.badge}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Platform: {currentGuide.platform}</span>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {currentGuide.summary}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>{currentGuide.offlineNotice}</span>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Step-by-Step Packaging Pipeline</span>
            </h3>

            <div className="space-y-2">
              {currentGuide.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Command Line Snippets */}
          {currentGuide.commandSnippets.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">CLI Build Automation Commands</h3>
              {currentGuide.commandSnippets.map((snippet, sIdx) => {
                const copyKey = `cmd-${sIdx}`;
                const isCopied = copiedIndex === copyKey;
                return (
                  <div key={sIdx} className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/50 text-xs">
                      <span className="font-semibold text-slate-300">{snippet.title}</span>
                      <button
                        onClick={() => handleCopy(snippet.command, copyKey)}
                        className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[11px]">{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="p-3.5 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                      {snippet.command}
                    </pre>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Detailed reference in <strong className="text-white">INSTALLATION.md</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
