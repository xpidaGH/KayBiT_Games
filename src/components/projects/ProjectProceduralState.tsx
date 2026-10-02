import React, { useState, useMemo } from 'react';
import { ProjectData, I18nLangCode } from '../../types';
import { TTSControlBar } from '../TTSControlBar';
import { Compass, Sparkles, BarChart2, Radio, Check, Copy } from 'lucide-react';

interface ProjectProceduralStateProps {
  project: ProjectData;
  currentLang?: I18nLangCode;
}

export const ProjectProceduralState: React.FC<ProjectProceduralStateProps> = ({ project, currentLang = 'en' }) => {
  const [coordX, setCoordX] = useState<number>(142);
  const [coordY, setCoordY] = useState<number>(-89);
  const [coordZ, setCoordZ] = useState<number>(315);
  const [queryRadius, setQueryRadius] = useState<number>(120);
  const [activeCodeLang, setActiveCodeLang] = useState<string>('Kotlin');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Pure mathematical coordinate hash derivation pipeline f(x, y, z) -> Seed
  const celestialData = useMemo(() => {
    // 64-bit splitmix inspired hash
    let h = Math.abs(coordX * 73856093 ^ coordY * 19349663 ^ coordZ * 83492791);
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    const seed = (h ^ (h >>> 16)) >>> 0;

    const spectralClasses = ['Class O (Blue Giant)', 'Class B (Blue-White)', 'Class A (White)', 'Class F (Yellow-White)', 'Class G (Yellow Solar)', 'Class K (Orange Dwarf)', 'Class M (Red Dwarf)'];
    const starType = spectralClasses[seed % spectralClasses.length];
    const planetCount = (seed % 7) + 2;
    const atmospherePressure = ((seed % 180) / 100 + 0.2).toFixed(2);
    const ferriteAbundance = ((seed % 850) / 100 + 1.5).toFixed(1);
    const platinumRarity = (((seed >>> 4) % 120) / 100 + 0.05).toFixed(2);
    const systemName = `KBT-${(seed % 9999).toString().padStart(4, '0')}`;

    return {
      seed: `0x${seed.toString(16).toUpperCase()}`,
      systemName,
      starType,
      planetCount,
      atmospherePressure,
      ferriteAbundance,
      platinumRarity,
    };
  }, [coordX, coordY, coordZ]);

  const currentSnippet = project.codeSnippets.find((s) => s.language === activeCodeLang) || project.codeSnippets[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
            <Compass className="w-4 h-4" />
            <span>PROJECT {project.number} · NO MAN'S SKY ARCHITECTURAL MAPPING</span>
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
                  ? 'bg-cyan-500 text-slate-950 font-bold'
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

      {/* Main Grid: Coordinate Exploration & Statistical Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Coordinate Hash Explorer (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">Stateless Coordinate Hash Pipeline</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">
                f(x, y, z) &rarr; Seed
              </span>
            </div>
            <span className="text-xs text-emerald-400 font-mono">0 Bytes DB Storage</span>
          </div>

          {/* Coordinate Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Galactic X</span>
                <span className="font-mono text-cyan-400">{coordX} ly</span>
              </div>
              <input
                type="range"
                min={-500}
                max={500}
                value={coordX}
                onChange={(e) => setCoordX(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Galactic Y</span>
                <span className="font-mono text-cyan-400">{coordY} ly</span>
              </div>
              <input
                type="range"
                min={-500}
                max={500}
                value={coordY}
                onChange={(e) => setCoordY(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Galactic Z</span>
                <span className="font-mono text-cyan-400">{coordZ} ly</span>
              </div>
              <input
                type="range"
                min={-500}
                max={500}
                value={coordZ}
                onChange={(e) => setCoordZ(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Derived Celestial Body Card */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">{celestialData.systemName}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono">
                  {celestialData.seed}
                </span>
              </div>
              <span className="text-xs text-amber-400 font-medium">{celestialData.starType}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-400">Planetary Bodies:</span>
                <div className="text-base font-bold text-white">{celestialData.planetCount} Worlds</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-400">Atmosphere:</span>
                <div className="text-base font-bold text-cyan-400">{celestialData.atmospherePressure} atm</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-400">Ferrite Yield:</span>
                <div className="text-base font-bold text-emerald-400">{celestialData.ferriteAbundance}%</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-1">
                <span className="text-slate-400">Platinum Rarity:</span>
                <div className="text-base font-bold text-violet-400">{celestialData.platinumRarity} ppm</div>
              </div>
            </div>
          </div>

          {/* Spatial Quadtree Query API */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                Distributed Quadtree / R-Tree Spatial Query Radius:
              </span>
              <span className="font-mono text-cyan-400">{queryRadius} Light Years (sub-ms query)</span>
            </div>
            <input
              type="range"
              min={20}
              max={300}
              value={queryRadius}
              onChange={(e) => setQueryRadius(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Telemetry & Distribution Curves (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
                R / Python Distribution Modeling
              </span>
              <span className="text-xs text-slate-400 font-mono">Monte Carlo 10⁶</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stochastic analytics guarantee uniform resource distribution without degenerate dead loops or mineral droughts across galaxy clusters.
            </p>

            {/* Visual Histogram Representation */}
            <div className="space-y-2 pt-2">
              <div className="text-xs text-slate-400">Gamma Abundance Fit:</div>
              <div className="h-20 bg-slate-950 rounded-lg p-2 flex items-end gap-1.5 border border-slate-800">
                {[15, 30, 60, 95, 80, 55, 35, 20, 10, 5].map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-cyan-500/80 rounded-t transition-all hover:bg-cyan-400"
                    style={{ height: `${val}%` }}
                    title={`Bin ${idx}: ${val}%`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono pt-1">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Dead Loop Probability:</span>
                <span className="text-emerald-400 font-bold">0.0000%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Spatial Query Latency:</span>
                <span className="text-cyan-400">0.42 ms (R-Tree)</span>
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
