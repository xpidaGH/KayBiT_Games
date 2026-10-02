import React, { useState } from 'react';
import { ProjectId } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { Code2, Filter, ArrowRight } from 'lucide-react';

interface LanguageMapping {
  language: string;
  category: 'Bare-Metal / Native' | 'Managed / JVM' | 'Systems & Concurrency' | 'Web & Dynamic' | 'DevOps & Tooling' | 'Data & Enterprise';
  primaryProjects: ProjectId[];
  focusArea: string;
  keyArchitectures: string[];
}

const ALL_LANGUAGES: LanguageMapping[] = [
  {
    language: 'C++',
    category: 'Bare-Metal / Native',
    primaryProjects: ['voxel', 'pipeline', 'kinematic'],
    focusArea: 'Compute Shaders, SIMD Math, Greedy Meshing, Impulse Solvers',
    keyArchitectures: ['Slice Greedy Meshing', 'SIMD Vectorization', 'Projected Gauss-Seidel Solver']
  },
  {
    language: 'Rust',
    category: 'Bare-Metal / Native',
    primaryProjects: ['voxel', 'pipeline', 'kinematic'],
    focusArea: 'Memory Safety without GC, Data-Oriented Design (DOD), AST Bytecode VM',
    keyArchitectures: ['Sparse Voxel Octree (SVO)', 'Contiguous SoA Belt Arrays', 'Finite-Element Linkage Fractures']
  },
  {
    language: 'C',
    category: 'Bare-Metal / Native',
    primaryProjects: ['voxel', 'kinematic'],
    focusArea: 'Raw Memory Pooling, Pointer Arithmetic, Minimalist Physics Kernels',
    keyArchitectures: ['Arena Allocators', 'Bitwise Voxel Packing', 'Sub-step Integrators']
  },
  {
    language: 'Go (Golang)',
    category: 'Systems & Concurrency',
    primaryProjects: ['voxel', 'procedural', 'sandbox'],
    focusArea: 'Low-latency FlatBuffers Delta Sync, Microservice Mesh, Linux cgroups',
    keyArchitectures: ['Delta-Compressed UDP Packets', 'Concurrent Spatial Quadtree', 'Linux Seccomp Filter Jail']
  },
  {
    language: 'Java',
    category: 'Managed / JVM',
    primaryProjects: ['voxel', 'pipeline', 'economy'],
    focusArea: 'Off-heap Memory Chunk Caching, Disruptor Ring Buffers, 2PC Coordinators',
    keyArchitectures: ['Direct ByteBuffer Paging', 'Lock-Free Ring Buffers', 'Two-Phase Commit Escrow']
  },
  {
    language: 'C#',
    category: 'Managed / JVM',
    primaryProjects: ['voxel', 'pipeline', 'kinematic'],
    focusArea: 'High-performance Managed ECS, SIMD Vectorization, Fixed-Point Math',
    keyArchitectures: ['SIMD 3D Simplex Generator', 'Deterministic PRNG Lockstep', 'Structural Stress Profilers']
  },
  {
    language: 'Kotlin',
    category: 'Managed / JVM',
    primaryProjects: ['procedural', 'sandbox'],
    focusArea: 'Reactive Flow Data Streams, Coroutine Backpressure, Event Dispatchers',
    keyArchitectures: ['Lazy Flow Coordinate Pipe', 'Backpressure Buffering', 'Reactive Cluster Dispatch']
  },
  {
    language: 'TypeScript',
    category: 'Web & Dynamic',
    primaryProjects: ['kinematic', 'sandbox'],
    focusArea: 'AST Wiring Compiler, Zero-Delay Cycle Evaluation, Cloud VM Isolates',
    keyArchitectures: ['Tarjan SCC Graph Cycle Resolver', 'AST Bytecode Generator', 'V8 Isolate Gas Meters']
  },
  {
    language: 'JavaScript',
    category: 'Web & Dynamic',
    primaryProjects: ['kinematic', 'sandbox'],
    focusArea: 'Client-side Visualizations, Interactive Canvas Renderers, Script Evaluation',
    keyArchitectures: ['2D Particle Linkage Physics', 'Dynamic AST Graph Visualizer', 'Lightweight Sandboxing']
  },
  {
    language: 'Python',
    category: 'Data & Enterprise',
    primaryProjects: ['procedural', 'sandbox'],
    focusArea: 'Vectorized Procedural Seeds, NumPy Analytics, Sandbox Instrumentation',
    keyArchitectures: ['SplitMix64 Vectorized Coordinate Hash', 'Gamma Mineral Abundance Curves', 'Telemetry Sanity Suites']
  },
  {
    language: 'Dart / Flutter',
    category: 'Web & Dynamic',
    primaryProjects: ['procedural', 'sandbox'],
    focusArea: 'Cross-Platform Tenant Management, Asynchronous Stream Subscriptions',
    keyArchitectures: ['Reactive Cluster Dashboard', 'Dynamic Tenant Health Telemetry', 'Async Stream State']
  },
  {
    language: 'PHP',
    category: 'Web & Dynamic',
    primaryProjects: ['sandbox'],
    focusArea: 'Content-Addressable Storage (CAS) Ingestion APIs, Asset Validation',
    keyArchitectures: ['SHA-256 Content Address Engine', '3D Asset Header Validator', 'Immutable Object Vault']
  },
  {
    language: 'Ruby',
    category: 'Web & Dynamic',
    primaryProjects: ['sandbox'],
    focusArea: 'RESTful Asset Validation Microservices, Dynamic Sandbox Configuration',
    keyArchitectures: ['Asset Metadata Compiler', 'Rapid Tenant Provisioning', 'Isolation Test Harness']
  },
  {
    language: 'Bash / Shell',
    category: 'DevOps & Tooling',
    primaryProjects: ['sandbox'],
    focusArea: 'Linux Namespace Isolation, Seccomp Audit Filters, Automated Deployment',
    keyArchitectures: ['cgroups v2 Enforcement Scripts', 'Automated Fuzzing Pipelines', 'Container Sanitization']
  },
  {
    language: 'PowerShell',
    category: 'DevOps & Tooling',
    primaryProjects: ['sandbox'],
    focusArea: 'Container Security Auditing, Memory Leak Sentinels, Fuzzing Test Harnesses',
    keyArchitectures: ['Memory Threshold Terminations', 'Process Working-Set Auditing', 'Automated Adversarial Payloads']
  },
  {
    language: 'SQL',
    category: 'Data & Enterprise',
    primaryProjects: ['economy'],
    focusArea: 'ACID Transaction Pipelines, Row-Level Lock Escrow, Anti-Dupe Schema',
    keyArchitectures: ['SERIALIZABLE Isolation Procedures', 'Explicit Lock Ordering (Deadlock-Free)', 'Immutable Trade Audit Ledgers']
  },
  {
    language: 'Scala',
    category: 'Data & Enterprise',
    primaryProjects: ['economy'],
    focusArea: 'Immutable Event Sourcing, Functional World Progression State Machines',
    keyArchitectures: ['Event-Sourced World Progression', 'Algebraic Data Type States', 'Point-in-Time Rollback Logic']
  },
  {
    language: 'R',
    category: 'Data & Enterprise',
    primaryProjects: ['procedural'],
    focusArea: 'Monte Carlo Procedural Distribution, Stochastic Validation, Rarity Curves',
    keyArchitectures: ['10^6 Celestial Seed Simulations', 'Gamma Distribution Fits', 'Dead-Loop Probability Analysis']
  },
  {
    language: 'MATLAB',
    category: 'Data & Enterprise',
    primaryProjects: ['procedural'],
    focusArea: 'Continuous Eigenvalue Terrain Analysis, Spatial Matrix Modeling',
    keyArchitectures: ['Topology Eigenvalue Calculations', 'Atmospheric Density Matrix', 'Spatial Entropy Profiling']
  },
  {
    language: 'COBOL',
    category: 'Data & Enterprise',
    primaryProjects: ['economy'],
    focusArea: 'Fixed-Width Binary Record Serialization (01 CHUNK-RECORD), Batch Ledgers',
    keyArchitectures: ['01 CHUNK-RECORD Layout', 'COMP-5 Binary Alignment', 'Dense Batch Page Processing']
  },
  {
    language: 'Assembly',
    category: 'Bare-Metal / Native',
    primaryProjects: ['economy'],
    focusArea: 'x86-64 Low-Level Bitpacking Routines, Direct Hardware Register Optimization',
    keyArchitectures: ['Bitmask Tile Packing', 'Direct CPU Register Transfers', 'Cache Page Boundary Alignment']
  }
];

