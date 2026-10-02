import React, { useState, useEffect, useRef } from 'react';
import { ProjectData, I18nLangCode } from '../../types';
import { TTSControlBar } from '../TTSControlBar';
import { Layers, Play, RotateCcw, Cpu, Network, Zap, Check, Copy } from 'lucide-react';

interface ProjectVoxelEngineProps {
  project: ProjectData;
  currentLang?: I18nLangCode;
}

export const ProjectVoxelEngine: React.FC<ProjectVoxelEngineProps> = ({ project, currentLang = 'en' }) => {
  // Interactive Simulation Controls
  const [octaves, setOctaves] = useState<number>(3);
  const [persistence, setPersistence] = useState<number>(0.5);
  const [biome, setBiome] = useState<'Alpine' | 'Plains' | 'Mesa' | 'Caverns'>('Alpine');
  const [meshingMode, setMeshingMode] = useState<'raw' | 'greedy'>('greedy');
  const [activeCodeLang, setActiveCodeLang] = useState<string>('C++');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(0.5);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Network Delta Simulation State
  const [deltaPackets, setDeltaPackets] = useState<Array<{ id: number; bytesRaw: number; bytesDelta: number; reduction: string }>>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Voxel simulation rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let localAngle = rotationAngle;

    const render = () => {
      if (isSimulating) {
        localAngle += 0.005;
        setRotationAngle(localAngle);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const originX = width / 2;
      const originY = height / 2 + 30;

      // Isometric projection constants
      const gridSize = 12;
      const voxelWidth = 18;
      const voxelHeight = 10;
      const voxelDepth = 12;

      // Generate heights using simple procedural multi-octave formula
      const heights: number[][] = [];
      for (let x = 0; x < gridSize; x++) {
        heights[x] = [];
        for (let z = 0; z < gridSize; z++) {
          const nx = (x / gridSize) * octaves;
          const nz = (z / gridSize) * octaves;
          let h = Math.sin(nx * 1.5 + localAngle) * Math.cos(nz * 1.5);
          if (octaves >= 2) h += Math.sin(nx * 3.0) * persistence * 0.5;
          if (octaves >= 3) h += Math.cos(nz * 6.0) * persistence * persistence * 0.25;

          // Biome offsets
          if (biome === 'Alpine') h = Math.abs(h) * 5 + 2;
          else if (biome === 'Plains') h = h * 1.5 + 2;
          else if (biome === 'Mesa') h = Math.floor(h * 3 + 4);
          else h = Math.sin(h * 4) * 2 + 2; // Caverns

          heights[x][z] = Math.max(1, Math.min(8, Math.round(h)));
        }
      }

      // Draw Isometric Grid
      for (let x = 0; x < gridSize; x++) {
        for (let z = 0; z < gridSize; z++) {
          const h = heights[x][z];
          const isoX = originX + (x - z) * voxelWidth;
          const isoY = originY + (x + z) * voxelHeight - h * voxelDepth;

          // Color palette based on biome
          let topColor = '#10b981';
          let sideColor = '#047857';
          let darkSideColor = '#065f46';

          if (biome === 'Alpine') {
            topColor = h > 5 ? '#f8fafc' : '#64748b';
            sideColor = h > 5 ? '#cbd5e1' : '#475569';
            darkSideColor = h > 5 ? '#94a3b8' : '#334155';
          } else if (biome === 'Mesa') {
            topColor = '#d97706';
            sideColor = '#b45309';
            darkSideColor = '#92400e';
          } else if (biome === 'Caverns') {
            topColor = '#6366f1';
            sideColor = '#4f46e5';
            darkSideColor = '#4338ca';
          }

          // In greedy mode, highlight merged borders vs raw quads
          ctx.lineWidth = meshingMode === 'raw' ? 1 : 1.5;
          ctx.strokeStyle = meshingMode === 'raw' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.2)';

          // Top face
          ctx.beginPath();
          ctx.moveTo(isoX, isoY);
          ctx.lineTo(isoX + voxelWidth, isoY + voxelHeight);
          ctx.lineTo(isoX, isoY + voxelHeight * 2);
          ctx.lineTo(isoX - voxelWidth, isoY + voxelHeight);
          ctx.closePath();
          ctx.fillStyle = topColor;
          ctx.fill();
          ctx.stroke();

          // Left face
          ctx.beginPath();
          ctx.moveTo(isoX - voxelWidth, isoY + voxelHeight);
          ctx.lineTo(isoX, isoY + voxelHeight * 2);
          ctx.lineTo(isoX, isoY + voxelHeight * 2 + h * voxelDepth);
          ctx.lineTo(isoX - voxelWidth, isoY + voxelHeight + h * voxelDepth);
          ctx.closePath();
          ctx.fillStyle = sideColor;
          ctx.fill();
          ctx.stroke();

          // Right face
          ctx.beginPath();
          ctx.moveTo(isoX, isoY + voxelHeight * 2);
          ctx.lineTo(isoX + voxelWidth, isoY + voxelHeight);
          ctx.lineTo(isoX + voxelWidth, isoY + voxelHeight + h * voxelDepth);
          ctx.lineTo(isoX, isoY + voxelHeight * 2 + h * voxelDepth);
          ctx.closePath();
          ctx.fillStyle = darkSideColor;
          ctx.fill();
          ctx.stroke();
        }
      }

      if (isSimulating) {
        animId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [octaves, persistence, biome, meshingMode, isSimulating]);

  // Periodic network delta simulator update
  useEffect(() => {
    const timer = setInterval(() => {
      const raw = Math.floor(Math.random() * 800 + 4000);
      const delta = Math.floor(raw * (0.05 + Math.random() * 0.08));
      const red = `${(((raw - delta) / raw) * 100).toFixed(1)}%`;
      setDeltaPackets((prev) => [{ id: Date.now(), bytesRaw: raw, bytesDelta: delta, reduction: red }, ...prev.slice(0, 4)]);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const currentSnippet = project.codeSnippets.find((s) => s.language === activeCodeLang) || project.codeSnippets[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const rawQuadsCount = 12 * 12 * 6 * 4; // ~3456 quads
  const greedyQuadsCount = Math.round(rawQuadsCount * 0.152); // ~525 quads

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Module Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
            <Layers className="w-4 h-4" />
            <span>PROJECT {project.number} · MINECRAFT ARCHITECTURAL MAPPING</span>
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
                  ? 'bg-emerald-500 text-slate-950 font-bold'
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

      {/* Main Interactive Stage & Control Deck (Split 65/35) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 3D/Isometric Voxel Canvas */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-300">Procedural Voxel Viewport</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono">
                {meshingMode === 'greedy' ? 'Greedy Mesh Active' : 'Raw Quad Mesh'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className="px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Play className="w-3 h-3" />
                <span>{isSimulating ? 'Pause Rotation' : 'Rotate'}</span>
              </button>
              <button
                onClick={() => {
                  setOctaves(3);
                  setPersistence(0.5);
                  setBiome('Alpine');
                }}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
                title="Reset Parameters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Canvas Render Area */}
          <div className="relative w-full h-80 sm:h-96 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800/60">
            <canvas
              ref={canvasRef}
              width={640}
              height={400}
              className="max-w-full max-h-full object-contain"
            />
            {/* Realtime Quad Reduction Overlay Badge */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 text-xs font-mono space-y-1">
              <div className="text-slate-400">
                Polygons: <strong className="text-white">{meshingMode === 'greedy' ? greedyQuadsCount : rawQuadsCount} Quads</strong>
              </div>
              <div className="text-emerald-400">
                Reduction: <strong>{meshingMode === 'greedy' ? '84.8% Saved' : '0% (Unoptimized)'}</strong>
              </div>
            </div>
          </div>

          {/* Interactive Parameters Sliders & Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Simplex Octaves</span>
                <span className="font-mono text-cyan-400">{octaves}</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={octaves}
                onChange={(e) => setOctaves(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Noise Persistence</span>
                <span className="font-mono text-cyan-400">{persistence.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={0.9}
                step={0.05}
                value={persistence}
                onChange={(e) => setPersistence(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400">Biome Selector</div>
              <div className="grid grid-cols-4 gap-1">
                {(['Alpine', 'Plains', 'Mesa', 'Caverns'] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setBiome(b)}
                    className={`py-1 text-xs rounded font-medium transition-colors ${
                      biome === b
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Technical Inspector & Optimization Metrics */}
        <div className="lg:col-span-4 space-y-4">
          {/* Meshing Algorithm Switcher */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Greedy Meshing Optimization
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Merges adjacent coplanar voxel faces along 2D scanline slices, drastically reducing vertex submission overhead before GPU draw calls.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setMeshingMode('raw')}
                className={`py-2 text-xs rounded-lg font-medium transition-all ${
                  meshingMode === 'raw'
                    ? 'bg-slate-800 text-white border border-slate-600 font-semibold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Raw Cubic Quads
              </button>
              <button
                onClick={() => setMeshingMode('greedy')}
                className={`py-2 text-xs rounded-lg font-semibold transition-all ${
                  meshingMode === 'greedy'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Greedy Merged
              </button>
            </div>
          </div>

          {/* SVO Memory Architecture */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Sparse Voxel Octree (SVO) Cache
              </span>
              <span className="text-xs text-emerald-400 font-mono">0 Allocations / Tick</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Chunk Page Grid:</span>
                <span className="text-slate-200">16 x 16 x 256</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Direct Off-Heap Memory:</span>
                <span className="text-cyan-400">65.5 KB / Chunk</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">SVO Octant Node Mask:</span>
                <span className="text-emerald-400">8-bit Child Mask</span>
              </div>
            </div>
          </div>

          {/* Network Replication Delta-Stream Simulator */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-violet-400" />
                FlatBuffers Delta Replication
              </span>
              <span className="text-xs text-cyan-400 font-mono">UDP Stream</span>
            </div>
            <div className="space-y-1.5">
              {deltaPackets.map((pkt) => (
                <div
                  key={pkt.id}
                  className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-xs font-mono"
                >
                  <span className="text-slate-400">{pkt.bytesRaw} B &rarr; {pkt.bytesDelta} B</span>
                  <span className="text-emerald-400 font-semibold">{pkt.reduction} saved</span>
                </div>
              ))}
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
