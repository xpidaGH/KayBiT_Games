import React from 'react';
import { ProjectId, I18nLangCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/translations';
import { BookOpen, Globe, Cpu } from 'lucide-react';

interface NavbarProps {
  currentProject: ProjectId | 'splash' | 'matrix';
  onSelectProject: (id: ProjectId | 'splash' | 'matrix') => void;
  onOpenUserGuide: () => void;
  currentLang: I18nLangCode;
  onChangeLang: (lang: I18nLangCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProject,
  onSelectProject,
  onOpenUserGuide,
  currentLang,
  onChangeLang,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectProject('splash')}
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <Cpu className="w-5 h-5 text-cyan-400" />
          <span className="font-display">KayBiT_Games</span>
        </button>

        {/* Zone 2: 4–6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectProject('voxel')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'voxel' ? 'text-emerald-400 bg-emerald-950/40 font-semibold' : 'hover:text-white'
            }`}
          >
            01. Voxel Engine
          </button>
          <button
            onClick={() => onSelectProject('pipeline')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'pipeline' ? 'text-amber-400 bg-amber-950/40 font-semibold' : 'hover:text-white'
            }`}
          >
            02. Item Pipeline
          </button>
          <button
            onClick={() => onSelectProject('procedural')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'procedural' ? 'text-cyan-400 bg-cyan-950/40 font-semibold' : 'hover:text-white'
            }`}
          >
            03. Procedural State
          </button>
          <button
            onClick={() => onSelectProject('kinematic')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'kinematic' ? 'text-rose-400 bg-rose-950/40 font-semibold' : 'hover:text-white'
            }`}
          >
            04. Kinematic Compiler
          </button>
          <button
            onClick={() => onSelectProject('sandbox')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'sandbox' ? 'text-violet-400 bg-violet-950/40 font-semibold' : 'hover:text-white'
            }`}
          >
            05. Sandboxed VM
          </button>
          <button
            onClick={() => onSelectProject('economy')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'economy' ? 'text-teal-400 bg-teal-950/40 font-semibold' : 'hover:text-white'
            }`}
          >
            06. World Economy
          </button>
          <button
            onClick={() => onSelectProject('matrix')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'matrix' ? 'text-indigo-400 bg-indigo-950/40 font-semibold' : 'hover:text-white'
            }`}
          >
            Tech Matrix (21)
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 21 Languages Selector */}
          <div className="relative flex items-center">
            <Globe className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
            <select
              value={currentLang}
              onChange={(e) => onChangeLang(e.target.value as I18nLangCode)}
              aria-label="Select international language"
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 hover:border-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors cursor-pointer appearance-none"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-100">
                  {lang.flag} {lang.nativeLabel} ({lang.label})
                </option>
              ))}
            </select>
          </div>

          {/* User Guide Action Button */}
          <button
            onClick={onOpenUserGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>User Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
};
