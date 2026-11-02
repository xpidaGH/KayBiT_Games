import React from 'react';
import { ProjectId, I18nLangCode, LearningProgressMap, UIThemeId } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/translations';
import { AppLogo } from './AppLogo';
import { ProgressRing } from './ProgressRing';
import { BookOpen, Globe, Download, Palette } from 'lucide-react';

interface NavbarProps {
  currentProject: ProjectId | 'splash' | 'matrix';
  onSelectProject: (id: ProjectId | 'splash' | 'matrix') => void;
  onOpenUserGuide: () => void;
  onOpenInstall: () => void;
  onOpenThemeModal: () => void;
  currentTheme: UIThemeId;
  currentLang: I18nLangCode;
  onChangeLang: (lang: I18nLangCode) => void;
  // Progress Ring props
  learningProgress: LearningProgressMap;
  completedCount: number;
  totalCount: number;
  percentage: number;
  onToggleModuleCompletion: (id: ProjectId) => void;
  onResetProgress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProject,
  onSelectProject,
  onOpenUserGuide,
  onOpenInstall,
  onOpenThemeModal,
  currentTheme,
  currentLang,
  onChangeLang,
  learningProgress,
  completedCount,
  totalCount,
  percentage,
  onToggleModuleCompletion,
  onResetProgress,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-canvas)]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Multiplatform KBT Spider App Logo with Squircle Mask */}
        <button
          onClick={() => onSelectProject('splash')}
          className="text-left cursor-pointer group shrink-0 focus:outline-none"
          title="Return to Splash Dashboard"
        >
          <AppLogo variant="web" showText={true} />
        </button>

        {/* Zone 2: Navigation Links for the 6 Laboratory Modules & Tech Matrix */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)]">
          <button
            onClick={() => onSelectProject('voxel')}
            className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'voxel' ? 'text-emerald-400 bg-emerald-950/40 font-semibold' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            01. Voxel Engine
          </button>
          <button
            onClick={() => onSelectProject('pipeline')}
            className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'pipeline' ? 'text-amber-400 bg-amber-950/40 font-semibold' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            02. Item Pipeline
          </button>
          <button
            onClick={() => onSelectProject('procedural')}
            className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'procedural' ? 'text-cyan-400 bg-cyan-950/40 font-semibold' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            03. Procedural State
          </button>
          <button
            onClick={() => onSelectProject('kinematic')}
            className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'kinematic' ? 'text-rose-400 bg-rose-950/40 font-semibold' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            04. Kinematic Compiler
          </button>
          <button
            onClick={() => onSelectProject('sandbox')}
            className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'sandbox' ? 'text-violet-400 bg-violet-950/40 font-semibold' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            05. Sandboxed VM
          </button>
          <button
            onClick={() => onSelectProject('economy')}
            className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'economy' ? 'text-teal-400 bg-teal-950/40 font-semibold' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            06. World Economy
          </button>
          <button
            onClick={() => onSelectProject('matrix')}
            className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
              currentProject === 'matrix' ? 'text-indigo-400 bg-indigo-950/40 font-semibold' : 'hover:text-[var(--text-primary)]'
            }`}
          >
            Tech Matrix (21)
          </button>
        </nav>

        {/* Zone 3: Learning Progress Tracker, Theme Settings, 21 Languages, and Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Learning Progress Tracker Ring */}
          <ProgressRing
            progress={learningProgress}
            completedCount={completedCount}
            totalCount={totalCount}
            percentage={percentage}
            onToggleModule={onToggleModuleCompletion}
            onResetProgress={onResetProgress}
            onSelectProject={onSelectProject}
          />

          {/* Theme Settings Button */}
          <button
            onClick={onOpenThemeModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-cyan-500/50 hover:bg-slate-900 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            title="Theme Settings: Choose between 5 distinctive UI styles"
            aria-label="Theme Settings"
          >
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Theme</span>
          </button>

          {/* 21 International Languages Dropdown */}
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />
            <select
              value={currentLang}
              onChange={(e) => onChangeLang(e.target.value as I18nLangCode)}
              aria-label="Select international language"
              className="pl-7 pr-2.5 py-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-xs font-medium text-[var(--text-primary)] hover:border-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors cursor-pointer appearance-none max-w-[90px] sm:max-w-[130px] truncate"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-100">
                  {lang.flag} {lang.nativeLabel} ({lang.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Native Installers Link */}
          <button
            onClick={onOpenInstall}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-white bg-[var(--bg-card)] hover:bg-slate-800 border border-[var(--border-color)] rounded-lg transition-colors whitespace-nowrap"
            title="Native Application Packages (Android APK, Windows, macOS, iOS)"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Install</span>
          </button>

          {/* User Guide Action Button */}
          <button
            onClick={onOpenUserGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            title="Open comprehensive User Guide with 22-language TTS"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">User Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
};
