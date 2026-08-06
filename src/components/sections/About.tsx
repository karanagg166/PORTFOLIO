'use client';

import React from 'react';
import Image from 'next/image';
import { PERSONAL_INFO } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function About() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 px-4 min-h-screen flex items-center justify-center font-mono" id="about">
      <div ref={containerRef} className="w-full max-w-4xl">
        {/* Mission Dossier Header Panel */}
        <div className="rounded-xl border border-white/10 bg-[#05080f]/85 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Top Panel Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono tracking-[0.2em] text-amber-400 uppercase">
                MISSION DOSSIER // PERSONNEL RECORD
              </span>
            </div>
            <div className="text-[11px] font-mono text-white/40 hidden sm:block">
              ID: KA-8849-ORD
            </div>
          </div>

          {/* Dossier Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Identity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Photo Frame */}
              <div className="flex flex-col items-center sm:items-start gap-3">
                <div className="relative w-36 h-36 rounded-lg overflow-hidden border border-amber-400/30 p-1 bg-white/5 shadow-[0_0_20px_rgba(212,168,82,0.1)]">
                  <div className="relative w-full h-full rounded bg-slate-900 overflow-hidden flex items-center justify-center">
                    <Image
                      src="/images/karan.jpeg"
                      alt={PERSONAL_INFO.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="text-[10px] text-white/40 tracking-wider uppercase font-mono">
                  BIOMETRIC CONFIRMED
                </div>
              </div>

              {/* Core Attributes Table */}
              <div className="md:col-span-2 space-y-3 font-mono text-xs sm:text-sm">
                <div className="grid grid-cols-3 border-b border-white/5 pb-2">
                  <span className="text-amber-400/70 uppercase">NAME</span>
                  <span className="col-span-2 text-white font-medium">{PERSONAL_INFO.name}</span>
                </div>
                <div className="grid grid-cols-3 border-b border-white/5 pb-2">
                  <span className="text-amber-400/70 uppercase">ROLE</span>
                  <span className="col-span-2 text-cyan-300 font-medium">{PERSONAL_INFO.role}</span>
                </div>
                <div className="grid grid-cols-3 border-b border-white/5 pb-2">
                  <span className="text-amber-400/70 uppercase">BASE</span>
                  <span className="col-span-2 text-white/90">India</span>
                </div>
                <div className="grid grid-cols-3 border-b border-white/5 pb-2">
                  <span className="text-amber-400/70 uppercase">EDUCATION</span>
                  <span className="col-span-2 text-white/90">B.Tech Computer Science</span>
                </div>
                <div className="grid grid-cols-3 pb-2">
                  <span className="text-amber-400/70 uppercase">STATUS</span>
                  <span className="col-span-2 text-emerald-400 font-semibold">Available for Engineering Roles</span>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-2 border-t border-white/10 pt-6">
              <div className="text-xs uppercase tracking-widest text-amber-400/80">
                // BIOGRAPHY
              </div>
              <p className="text-sm font-sans text-white/70 leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Current Focus */}
            <div className="space-y-2 border-t border-white/10 pt-6">
              <div className="text-xs uppercase tracking-widest text-amber-400/80">
                // CURRENT FOCUS
              </div>
              <div className="flex flex-wrap gap-3 font-mono text-xs text-cyan-300/90">
                <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                  Healthcare AI Pipelines
                </span>
                <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                  Exam & Education Systems
                </span>
                <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                  Scalable Next.js & FastAPI Architecture
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex justify-start">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all text-xs tracking-wider flex items-center gap-2"
              >
                <span>DOWNLOAD DOSSIER (RESUME)</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
