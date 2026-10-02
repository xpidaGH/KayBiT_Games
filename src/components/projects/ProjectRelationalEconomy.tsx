import React, { useState } from 'react';
import { ProjectData, I18nLangCode } from '../../types';
import { TTSControlBar } from '../TTSControlBar';
import { Database, ShieldCheck, RefreshCw, GitCommit, Binary, Check, Copy } from 'lucide-react';

interface ProjectRelationalEconomyProps {
  project: ProjectData;
  currentLang?: I18nLangCode;
}

export const ProjectRelationalEconomy: React.FC<ProjectRelationalEconomyProps> = ({ project, currentLang = 'en' }) => {
  const [activeCodeLang, setActiveCodeLang] = useState<string>('SQL');
  const [traderABalance, setTraderABalance] = useState<number>(450);
  const [traderBBalance, setTraderBBalance] = useState<number>(1200);
  const [worldTier, setWorldTier] = useState<'Pre-Hardmode' | 'Hardmode' | 'Moon-Lord'>('Pre-Hardmode');
  const [txLog, setTxLog] = useState<string[]>([
    'INIT: Global World Ledger initialized with SERIALIZABLE isolation.',
    'LEDGER: Immutable Genesis Block registered.'
  ]);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Execute ACID Two-Player Escrow Trade
  const handleExecuteTrade = () => {
    if (traderBBalance < 250) {
      setTxLog((prev) => [`[TX-ABORT] Insufficient funds for Player B. Rolling back transaction.`, ...prev]);
      return;
    }

    setTraderBBalance((b) => b - 250);
    setTraderABalance((a) => a + 250);
    setTxLog((prev) => [
      `[TX-COMMIT-2PC] Atomic Trade Escrow: 1x Night's Edge Sword transferred for 250 Coins. Zero item duping.`,
      ...prev.slice(0, 7)
    ]);
  };

  const handleAdvanceTier = () => {
    if (worldTier === 'Pre-Hardmode') {
      setWorldTier('Hardmode');
      setTxLog((prev) => [`[WORLD-EVENT] Wall of Flesh purged. Migrated schema to Hardmode tier. Cobalt & Mythril veins unlocked.`, ...prev]);
    } else if (worldTier === 'Hardmode') {
      setWorldTier('Moon-Lord');
      setTxLog((prev) => [`[WORLD-EVENT] Celestial Pillars conquered. Luminite economy tier activated.`, ...prev]);
    } else {
      setWorldTier('Pre-Hardmode');
      setTxLog((prev) => [`[PITR-ROLLBACK] Point-in-time state rollback executed. Restored Pre-Hardmode ledger.`, ...prev]);
    }
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
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-400">
            <Database className="w-4 h-4" />
            <span>PROJECT {project.number} · TERRARIA ARCHITECTURAL MAPPING</span>
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
                  ? 'bg-teal-500 text-slate-950 font-bold'
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

      {/* Main Grid: ACID Escrow Marketplace & Event Sourcing Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: ACID Marketplace & World Progression (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-semibold text-white">ACID Two-Player Escrow Desk</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-teal-400 font-mono">
              SERIALIZABLE (SELECT FOR UPDATE)
            </span>
          </div>

          {/* Player Wallets Escrow Visualizer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Player A (Seller)</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">UUID: 0x8F14</span>
              </div>
              <div className="text-xs text-slate-400">Inventory: Night's Edge Sword</div>
              <div className="text-sm font-bold font-mono text-emerald-400">{traderABalance} Coins</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Player B (Buyer)</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">UUID: 0x3E91</span>
              </div>
              <div className="text-xs text-slate-400">Bid Offer: 250 Coins for Item</div>
              <div className="text-sm font-bold font-mono text-amber-400">{traderBBalance} Coins</div>
            </div>
          </div>

          {/* Action: Trigger Two-Phase Commit Transaction */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExecuteTrade}
              className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-teal-500/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Execute Atomic 2PC Trade (Anti-Dupe Escrow)</span>
            </button>
          </div>

          {/* World State Machine Transitioner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-white">Scala Event-Driven Progression State Machine</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded font-mono font-bold bg-teal-950 text-teal-300">
                Current Tier: {worldTier}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transitioning milestones dynamically executes database schema migrations and unlocks advanced ore spawn tables.
            </p>
            <button
              onClick={handleAdvanceTier}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              {worldTier === 'Pre-Hardmode' ? 'Defeat Wall of Flesh -> Trigger Hardmode' :
               worldTier === 'Hardmode' ? 'Defeat Moon Lord -> Activate Celestial Tier' :
               'Rollback State via Point-In-Time Recovery (PITR)'}
            </button>
          </div>
        </div>

        {/* Right: Low-Level Chunk Archiving & Immutable Event Ledger (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* COBOL & Assembly Binary Packing View */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5 text-teal-400" />
                Low-Level Binary Chunk Storage
              </span>
              <span className="text-xs text-slate-400 font-mono">COBOL & Assembly</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fixed-width raw byte layouts pack tile grids directly into database pages, matching 8KB page boundaries.
            </p>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <div className="text-slate-500">HEX PAGE DUMP (CHUNK 0x01):</div>
              <div className="text-teal-400 truncate">00000000: 4B42 5431 0001 0100 00A4 0000 0000 0000</div>
              <div className="text-teal-400 truncate">00000010: 0002 0001 0000 0004 0002 0001 0000 0004</div>
            </div>
          </div>

          {/* Immutable Event Ledger Audit Stream */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
            <span className="text-xs font-semibold text-white">Append-Only Event Sourcing Ledger</span>
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 h-48 overflow-y-auto font-mono text-xs text-slate-300 space-y-1">
              {txLog.map((log, idx) => (
                <div key={idx} className={log.includes('COMMIT') ? 'text-teal-400' : log.includes('ABORT') ? 'text-rose-400' : log.includes('WORLD-EVENT') ? 'text-amber-400' : 'text-slate-400'}>
                  {log}
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
