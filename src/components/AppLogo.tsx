import React from 'react';
import logoImg from '../assets/images/kbt_app_logo_icon_1793577982520.jpg';

export interface AppLogoProps {
  /**
   * Sizing and styling variant based on kbt-integration-guide.txt:
   * - 'web': Header bars for desktop web browsers & web apps (36x36 / 40x40)
   * - 'mobile': Mobile App Bars (iOS / Android) (28x28)
   * - 'desktop': Desktop Title Bars (Windows / macOS) (32x32 / 48x48)
   * - 'splash': Splash screen / hero presentation (64x64 or 80x80)
   */
  variant?: 'web' | 'mobile' | 'desktop' | 'splash';
  showText?: boolean;
  className?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  variant = 'web',
  showText = true,
  className = '',
}) => {
  // Sizing definitions mapped to platform specifications
  const sizeConfig = {
    mobile: {
      container: 'w-7 h-7 min-w-7', // 28x28
      img: 'w-7 h-7',
      text: 'text-sm font-semibold tracking-tight',
      subtext: 'text-[9px] text-cyan-400 font-mono',
    },
    desktop: {
      container: 'w-8 h-8 min-w-8 sm:w-9 sm:h-9', // 32x32 to 36x36 for native title bars
      img: 'w-8 h-8 sm:w-9 sm:h-9',
      text: 'text-sm font-bold tracking-tight',
      subtext: 'text-[10px] text-cyan-400 font-mono',
    },
    web: {
      container: 'w-9 h-9 min-w-9 sm:w-10 sm:h-10', // 36x36 to 40x40 for web header
      img: 'w-9 h-9 sm:w-10 sm:h-10',
      text: 'text-base font-bold tracking-tight',
      subtext: 'text-[10px] text-cyan-400 font-mono tracking-wider',
    },
    splash: {
      container: 'w-16 h-16 sm:w-20 sm:h-20', // 64x64 to 80x80 hero
      img: 'w-16 h-16 sm:w-20 sm:h-20',
      text: 'text-2xl font-black tracking-tight',
      subtext: 'text-xs text-cyan-400 font-mono tracking-widest uppercase',
    },
  }[variant];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Superellipse / Squircle Masked Logo Container */}
      <div
        className={`relative ${sizeConfig.container} mask-squircle overflow-hidden bg-slate-950 ring-1 ring-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.25)] flex items-center justify-center shrink-0 transition-transform hover:scale-105`}
        title="KayBiT Games - Systems Programming Engine"
      >
        <img
          src={logoImg}
          alt="KayBiT Logo"
          className={`${sizeConfig.img} object-cover object-center`}
          loading="eager"
        />
        {/* Subtle high-tech scanline / shine reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-white/15 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`${sizeConfig.text} font-display text-[var(--text-primary)] transition-colors`}>
              KayBiT<span className="text-cyan-400">_</span>Games
            </span>
            {variant === 'web' && (
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-semibold uppercase bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 rounded">
                v2.4
              </span>
            )}
          </div>
          <span className={sizeConfig.subtext}>
            SYSTEMS LAB
          </span>
        </div>
      )}
    </div>
  );
};
