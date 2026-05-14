'use client';

import React, { useState, useRef, useEffect } from 'react';
import { EXPERIENCE } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Experience() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const [expandedCommit, setExpandedCommit] = useState<string | null>(null);
  const [visibleCommits, setVisibleCommits] = useState<Set<string>>(new Set());

  // Stagger reveal commits on scroll
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          EXPERIENCE.forEach((exp, i) => {
            setTimeout(() => {
              setVisibleCommits((prev) => new Set([...prev, exp.hash]));
            }, i * 300);
          });
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 min-h-screen flex flex-col items-center justify-center font-mono" id="experience">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold font-raleway text-white mb-2">Career Timeline</h2>
        <p className="text-white/40 font-mono text-sm">$ git log --oneline --graph</p>
      </div>

      <div
        ref={containerRef}
        className="w-full max-w-3xl glass bg-black/40 border-white/10 p-6 md:p-8 shadow-[0_0_60px_rgba(124,58,237,0.08)] relative"
        style={{ borderRadius: '12px' }}
      >
        {/* Git graph line */}
        <div className="absolute left-10 md:left-14 top-16 bottom-8 w-px bg-gradient-to-b from-cyan-500/40 via-purple-500/30 to-transparent" />

        <div className="space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.hash}
              initial={{ opacity: 0, x: -30 }}
              animate={visibleCommits.has(exp.hash) ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 pl-10 md:pl-14"
            >
              {/* Graph node */}
              <div className={`absolute left-[34px] md:left-[50px] top-2 w-3 h-3 rounded-full transition-all duration-500 ${
                i === 0
                  ? 'bg-cyan-400 shadow-[0_0_12px_#06b6d4]'
                  : 'bg-purple-500 shadow-[0_0_8px_#7c3aed]'
              }`} />

              {/* Branch decorator for HEAD */}
              {i === 0 && (
                <div className="absolute left-[52px] md:left-[68px] top-0.5 text-[9px] text-yellow-400 hidden md:block">
                  ← HEAD
                </div>
              )}

              <div
                className="cursor-pointer hover:bg-white/[0.03] p-3 -ml-3 rounded-lg transition-colors group"
                onClick={() => setExpandedCommit(expandedCommit === exp.hash ? null : exp.hash)}
              >
                {/* Commit header */}
                <div className="text-xs mb-1.5 flex flex-wrap items-center gap-1">
                  <span className="text-yellow-500/80">commit</span>
                  <span className="text-cyan-300">{exp.hash}</span>
                  {exp.branch && <span className="text-yellow-400/50 text-[10px]">{exp.branch}</span>}
                </div>

                {/* Date */}
                <div className="text-white/30 text-xs mb-2">Date: {exp.date}</div>

                {/* Commit message */}
                <div className="text-white font-bold text-sm md:text-base flex items-center gap-2">
                  <span className="text-white/20">│</span>
                  {exp.message}
                  <span className="text-white/20 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {expandedCommit === exp.hash ? '▼' : '▶'}
                  </span>
                </div>

                {/* Expanded details */}
                <AnimatePresence>
                  {expandedCommit === exp.hash && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-5 mt-4 border-l-2 border-white/10 pl-4">
                        <div className="text-white/30 text-xs mb-1">Author: {exp.author}</div>
                        <div className="text-white/70 whitespace-pre-wrap text-sm mb-4 leading-relaxed mt-3">
                          {exp.body}
                        </div>
                        <div className="text-xs flex gap-4 pt-2 border-t border-white/10">
                          <span className="text-white/40">{exp.filesChanged} files changed</span>
                          <span className="text-green-400">+{exp.insertions}</span>
                          <span className="text-red-400">-{exp.deletions}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