interface TechMappingMatrixProps {
  onSelectProject: (id: ProjectId) => void;
}

export const TechMappingMatrix: React.FC<TechMappingMatrixProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchLang, setSearchLang] = useState<string>('');

  const categories = ['All', 'Bare-Metal / Native', 'Managed / JVM', 'Systems & Concurrency', 'Web & Dynamic', 'DevOps & Tooling', 'Data & Enterprise'];

  const filtered = ALL_LANGUAGES.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      !searchLang ||
      item.language.toLowerCase().includes(searchLang.toLowerCase()) ||
      item.focusArea.toLowerCase().includes(searchLang.toLowerCase()) ||
      item.keyArchitectures.some(a => a.toLowerCase().includes(searchLang.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>Curriculum Cross-Reference Guide</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
          21 Target Languages & Architectural Mapping Matrix
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Comprehensive cross-reference mapping low-level systems programming, managed JVM runtimes, functional languages, statistical toolchains, and DevOps automation across the 6 sandbox engineering projects.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter by language, architecture..."
          value={searchLang}
          onChange={(e) => setSearchLang(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-full sm:w-64"
        />
      </div>

      {/* Grid of Languages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.language}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{item.language}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.focusArea}</p>

              <div className="space-y-1 pt-1">
                <span className="text-xs font-semibold text-slate-400">Key Implementations:</span>
                <div className="flex flex-wrap gap-1">
                  {item.keyArchitectures.map((arch, aIdx) => (
                    <span
                      key={aIdx}
                      className="text-xs px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 font-mono"
                    >
                      {arch}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-slate-400">Mapped Projects:</span>
              <div className="flex flex-wrap gap-1.5">
                {item.primaryProjects.map((pId) => {
                  const pData = PROJECTS_DATA.find((p) => p.id === pId);
                  if (!pData) return null;
                  return (
                    <button
                      key={pId}
                      onClick={() => onSelectProject(pId)}
                      className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1 font-medium group"
                    >
                      <span>{pData.number}. {pData.inspiration}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
