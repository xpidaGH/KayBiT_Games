import React, { useState } from 'react';
import { ProjectData, I18nLangCode } from '../../types';
import { TTSControlBar } from '../TTSControlBar';
import { Terminal, Shield, Play, Lock, AlertCircle, Check, Copy } from 'lucide-react';

interface ProjectSandboxedVMProps {
  project: ProjectData;
  currentLang?: I18nLangCode;
}

export const ProjectSandboxedVM: React.FC<ProjectSandboxedVMProps> = ({ project, currentLang = 'en' }) => {
  const [activeCodeLang, setActiveCodeLang] = useState<string>('TypeScript');
  const [scriptType, setScriptType] = useState<'safe' | 'malicious_memory' | 'malicious_syscall'>('safe');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [gasUsed, setGasUsed] = useState<number>(0);
  const [statusState, setStatusState] = useState<'IDLE' | 'RUNNING' | 'TERMINATED_SECCOMP' | 'TERMINATED_OOM' | 'COMPLETED_SUCCESS'>('IDLE');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Microservice Mesh Scale
  const [podCount, setPodCount] = useState<number>(4);

  const handleRunScript = () => {
    setIsExecuting(true);
    setStatusState('RUNNING');
    setExecutionLog(['[VM-HOST] Allocating isolated Linux namespace (CLONE_NEWPID | CLONE_NEWNET)...', '[VM-HOST] Initializing seccomp-bpf filter syscall whitelist...']);

    setTimeout(() => {
      if (scriptType === 'safe') {
        setGasUsed(14200);
        setStatusState('COMPLETED_SUCCESS');
        setExecutionLog((prev) => [
          ...prev,
          '[CGROUP] Memory usage: 4.8MB / 32.0MB (within threshold)',
          '[SECCOMP] Syscalls: read(), write() -> ALLOWED',
          '[SANDBOX-GUEST] Game loop executed safely. Gas consumed: 14,200 units.',
          '[VM-HOST] Container exited normally with code 0.'
        ]);
      } else if (scriptType === 'malicious_memory') {
        setGasUsed(99000);
        setStatusState('TERMINATED_OOM');
        setExecutionLog((prev) => [
          ...prev,
          '[CGROUP] ALERT: Allocation burst: 32.4MB > 32.0MB quota!',
          '[CGROUP-OOM-KILLER] Process SIGKILL dispatched to PID 4120',
          '[VM-HOST] Container terminated: Memory Limit Exceeded (32MB cap).'
        ]);
      } else {
        // Malicious syscall
        setGasUsed(3500);
        setStatusState('TERMINATED_SECCOMP');
        setExecutionLog((prev) => [
          ...prev,
          '[SECCOMP] TRAP: Illegal syscall blocked: sys_execve("/bin/sh")',
          '[SECCOMP] SIGSYS emitted: Untrusted tenant attempted privilege escalation.',
          '[VM-HOST] Sandbox terminated instantly. Host system untouched.'
        ]);
      }
      setIsExecuting(false);
    }, 700);
  };

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
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-violet-400">
            <Shield className="w-4 h-4" />
            <span>PROJECT {project.number} · ROBLOX ARCHITECTURAL MAPPING</span>
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
                  ? 'bg-violet-500 text-slate-950 font-bold'
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

      {/* Main Grid: Interactive VM Sandbox & Multi-tenant Mesh */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Hardened VM Sandbox Execution Console (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">Hardened Sandbox Runtime (cgroups & seccomp)</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded font-mono font-semibold ${
              statusState === 'COMPLETED_SUCCESS' ? 'bg-emerald-950 text-emerald-400' :
              statusState === 'TERMINATED_OOM' || statusState === 'TERMINATED_SECCOMP' ? 'bg-rose-950 text-rose-400' :
              'bg-slate-800 text-slate-400'
            }`}>
              {statusState}
            </span>
          </div>

          {/* Script Payload Picker */}
          <div className="space-y-2">
            <div className="text-xs text-slate-400">Select Untrusted Tenant Script Payload:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setScriptType('safe')}
                className={`p-2.5 rounded-lg text-xs text-left border transition-all ${
                  scriptType === 'safe'
                    ? 'bg-slate-800 border-emerald-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-semibold text-emerald-400">1. Nominal Game Loop</div>
                <div className="text-slate-500 text-xs mt-0.5">Compliant physics & logic</div>
              </button>

              <button
                onClick={() => setScriptType('malicious_memory')}
                className={`p-2.5 rounded-lg text-xs text-left border transition-all ${
                  scriptType === 'malicious_memory'
                    ? 'bg-slate-800 border-rose-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-semibold text-rose-400">2. Memory Flood Attack</div>
                <div className="text-slate-500 text-xs mt-0.5">Exceeds 32MB cgroup cap</div>
              </button>

              <button
                onClick={() => setScriptType('malicious_syscall')}
                className={`p-2.5 rounded-lg text-xs text-left border transition-all ${
                  scriptType === 'malicious_syscall'
                    ? 'bg-slate-800 border-rose-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-semibold text-rose-400">3. Syscall Jailbreak</div>
                <div className="text-slate-500 text-xs mt-0.5">Triggers seccomp trap</div>
              </button>
            </div>
          </div>

          {/* Action Trigger */}
          <button
            onClick={handleRunScript}
            disabled={isExecuting}
            className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-violet-600/20"
          >
            <Play className="w-4 h-4" />
            <span>{isExecuting ? 'Executing in Kernel Sandbox...' : 'Run Untrusted Script in Sandbox'}</span>
          </button>

          {/* Terminal Output Log */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 h-48 overflow-y-auto font-mono text-xs text-slate-300 space-y-1">
            <div className="text-slate-500 flex items-center gap-1.5 pb-1 border-b border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-violet-400" />
              <span>Sandbox Isolation Telemetry Console</span>
            </div>
            {executionLog.length === 0 ? (
              <div className="text-slate-600 pt-3 text-center">Click 'Run Untrusted Script' to trigger container isolation cycle.</div>
            ) : (
              executionLog.map((line, idx) => (
                <div key={idx} className={line.includes('ALERT') || line.includes('TRAP') ? 'text-rose-400 font-bold' : line.includes('SUCCESS') || line.includes('ALLOWED') ? 'text-emerald-400' : 'text-slate-300'}>
                  {line}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Multi-tenant Mesh & Content-Addressable Storage (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Multi-tenant Pod Scaler */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-violet-400" />
                Multi-Tenant Microservice Mesh
              </span>
              <span className="text-xs text-cyan-400 font-mono">{podCount} Active Pods</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically provisions ephemeral container runtimes under incoming traffic surges with automated health pruning.
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Cluster Pod Autoscaling</span>
                <span className="font-mono text-violet-400">{podCount} Isolates</span>
              </div>
              <input
                type="range"
                min={2}
                max={16}
                value={podCount}
                onChange={(e) => setPodCount(Number(e.target.value))}
                className="w-full accent-violet-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Content-Addressable Storage (CAS) */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <span className="text-xs font-semibold text-white">Content-Addressable Storage (CAS)</span>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400">Immutable SHA-256 Digest:</div>
                <div className="text-emerald-400 truncate">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Tamper Resistance:</span>
                <span className="text-emerald-400 font-bold">Cryptographically Verified</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Fuzzing Speed:</span>
                <span className="text-cyan-400">10,000 payloads / min</span>
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
