import React from 'react';
import { ProjectId, ProjectData } from '../types';
import { CheckCircle2, Circle, ArrowLeft, ArrowRight, Award } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';

export interface ModuleCompletionBannerProps {
  projectId: ProjectId;
  isCompleted: boolean;
  completedAt?: string;
  onToggleCompletion: (id: ProjectId) => void;
  onSelectProject: (id: ProjectId | 'splash' | 'matrix') => void;
  completedCount: number;
  totalCount: number;
}

export const ModuleCompletionBanner: React.FC<ModuleCompletionBannerProps> = ({
  projectId,
  isCompleted,
  completedAt,
  onToggleCompletion,
  onSelectProject,
  completedCount,
  totalCount,
}) => {
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === projectId);
  const prevProject = currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[currentIndex + 1] : null;

  return (
    <div className="w-full border-b border-[var(--border-color)] bg-[var(--bg-surface)] py-3 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left: Module milestone info */}
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
              isCompleted
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Module {currentIndex + 1} of {totalCount}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] font-mono">
                · Overall Lab Completion: {completedCount}/{totalCount}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-[var(--text-primary)]">
                {isCompleted ? 'Status: Milestone Completed & Verified' : 'Status: In Progress / Uncompleted'}
              </span>
              {isCompleted && completedAt && (
                <span className="text-[10px] text-emerald-400 font-mono">
                  ({new Date(completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Interactive Toggle & Prev/Next navigation */}
        <div className="flex items-center flex-wrap gap-2.5 w-full md:w-auto justify-between md:justify-end">
          {/* Toggle completion status button */}
          <button
            onClick={() => onToggleCompletion(projectId)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600 hover:border-cyan-400'
            }`}
            title="Mark this module completed in your local storage tracker"
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 fill-white text-emerald-600" />
                <span>Module Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>Mark as Completed</span>
              </>
            )}
          </button>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-1.5">
            {prevProject && (
              <button
                onClick={() => onSelectProject(prevProject.id)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-slate-800 text-[var(--text-secondary)] hover:text-white transition-colors"
                title={`Previous: ${prevProject.title}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>
            )}

            {nextProject && (
              <button
                onClick={() => onSelectProject(nextProject.id)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-slate-800 text-[var(--text-secondary)] hover:text-white transition-colors"
                title={`Next: ${nextProject.title}`}
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
