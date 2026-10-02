import React, { useState, useEffect, useRef } from 'react';
import { ProjectData, I18nLangCode } from '../../types';
import { TTSControlBar } from '../TTSControlBar';
import { Wrench, Play, RotateCcw, AlertTriangle, GitBranch, Check, Copy } from 'lucide-react';

interface ProjectKinematicCompilerProps {
  project: ProjectData;
  currentLang?: I18nLangCode;
}

export const ProjectKinematicCompiler: React.FC<ProjectKinematicCompilerProps> = ({ project, currentLang = 'en' }) => {
  // Mechanical rig parameters
  const [thrusterForce, setThrusterForce] = useState<number>(65);
  const [springStiffness, setSpringStiffness] = useState<number>(40);
  const [torquePayload, setTorquePayload] = useState<number>(8500); // Newtons
  const [isBroken, setIsBroken] = useState<boolean>(false);
  const [activeCodeLang, setActiveCodeLang] = useState<string>('TypeScript');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Logic Circuit State
  const [switchA, setSwitchA] = useState<boolean>(true);
  const [switchB, setSwitchB] = useState<boolean>(false);
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'XOR'>('XOR');

  // Compute logic gate output
  const gateOutput =
    gateType === 'AND'
      ? switchA && switchB
      : gateType === 'OR'
      ? switchA || switchB
      : (switchA && !switchB) || (!switchA && switchB);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Structural stress limit: 12,000 N
  const yieldStrength = 12000;
  const currentStress = torquePayload + (gateOutput ? thrusterForce * 40 : 0);

  useEffect(() => {
    setIsBroken(currentStress > yieldStrength);
  }, [currentStress]);

  // Physics animation render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const anchorX = w / 2;
      const anchorY = 80;

      // Base mount
      ctx.fillStyle = '#475569';
      ctx.fillRect(anchorX - 30, anchorY - 10, 60, 20);

      // Spring displacement
      const displacement = isBroken
        ? 80
        : Math.sin(t) * (gateOutput ? thrusterForce * 0.2 : 5) * (100 / (springStiffness + 20));
      const bodyY = anchorY + 80 + displacement;

      // Draw spring / linkage
      ctx.strokeStyle = isBroken ? '#ef4444' : '#94a3b8';
      ctx.lineWidth = isBroken ? 2 : 4;
      ctx.beginPath();
      ctx.moveTo(anchorX, anchorY);
      if (isBroken) {
        ctx.lineTo(anchorX - 15, anchorY + 35);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(anchorX + 15, anchorY + 50);
        ctx.lineTo(anchorX, bodyY);
        ctx.stroke();
      } else {
        ctx.lineTo(anchorX, bodyY);
        ctx.stroke();
      }

      // Draw rigid arm
      ctx.fillStyle = isBroken ? '#991b1b' : '#334155';
      ctx.fillRect(anchorX - 60, bodyY, 120, 24);
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.strokeRect(anchorX - 60, bodyY, 120, 24);

      // Draw thrusters on ends
      if (gateOutput && !isBroken) {
        // Thruster flame
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(anchorX - 50, bodyY + 24);
        ctx.lineTo(anchorX - 40, bodyY + 50 + Math.random() * 15);
        ctx.lineTo(anchorX - 30, bodyY + 24);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(anchorX + 30, bodyY + 24);
        ctx.lineTo(anchorX + 40, bodyY + 50 + Math.random() * 15);
        ctx.lineTo(anchorX + 50, bodyY + 24);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [thrusterForce, springStiffness, isBroken, gateOutput]);

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
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400">
            <Wrench className="w-4 h-4" />
            <span>PROJECT {project.number} · SCRAP MECHANIC ARCHITECTURAL MAPPING</span>
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
                  ? 'bg-rose-500 text-slate-950 font-bold'
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

      {/* Main Grid: Rig Canvas & Logic AST Compiler */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Physics Constraint Rig Viewport (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">Impulse Velocity Constraint Rig</span>
              <span className={`text-xs px-2 py-0.5 rounded font-mono ${isBroken ? 'bg-rose-950 text-rose-400' : 'bg-slate-800 text-emerald-400'}`}>
                {isBroken ? 'LINKAGE FRACTURED' : 'CONSTRAINTS INTACT'}
              </span>
            </div>

            <button
              onClick={() => {
                setTorquePayload(6000);
                setIsBroken(false);
              }}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
              title="Reset Linkage"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative w-full h-64 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800/60">
            <canvas ref={canvasRef} width={500} height={250} className="max-w-full max-h-full" />
            {isBroken && (
              <div className="absolute inset-0 bg-rose-950/40 backdrop-blur-xs flex items-center justify-center">
                <div className="bg-slate-900 border border-rose-500 rounded-xl p-3 text-center space-y-1">
                  <AlertTriangle className="w-5 h-5 text-rose-500 mx-auto" />
                  <div className="text-xs font-bold text-white">Tensile Yield Exceeded</div>
                  <div className="text-xs text-slate-400">Stress: {currentStress.toLocaleString()} N &gt; {yieldStrength.toLocaleString()} N</div>
                </div>
              </div>
            )}
          </div>

          {/* Physics Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Thruster Force</span>
                <span className="font-mono text-rose-400">{thrusterForce} N</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={thrusterForce}
                onChange={(e) => setThrusterForce(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Spring Damping</span>
                <span className="font-mono text-cyan-400">{springStiffness} N/m</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={springStiffness}
                onChange={(e) => setSpringStiffness(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Torque Load</span>
                <span className="font-mono text-amber-400">{torquePayload} N</span>
              </div>
              <input
                type="range"
                min={2000}
                max={15000}
                step={500}
                value={torquePayload}
                onChange={(e) => setTorquePayload(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right: AST Grid Wiring Engine & Logic Compiler (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-rose-400" />
                AST Grid Wiring Compiler
              </span>
              <span className="text-xs text-emerald-400 font-mono">Tarjan SCC Active</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Wires between switches, gates, and actuators compile into an AST bytecode graph executed without recursion traps.
            </p>

            {/* Interactive Gate Wiring */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 font-semibold">Inputs & Logic Operators:</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSwitchA(!switchA)}
                  className={`flex-1 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
                    switchA ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Switch A: {switchA ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setSwitchB(!switchB)}
                  className={`flex-1 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
                    switchB ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Switch B: {switchB ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="flex items-center justify-between gap-1 text-xs">
                <span className="text-slate-400">Logic Gate:</span>
                {(['AND', 'OR', 'XOR'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGateType(g)}
                    className={`px-3 py-1 rounded font-mono font-semibold transition-colors ${
                      gateType === g ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* AST Compiled Result */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Compiled Actuator Output:</span>
                <span className={`font-bold px-2 py-0.5 rounded ${gateOutput ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  THRUSTERS {gateOutput ? 'FIRING' : 'IDLE'}
                </span>
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
