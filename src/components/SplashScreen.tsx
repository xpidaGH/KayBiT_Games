import React from 'react';
import { ProjectId, LearningProgressMap } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { AppLogo } from './AppLogo';
import { BookOpen, Layers, Terminal, Sparkles, ArrowRight, CheckCircle2, Circle, Download, Award } from 'lucide-react';

interface SplashScreenProps {
  onSelectProject: (id: ProjectId) => void;
  onOpenUserGuide: () => void;
  onOpenInstall: () => void;
  onOpenMatrix: () => void;
  learningProgress?: LearningProgressMap;
  completedCount?: number;
  totalCount?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onSelectProject,
  onOpenUserGuide,
  onOpenInstall,
  onOpenMatrix,
  learningProgress = {},
  completedCount = 0,
  totalCount = 6,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 sm:p-10 md:p-12 space-y-6 shadow-2xl transition-colors">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-5 relative z-10">
          {/* Logo Brand Header & Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <AppLogo variant="desktop" showText={false} />
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
              <Terminal className="w-3.5 h-3.5" />
              <span>KayBiT_Games Academic Initiative · Systems Engineering Curriculum</span>
            </div>
            {completedCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-mono font-medium">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>{completedCount}/{totalCount} Labs Completed</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[var(--text-primary)] leading-tight">
            Sandbox Architecture & Systems Programming Laboratory
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Rather than building simple game clones, this curriculum maps the internal architectures of 6 iconic sandbox games to enterprise backends, compiler engines, distributed replication pipelines, and bare-metal systems across <strong className="text-cyan-400">21 target languages</strong>.
          </p>

          {/* Primary Action Buttons including Prominent 'User Guide' Button */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenUserGuide}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>User Guide (USER_GUIDE.md)</span>
            </button>

            <button
              onClick={onOpenInstall}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Native App</span>
            </button>

            <button
              onClick={() => onSelectProject('voxel')}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Launch Project 01</span>
            </button>

            <button
              onClick={onOpenMatrix}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>View 21 Languages Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-color)] relative z-10 text-xs">
          <div className="space-y-1">
            <div className="text-[var(--text-muted)] font-medium">Target Languages</div>
            <div className="text-base font-bold text-[var(--text-primary)] font-mono">21 Languages</div>
            <div className="text-[var(--text-muted)]">C++, Rust, Go, Java, C#, SQL...</div>
          </div>
          <div className="space-y-1">
            <div className="text-[var(--text-muted)] font-medium">Core Systems Modules</div>
            <div className="text-base font-bold text-cyan-400 font-mono">6 Projects</div>
            <div className="text-[var(--text-muted)]">Minecraft to Terraria arch</div>
          </div>
          <div className="space-y-1">
            <div className="text-[var(--text-muted)] font-medium">Internationalization</div>
            <div className="text-base font-bold text-emerald-400 font-mono">21 Translations</div>
            <div className="text-[var(--text-muted)]">Full RTL & native typography</div>
          </div>
          <div className="space-y-1">
            <div className="text-[var(--text-muted)] font-medium">Interactive Stages</div>
            <div className="text-base font-bold text-rose-400 font-mono">100% Live Simulated</div>
            <div className="text-[var(--text-muted)]">Zero mock dead clicks</div>
          </div>
        </div>
      </section>

      {/* The 6 Iconic Sandbox Architecture Modules */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display text-[var(--text-primary)]">
              The 6 Specialized Project Laboratories
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Each module models a real-world enterprise computing challenge derived from iconic game architectures.
            </p>
          </div>
          <button
            onClick={onOpenUserGuide}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Read Complete Documentation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project) => {
            const isCompleted = learningProgress[project.id]?.completed ?? false;

            return (
              <div
                key={project.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 group relative ${
                  isCompleted
                    ? 'bg-[var(--bg-surface)] border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                    : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-slate-600'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: project.accentHex }}
                      />
                      <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
                        PROJECT {project.number}
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-xs px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[var(--text-secondary)] font-medium">
                        Inspired by {project.inspiration}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {project.overview}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs text-[var(--text-muted)] font-semibold">Target Languages:</div>
                    <div className="flex flex-wrap gap-1">
                      {project.targetLanguages.map((lang) => (
                        <span
                          key={lang}
                          className="text-xs px-2 py-0.5 rounded bg-[var(--bg-canvas)] border border-[var(--border-color)] text-[var(--text-secondary)] font-mono"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="text-xs text-[var(--text-muted)] font-semibold">Key Architectural Domains:</div>
                    <div className="flex flex-wrap gap-1">
                      {project.coreDomains.map((dom) => (
                        <span
                          key={dom}
                          className="text-xs text-[var(--text-muted)]"
                        >
                          {dom} ·
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    {project.codeSnippets.length} Code Kernels
                  </span>
                  <button
                    onClick={() => onSelectProject(project.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Lab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Curriculum Objectives & Pedagogical Framework */}
      <section className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Academic Rigor & Systems Engineering Invariants</span>
          </div>
          <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
            Why Teach Systems Programming Through Iconic Sandboxes?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Iconic sandbox games push software engineering to its outer frontiers: processing infinite mutable voxel worlds, coordinating hundred-thousand-item conveyor graphs, maintaining sub-millisecond determinism, and hardening untrusted user scripts against malicious payloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-color)] space-y-2">
            <div className="font-bold text-[var(--text-primary)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Garbage-Collection Loops</span>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Master off-heap memory paging, Data-Oriented Design (DOD), and structure-of-arrays memory alignment to keep frame pacing at sub-millisecond tolerances.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-color)] space-y-2">
            <div className="font-bold text-[var(--text-primary)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Deterministic Concurrency</span>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Eliminate non-deterministic clock variance and floating-point drifts through fixed-point integer mathematics and seed-synchronized state machines.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-color)] space-y-2">
            <div className="font-bold text-[var(--text-primary)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-400" />
              <span>Compiler & VM Theory</span>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Compile interactive graph circuits into Abstract Syntax Trees (ASTs), detect feedback loop cycles with Tarjan SCC, and execute within sandboxed VMs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
