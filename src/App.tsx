import { useState } from 'react';
import { ProjectId, I18nLangCode } from './types';
import { PROJECTS_DATA } from './data/projectsData';
import { Navbar } from './components/Navbar';
import { SplashScreen } from './components/SplashScreen';
import { UserGuideModal } from './components/UserGuideModal';
import { InstallationModal } from './components/InstallationModal';
import { TechMappingMatrix } from './components/TechMappingMatrix';
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
  const [currentLang, setCurrentLang] = useState<I18nLangCode>('en');

  const currentProjectData = PROJECTS_DATA.find((p) => p.id === currentView);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Bar adhering to 3-Zone Contract */}
      <Navbar
        currentProject={currentView}
        onSelectProject={(id) => setCurrentView(id)}
        onOpenUserGuide={() => setUserGuideOpen(true)}
        onOpenInstall={() => setInstallModalOpen(true)}
        currentLang={currentLang}
        onChangeLang={(lang) => setCurrentLang(lang)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {currentView === 'splash' && (
          <SplashScreen
            onSelectProject={(id) => setCurrentView(id)}
            onOpenUserGuide={() => setUserGuideOpen(true)}
            onOpenInstall={() => setInstallModalOpen(true)}
            onOpenMatrix={() => setCurrentView('matrix')}
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

      {/* User Guide Scrollable Modal with 22 Languages & TTS */}
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

      {/* Editorial Academic Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400 font-display">KayBiT_Games Academic Initiative</span>
            <span>·</span>
            <span>Systems Programming Curriculum</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setInstallModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Native Installers (APK / Win / Mac / iOS)
            </button>
            <button
              onClick={() => setUserGuideOpen(true)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              User Guide & TTS (22 Languages)
            </button>
            <button
              onClick={() => setCurrentView('matrix')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              21 Languages Mapping
            </button>
            <span>·</span>
            <span>© 2026 KayBiT_Games</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

