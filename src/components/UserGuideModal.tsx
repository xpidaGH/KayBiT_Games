import React, { useState } from 'react';
import { I18nLangCode } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { PROJECTS_DATA } from '../data/projectsData';
import { X, Search, Globe, Copy, Check, BookOpen, Layers, ShieldCheck, Cpu } from 'lucide-react';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: I18nLangCode;
  onChangeLang: (lang: I18nLangCode) => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onChangeLang,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
  const translation = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
  const isRTL = currentMeta.dir === 'rtl';

  // Fallback to English guide data if localized project list is empty in translations map
  const projectGuides = translation.projectGuides?.length > 0
    ? translation.projectGuides
    : TRANSLATIONS.en.projectGuides;

  const handleCopyGuide = () => {
    const textContent = `${translation.title}\n${translation.subtitle}\n\n${translation.introduction}\n\nQuick Start:\n${translation.quickStart}`;
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredProjects = projectGuides.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.focus.toLowerCase().includes(q) ||
      p.inspiration.toLowerCase().includes(q) ||
      p.technicalArchitecture.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
      >
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display text-white">
                  {translation.title}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  USER_GUIDE.md
                </span>
              </div>
              <p className="text-xs text-slate-400">{translation.subtitle}</p>
            </div>
          </div>

          {/* Controls: 21 Languages Dropdown + Actions */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={currentLang}
                onChange={(e) => onChangeLang(e.target.value as I18nLangCode)}
                aria-label="Translate User Guide into 21 internationalization languages"
                className="pl-7 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 hover:border-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors cursor-pointer appearance-none"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.flag} {lang.nativeLabel} ({lang.label})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCopyGuide}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
              title="Copy Summary"
              aria-label="Copy Guide"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Quick Filter Bar */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts, architectures, languages (e.g. SVO, ECS, Rust, ACID)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>21 Target Languages</span>
            <span>·</span>
            <span>6 Systems Modules</span>
            <span>·</span>
            <span>21 Translations Active</span>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 text-sm leading-relaxed text-slate-300">
          {/* Section 1: Executive Mission */}
          <section className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase font-mono">
              <Cpu className="w-4 h-4" />
              <span>Pedagogical Mission & Laboratory Blueprint</span>
            </div>
            <p className="text-slate-300 text-sm">{translation.introduction}</p>
            <div className="pt-2 border-t border-slate-800/80 flex items-start gap-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-200 whitespace-nowrap">Quick Start:</span>
              <span>{translation.quickStart}</span>
            </div>
          </section>

          {/* Section 2: The 6 Specialized Architectural Projects */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Specialized Sandbox Architecture Modules (6 Projects)</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {filteredProjects.length} of 6 Modules shown
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredProjects.map((p, idx) => {
                const projectMeta = PROJECTS_DATA.find((pr) => pr.id === p.id);
                return (
                  <div
                    key={p.id || idx}
                    className="p-5 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: projectMeta?.accentHex || '#06b6d4' }}
                        />
                        <h4 className="text-sm font-semibold text-white">{p.title}</h4>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        Inspiration: <strong className="text-slate-200">{p.inspiration}</strong>
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 font-medium">
                      {p.focus}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300">
                      {p.technicalArchitecture}
                    </p>

                    {p.coreConcepts?.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-semibold text-slate-400">Core Architecture Mechanisms:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {p.coreConcepts.map((concept, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {p.learningExercises?.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80 space-y-1">
                        <span className="text-xs font-semibold text-cyan-400">Student Milestones & Exercises:</span>
                        <ul className="list-disc list-inside text-xs text-slate-400 space-y-0.5">
                          {p.learningExercises.map((ex, eIdx) => (
                            <li key={eIdx}>{ex}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Assessment & Grading Rubric */}
          <section className="space-y-3 bg-slate-950/40 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{translation.gradingRubricTitle}</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 pr-4 font-semibold">Evaluation Criteria</th>
                    <th className="py-2 px-4 font-semibold">Weight</th>
                    <th className="py-2 pl-4 font-semibold">Technical Expectations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {translation.gradingRubric.map((r, rIdx) => (
                    <tr key={rIdx} className="text-slate-300">
                      <td className="py-2.5 pr-4 font-medium text-white">{r.criteria}</td>
                      <td className="py-2.5 px-4 font-mono font-semibold text-cyan-400 tabular-nums">{r.weight}</td>
                      <td className="py-2.5 pl-4 text-slate-400">{r.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Architectural Glossary */}
          {translation.glossary?.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Systems Programming Architectural Glossary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {translation.glossary.map((g, gIdx) => (
                  <div key={gIdx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <div className="font-semibold text-cyan-400 font-mono mb-1">{g.term}</div>
                    <div className="text-slate-400">{g.definition}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <div>
            Current Language: <strong className="text-white">{currentMeta.flag} {currentMeta.nativeLabel}</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
