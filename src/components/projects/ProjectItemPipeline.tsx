import React, { useState, useEffect, useRef } from 'react';
import { ProjectData, I18nLangCode } from '../../types';
import { TTSControlBar } from '../TTSControlBar';
import { Play, Pause, RotateCcw, Cpu, Activity, History, Copy, Check, ArrowRight } from 'lucide-react';

interface ProjectItemPipelineProps {
  project: ProjectData;
  currentLang?: I18nLangCode;
}

interface PipelineItem {
  id: number;
  type: 'iron' | 'copper' | 'gear' | 'circuit';
  offset: number; // 0 to 100 on segment
  segmentId: number;
}

export const ProjectItemPipeline: React.FC<ProjectItemPipelineProps> = ({ project, currentLang = 'en' }) => {
  const [pipelineMode, setPipelineMode] = useState<'DOD' | 'OOP'>('DOD');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [activeCodeLang, setActiveCodeLang] = useState<string>('Rust');
  const [lockstepTick, setLockstepTick] = useState<number>(1042);
  const [prngSeed, setPrngSeed] = useState<number>(42);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [rollbackTick, setRollbackTick] = useState<number>(0);

  // Moving items state
  const [items, setItems] = useState<PipelineItem[]>(() => [
    { id: 1, type: 'iron', offset: 10, segmentId: 0 },
    { id: 2, type: 'iron', offset: 35, segmentId: 0 },
    { id: 3, type: 'gear', offset: 60, segmentId: 0 },
    { id: 4, type: 'copper', offset: 85, segmentId: 0 },
    { id: 5, type: 'copper', offset: 15, segmentId: 1 },
    { id: 6, type: 'circuit', offset: 50, segmentId: 1 },
    { id: 7, type: 'gear', offset: 80, segmentId: 1 },
    { id: 8, type: 'circuit', offset: 25, segmentId: 2 },
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation tick loop
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setLockstepTick((t) => t + 1);
      setItems((prev) =>
        prev.map((item) => {
          let nextOffset = item.offset + 1.2 * simulationSpeed;
          let nextSeg = item.segmentId;
          if (nextOffset > 100) {
            nextOffset = 0;
            nextSeg = (nextSeg + 1) % 3;
          }
          return { ...item, offset: nextOffset, segmentId: nextSeg };
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, [isRunning, simulationSpeed]);

  // Canvas visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    // Belt segments coordinates
    const segments = [
      { startX: 60, startY: 80, endX: w - 80, endY: 80, label: 'Segment 0: Raw Feed (Linear Array)' },
      { startX: w - 80, startY: 80, endX: w - 80, endY: 180, label: 'Segment 1: Cross-Assembler' },
      { startX: w - 80, startY: 180, endX: 60, endY: 180, label: 'Segment 2: Logistics Buffer' },
    ];

    // Draw Belts
    segments.forEach((seg, idx) => {
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 24;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(seg.startX, seg.startY);
      ctx.lineTo(seg.endX, seg.endY);
      ctx.stroke();

      // Belt inner track dashes
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.moveTo(seg.startX, seg.startY);
      ctx.lineTo(seg.endX, seg.endY);
      ctx.stroke();

      // Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(seg.label, (seg.startX + seg.endX) / 2 - 60, seg.startY - 18);
    });

    // Draw Items
    items.forEach((item) => {
      const seg = segments[item.segmentId];
      if (!seg) return;
      const t = item.offset / 100;
      const x = seg.startX + (seg.endX - seg.startX) * t;
      const y = seg.startY + (seg.endY - seg.startY) * t;

      let color = '#38bdf8'; // iron
      if (item.type === 'copper') color = '#f97316';
      if (item.type === 'gear') color = '#facc15';
      if (item.type === 'circuit') color = '#10b981';

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [items]);

  const currentSnippet = project.codeSnippets.find((s) => s.language === activeCodeLang) || project.codeSnippets[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const cacheHitRate = pipelineMode === 'DOD' ? 96.2 : 41.8;
  const memoryLayoutDesc =
    pipelineMode === 'DOD'
      ? 'Structure-of-Arrays (SoA) in contiguous 64-byte aligned cache lines. Single linear pass.'
      : 'Object-per-item with pointer chasing across heap references. Frequent L1/L2 cache misses.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
            <Activity className="w-4 h-4" />
            <span>PROJECT {project.number} · FACTORIO ARCHITECTURAL MAPPING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">{project.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {project.targetLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveCodeLang(lang)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                activeCodeLang === lang
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Architecture Read Aloud Bar */}
      <TTSControlBar
        currentLang={currentLang}
        textToRead={`${project.title}. ${project.subtitle}. ${project.overview}. Requirements: ${project.requirements.map(r => r.title + ': ' + r.description).join('. ')}`}
        title={`Listen: ${project.title}`}
      />

      {/* Main Interactive Stage & Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Simulation Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white">Continuous Conveyor Logistics Graph</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono">
                Tick #{lockstepTick}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1 transition-colors"
              >
                {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isRunning ? 'Pause' : 'Resume'}</span>
              </button>
              <button
                onClick={() => {
                  setLockstepTick(1000);
                  setSimulationSpeed(1);
                }}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Canvas Render Area */}
          <div className="relative w-full h-64 sm:h-72 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800/60">
            <canvas ref={canvasRef} width={640} height={260} className="max-w-full max-h-full" />
            <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-300">
              Flow Equation: <strong className="text-amber-400">x(t) = x₀ + v·Δt</strong>
            </div>
          </div>

          {/* Controls: Speed + Rollback Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Simulation Tick Speed</span>
                <span className="font-mono text-amber-400">{simulationSpeed}x (60 Hz)</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.5}
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <History className="w-3 h-3 text-cyan-400" />
                  Delta Snapshot Rollback Scrubber
                </span>
                <span className="font-mono text-cyan-400">-{rollbackTick} Ticks</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={1}
                value={rollbackTick}
                onChange={(e) => setRollbackTick(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right: DOD vs OOP Memory Inspector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Architecture Mode Switcher */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                Memory Architecture Mode
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPipelineMode('DOD')}
                className={`py-2 text-xs rounded-lg font-semibold transition-all ${
                  pipelineMode === 'DOD'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                DOD / ECS (SoA)
              </button>
              <button
                onClick={() => setPipelineMode('OOP')}
                className={`py-2 text-xs rounded-lg font-medium transition-all ${
                  pipelineMode === 'OOP'
                    ? 'bg-slate-800 text-white border border-slate-600 font-semibold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                OOP (Pointer Chasing)
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">{memoryLayoutDesc}</p>
          </div>

          {/* Real-time Hardware Telemetry */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <span className="text-xs font-semibold text-white">Hardware Profiling Metrics</span>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">L1/L2 Cache Hit Rate:</span>
                <span className={cacheHitRate > 90 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {cacheHitRate}%
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Deterministic Seed:</span>
                <span className="text-amber-400">0x{prngSeed.toString(16).toUpperCase()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Active Pipeline Items:</span>
                <span className="text-slate-200">{items.length} Units</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Snapshot Serialization:</span>
                <span className="text-cyan-400">1.4ms (XOR Delta)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Inspector Tabs */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              {currentSnippet.language} Implementation:
            </span>
            <span className="text-xs text-slate-400 font-mono">{currentSnippet.filename}</span>
            <span className="text-xs text-slate-500">· {currentSnippet.description}</span>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy Kernel'}</span>
          </button>
        </div>

        <div className="relative rounded-xl bg-slate-950 border border-slate-800/80 p-4 overflow-x-auto text-xs font-mono leading-relaxed text-slate-200 max-h-96">
          <pre>{currentSnippet.code}</pre>
        </div>
      </div>
    </div>
  );
};
