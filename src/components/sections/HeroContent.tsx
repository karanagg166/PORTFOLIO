import React from 'react';
import { PERSONAL_INFO } from '@/lib/constants';

export default function HeroContent() {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-start justify-center min-h-screen px-6 py-20 font-mono">
      {/* Top telemetry status bar */}
      <div className="w-full flex items-center justify-between text-xs tracking-widest text-amber-400/70 border-b border-white/10 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>MISSION OPERATOR</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-white/40">
          <span>ORBIT: 408 KM</span>
          <span className="text-emerald-400/80">STATUS: AVAILABLE</span>
          <span>LOCATION: INDIA</span>
        </div>
      </div>

      {/* Main Identifier */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-cyan-400/80">
          // SYSTEM INITIALIZED
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-mono uppercase">
          {PERSONAL_INFO.name}
        </h1>

        <div className="text-xl sm:text-2xl text-cyan-300/90 font-mono font-medium tracking-wide">
          {PERSONAL_INFO.role}
        </div>

        <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed max-w-2xl pt-2">
          {PERSONAL_INFO.bio}
        </p>
      </div>

      {/* CTA Actions */}
      <div className="mt-10 flex flex-wrap gap-4 items-center">
        <a
          href="#projects"
          className="px-6 py-3 rounded bg-amber-500/10 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 transition-all font-mono text-sm tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(212,168,82,0.15)]"
        >
          <span>EXPLORE MISSIONS</span>
          <span>→</span>
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded bg-white/5 border border-white/15 text-white/80 hover:bg-white/10 hover:text-white transition-all font-mono text-sm tracking-wider"
        >
          VIEW RESUME
        </a>
      </div>

      {/* Mobile telemetry */}
      <div className="sm:hidden mt-8 flex flex-col gap-1 text-[11px] text-white/40 font-mono">
        <div>ORBIT: 408 KM</div>
        <div className="text-emerald-400/80">STATUS: AVAILABLE</div>
        <div>LOCATION: INDIA</div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-16 flex items-center gap-3 text-xs text-white/40 font-mono">
        <span className="w-2 h-2 border-r border-b border-amber-400/60 rotate-45 animate-bounce" />
        <span className="tracking-widest uppercase">Scroll to begin orbital mission</span>
      </div>
    </div>
  );
}
