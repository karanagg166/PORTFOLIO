'use client';

import React, { useState } from 'react';
import { EXPERIENCE } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Experience() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 px-4 min-h-screen flex items-center justify-center font-mono" id="experience">
      <div ref={containerRef} className="w-full max-w-4xl">
        <div className="rounded-xl border border-white/10 bg-[#05080f]/85 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono tracking-[0.2em] text-amber-400 uppercase">
                FLIGHT TRAJECTORY // CAREER TIMELINE
              </span>
            </div>
            <div className="text-[11px] font-mono text-white/40 hidden sm:block">
              VECTOR: EXPANDING
            </div>
          </div>

          {/* Timeline Body */}
          <div className="p-6 sm:p-10 relative">
            {/* Trajectory Vertical Line */}
            <div className="absolute left-10 sm:left-14 top-12 bottom-12 w-px bg-gradient-to-b from-amber-400/60 via-cyan-500/30 to-transparent" />

            <div className="space-y-8">
              {EXPERIENCE.map((exp, i) => {
                const isExpanded = expandedIndex === i;
                return (
                  <div key={i} className="relative pl-12 sm:pl-16">
                    {/* Node Dot */}
                    <div
                      className={`absolute left-[33px] sm:left-[49px] top-1.5 w-3.5 h-3.5 rounded-full transition-all duration-300 border ${
                        i === 0
                          ? 'bg-amber-400 border-amber-300 shadow-[0_0_12px_rgba(212,168,82,0.8)]'
                          : 'bg-cyan-500 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                      }`}
                    />

                    {/* Timeline Content Card */}
                    <div
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      className="p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer space-y-3"
                    >
                      {/* Date & Orbit Stage */}
                      <div className="flex flex-wrap items-center justify-between text-xs text-amber-400/80 gap-2">
                        <span className="font-semibold uppercase tracking-wider">// STAGE {EXPERIENCE.length - i}</span>
                        <span className="text-white/50">{exp.date}</span>
                      </div>

                      {/* Role Message */}
                      <div className="text-sm sm:text-base font-bold text-white flex items-center justify-between">
                        <span>{exp.message}</span>
                        <span className="text-white/30 text-xs">{isExpanded ? '▲' : '▼'}</span>
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden pt-3 border-t border-white/10 text-xs sm:text-sm text-white/70 font-sans leading-relaxed space-y-2"
                          >
                            <p className="whitespace-pre-wrap font-sans">{exp.body}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
