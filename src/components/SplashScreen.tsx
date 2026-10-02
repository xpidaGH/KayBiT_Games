import React from 'react';
import { ProjectId } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { BookOpen, Layers, Terminal, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SplashScreenProps {
  onSelectProject: (id: ProjectId) => void;
  onOpenUserGuide: () => void;
  onOpenMatrix: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onSelectProject,
  onOpenUserGuide,
  onOpenMatrix,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12 space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
            <Terminal className="w-3.5 h-3.5" />
            <span>KayBiT_Games Academic Initiative · Systems Engineering Curriculum</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
            Sandbox Architecture & Systems Programming Laboratory
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Rather than building simple game clones, this curriculum maps the internal architectures of 6 iconic sandbox games to enterprise backends, compiler engines, distributed replication pipelines, and bare-metal systems across <strong className="text-cyan-400">21 target languages</strong>.
          </p>

          {/* Primary Action Buttons including Prominent 'User Guide' Button */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenUserGuide}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>User Guide (USER_GUIDE.md)</span>
            </button>

            <button
              onClick={() => onSelectProject('voxel')}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Launch Project 01 (Voxel Engine)</span>
            </button>

            <button
              onClick={onOpenMatrix}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5"
            >
              <span>View 21 Languages Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 relative z-10 text-xs">
          <div className="space-y-1">
            <div className="text-slate-400 font-medium">Target Languages</div>
            <div className="text-base font-bold text-white font-mono">21 Languages</div>
            <div className="text-slate-500">C++, Rust, Go, Java, C#, SQL...</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-400 font-medium">Core Systems Modules</div>
            <div className="text-base font-bold text-cyan-400 font-mono">6 Projects</div>
            <div className="text-slate-500">Minecraft to Terraria arch</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-400 font-medium">Internationalization</div>
            <div className="text-base font-bold text-emerald-400 font-mono">21 Translations</div>
            <div className="text-slate-500">Full RTL & native typography</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-400 font-medium">Interactive Stages</div>
            <div className="text-base font-bold text-rose-400 font-mono">100% Live Simulated</div>
            <div className="text-slate-500">Zero mock dead clicks</div>
          </div>
        </div>
      </section>

      {/* The 6 Iconic Sandbox Architecture Modules */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display text-white">
              The 6 Specialized Project Laboratories
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Each module models a real-world enterprise computing challenge derived from iconic game architectures.
            </p>
          </div>
          <button
            onClick={onOpenUserGuide}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Read Complete Documentation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: project.accentHex }}
                    />
                    <span className="text-xs font-mono font-bold text-slate-400">
                      PROJECT {project.number}
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                    Inspired by {project.inspiration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {project.overview}
                </p>

                <div className="space-y-1.5 pt-1">
                  <div className="text-xs text-slate-400 font-semibold">Target Languages:</div>
                  <div className="flex flex-wrap gap-1">
                    {project.targetLanguages.map((lang) => (
                      <span
                        key={lang}
                        className="text-xs px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-mono"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="text-xs text-slate-400 font-semibold">Key Architectural Domains:</div>
                  <div className="flex flex-wrap gap-1">
                    {project.coreDomains.map((dom) => (
                      <span
                        key={dom}
                        className="text-xs text-slate-400"
                      >
                        {dom} ·
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  {project.codeSnippets.length} Code Kernels
                </span>
                <button
                  onClick={() => onSelectProject(project.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 transition-colors flex items-center gap-1"
                >
                  <span>Open Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum Objectives & Pedagogical Framework */}
      <section className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Academic Rigor & Systems Engineering Invariants</span>
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            Why Teach Systems Programming Through Iconic Sandboxes?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Iconic sandbox games push software engineering to its outer frontiers: processing infinite mutable voxel worlds, coordinating hundred-thousand-item conveyor graphs, maintaining sub-millisecond determinism, and hardening untrusted user scripts against malicious payloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Garbage-Collection Loops</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Master off-heap memory paging, Data-Oriented Design (DOD), and structure-of-arrays memory alignment to keep frame pacing at sub-millisecond tolerances.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Deterministic Concurrency</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Eliminate non-deterministic clock variance and floating-point drifts through fixed-point integer mathematics and seed-synchronized state machines.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-400" />
              <span>Compiler & VM Theory</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Compile interactive graph circuits into Abstract Syntax Trees (ASTs), detect feedback loop cycles with Tarjan SCC, and execute within sandboxed VMs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
