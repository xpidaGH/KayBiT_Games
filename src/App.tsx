import { useState } from 'react';
import { ProjectId, I18nLangCode } from './types';
import { PROJECTS_DATA } from './data/projectsData';
import { Navbar } from './components/Navbar';
import { SplashScreen } from './components/SplashScreen';
import { UserGuideModal } from './components/UserGuideModal';
import { InstallationModal } from './components/InstallationModal';
import { ThemeModal } from './components/ThemeModal';
import { TechMappingMatrix } from './components/TechMappingMatrix';
import { ModuleCompletionBanner } from './components/ModuleCompletionBanner';
import { useTheme } from './hooks/useTheme';
import { useLearningProgress } from './hooks/useLearningProgress';

import { ProjectVoxelEngine } from './components/projects/ProjectVoxelEngine';
import { ProjectItemPipeline } from './components/projects/ProjectItemPipeline';
import { ProjectProceduralState } from './components/projects/ProjectProceduralState';
import { ProjectKinematicCompiler } from './components/projects/ProjectKinematicCompiler';
import { ProjectSandboxedVM } from './components/projects/ProjectSandboxedVM';
import { ProjectRelationalEconomy } from './components/projects/ProjectRelationalEconomy';

export default function App() {
  const [currentView, setCurrentView] = useState<ProjectId | 'splash' | 'matrix'>('splash');
  const [userGuideOpen, setUserGuideOpen] = useState<boolean>(false);
  const [installModalOpen, setInstallModalOpen] = useState<boolean>(false);
  const [themeModalOpen, setThemeModalOpen] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<I18nLangCode>('en');

  // Hooks for Theme and Learning Progress
  const { theme: currentTheme, setTheme } = useTheme();
  const {
    progress,
    completedCount,
    totalCount,
    percentage,
    toggleModuleCompletion,
    resetAllProgress,
  } = useLearningProgress();

  const currentProjectData = PROJECTS_DATA.find((p) => p.id === currentView);
  const isProjectView = currentView !== 'splash' && currentView !== 'matrix';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] antialiased selection:bg-cyan-500/20 selection:text-cyan-300 transition-colors">
      {/* Top Bar with Brand Logo, Learning Progress Ring, Theme Settings, 21 Languages */}
      <Navbar
        currentProject={currentView}
        onSelectProject={(id) => setCurrentView(id)}
        onOpenUserGuide={() => setUserGuideOpen(true)}
        onOpenInstall={() => setInstallModalOpen(true)}
        onOpenThemeModal={() => setThemeModalOpen(true)}
        currentTheme={currentTheme}
        currentLang={currentLang}
        onChangeLang={(lang) => setCurrentLang(lang)}
        learningProgress={progress}
        completedCount={completedCount}
        totalCount={totalCount}
        percentage={percentage}
        onToggleModuleCompletion={toggleModuleCompletion}
        onResetProgress={resetAllProgress}
      />

      {/* Module Completion Banner for active project laboratory */}
      {isProjectView && (
        <ModuleCompletionBanner
          projectId={currentView as ProjectId}
          isCompleted={progress[currentView as ProjectId]?.completed ?? false}
          completedAt={progress[currentView as ProjectId]?.completedAt}
          onToggleCompletion={toggleModuleCompletion}
          onSelectProject={(id) => setCurrentView(id)}
          completedCount={completedCount}
          totalCount={totalCount}
        />
      )}

      {/* Main Content Viewport */}
      <main className="flex-1">
        {currentView === 'splash' && (
          <SplashScreen
            onSelectProject={(id) => setCurrentView(id)}
            onOpenUserGuide={() => setUserGuideOpen(true)}
            onOpenInstall={() => setInstallModalOpen(true)}
            onOpenMatrix={() => setCurrentView('matrix')}
            learningProgress={progress}
            completedCount={completedCount}
            totalCount={totalCount}
          />
        )}

        {currentView === 'matrix' && (
          <TechMappingMatrix onSelectProject={(id) => setCurrentView(id)} />
        )}

        {currentView === 'voxel' && currentProjectData && (
          <ProjectVoxelEngine project={currentProjectData} currentLang={currentLang} />
        )}

        {currentView === 'pipeline' && currentProjectData && (
          <ProjectItemPipeline project={currentProjectData} currentLang={currentLang} />
        )}

        {currentView === 'procedural' && currentProjectData && (
          <ProjectProceduralState project={currentProjectData} currentLang={currentLang} />
        )}

        {currentView === 'kinematic' && currentProjectData && (
          <ProjectKinematicCompiler project={currentProjectData} currentLang={currentLang} />
        )}

        {currentView === 'sandbox' && currentProjectData && (
          <ProjectSandboxedVM project={currentProjectData} currentLang={currentLang} />
        )}

        {currentView === 'economy' && currentProjectData && (
          <ProjectRelationalEconomy project={currentProjectData} currentLang={currentLang} />
        )}
      </main>

      {/* User Guide Scrollable Modal with 22 Languages & SpeechSynthesis TTS */}
      <UserGuideModal
        isOpen={userGuideOpen}
        onClose={() => setUserGuideOpen(false)}
        currentLang={currentLang}
        onChangeLang={(lang) => setCurrentLang(lang)}
      />

      {/* Native Installation Guide Modal (Android, iOS, Windows, macOS, PWA) */}
      <InstallationModal
        isOpen={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
      />

      {/* Theme Settings Modal (5 Architectural UI Variations) */}
      <ThemeModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={setTheme}
      />

      {/* Editorial Academic Footer */}
      <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-8 px-4 sm:px-6 lg:px-8 text-xs text-[var(--text-muted)] transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--text-primary)] font-display">KayBiT_Games Academic Initiative</span>
            <span>·</span>
            <span>Systems Programming Curriculum</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setThemeModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
            >
              Theme Settings ({currentTheme})
            </button>
            <span>·</span>
            <button
              onClick={() => setInstallModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
            >
              Native Installers (APK / Win / Mac / iOS)
            </button>
            <span>·</span>
            <button
              onClick={() => setUserGuideOpen(true)}
              className="text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
            >
              User Guide & TTS (22 Languages)
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentView('matrix')}
              className="text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
            >
              21 Languages Mapping
            </button>
            <span>·</span>
            <span className="font-mono">Progress: {completedCount}/{totalCount} ({percentage}%)</span>
            <span>·</span>
            <span>© 2026 KayBiT_Games</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
