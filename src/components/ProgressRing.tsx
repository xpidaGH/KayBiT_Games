import React, { useState, useRef, useEffect } from 'react';
import { ProjectId, LearningProgressMap } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { CheckCircle2, Circle, RotateCcw, ChevronDown, Award } from 'lucide-react';

export interface ProgressRingProps {
  progress: LearningProgressMap;
  completedCount: number;
  totalCount: number;
  percentage: number;
  onToggleModule: (id: ProjectId) => void;
  onResetProgress: () => void;
  onSelectProject?: (id: ProjectId) => void;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  completedCount,
  totalCount,
  percentage,
  onToggleModule,
  onResetProgress,
  onSelectProject,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // SVG ring calculations (circumference for radius 14)
  const radius = 14;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="View learning curriculum progress"
        className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left group"
        title={`Progress: ${completedCount}/${totalCount} modules completed (${percentage}%)`}
      >
        <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
          <svg className="w-8 h-8 -rotate-90 transform" viewBox="0 0 36 36">
            {/* Background circle */}
            <circle
              cx="18"
              cy="18"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-slate-800"
              fill="transparent"
            />
            {/* Progress indicator circle */}
            <circle
              cx="18"
              cy="18"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-500 ease-out ${
                percentage === 100
                  ? 'text-emerald-400'
                  : percentage > 50
                  ? 'text-cyan-400'
                  : percentage > 0
                  ? 'text-amber-400'
                  : 'text-slate-600'
              }`}
              fill="transparent"
            />
          </svg>
          {/* Centered Percentage Text */}
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-[var(--text-primary)]">
            {percentage}%
          </span>
        </div>

        <div className="hidden md:flex flex-col text-left leading-none">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-[var(--text-primary)]">
              {completedCount}/{totalCount}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">Modules</span>
          </div>
          <span className="text-[9px] text-cyan-400 font-mono">
            {percentage === 100 ? 'Mastery Reached' : 'In Progress'}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-cyan-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Popover Checklist Modal / Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] font-display">
                  Curriculum Progress
                </h4>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {completedCount} of {totalCount} laboratory milestones verified
                </p>
              </div>
            </div>

            {completedCount > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onResetProgress();
                }}
                className="text-[11px] flex items-center gap-1 text-[var(--text-muted)] hover:text-rose-400 transition-colors px-2 py-1 rounded hover:bg-rose-950/30 font-mono"
                title="Reset all laboratory progress"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Progress bar visual */}
          <div className="my-3">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-[var(--text-secondary)]">Lab Mastery</span>
              <span className="text-cyan-400 font-bold">{percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Checklist of 6 modules */}
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {PROJECTS_DATA.map((proj) => {
              const isComplete = progress[proj.id]?.completed ?? false;
              const completedAt = progress[proj.id]?.completedAt;

              return (
                <div
                  key={proj.id}
                  className={`flex items-start justify-between p-2.5 rounded-lg border transition-all ${
                    isComplete
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-100'
                      : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <button
                      onClick={() => onToggleModule(proj.id)}
                      className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-400 transition-colors"
                      title={isComplete ? 'Mark as incomplete' : 'Mark as completed'}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500 hover:text-cyan-400" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
                          {proj.number}. {proj.title}
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] line-clamp-1">
                        Inspiration: {proj.inspiration} · {proj.targetLanguages.slice(0, 3).join(', ')}
                      </p>
                      {isComplete && completedAt && (
                        <span className="text-[9px] text-emerald-400/80 font-mono">
                          Completed {new Date(completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {onSelectProject && (
                    <button
                      onClick={() => {
                        onSelectProject(proj.id);
                        setIsOpen(false);
                      }}
                      className="ml-2 px-2 py-1 text-[10px] font-mono font-medium rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0"
                    >
                      Open
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-[var(--border-color)] text-[10px] text-[var(--text-muted)] text-center font-mono">
            Progress persists automatically in browser local storage
          </div>
        </div>
      )}
    </div>
  );
};
