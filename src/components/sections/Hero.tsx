'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';
import { PERSONAL_INFO } from '@/lib/constants';
import { useInViewGSAP } from '@/hooks/useInViewGSAP';

export default function Hero() {
  const containerRef = useInViewGSAP<HTMLDivElement>({ threshold: 0.1, y: 30, duration: 0.8 });
  const [phase, setPhase] = useState<'command' | 'resolving' | 'installing' | 'done'>('command');
  const [installedCount, setInstalledCount] = useState(0);

  const { displayedText: commandText, isTyping: isCommandTyping } = useTypewriter(
    '$ npm install karan-aggarwal', 45
  );

  // Phase progression
  useEffect(() => {
    if (!isCommandTyping && phase === 'command') {
      const t = setTimeout(() => setPhase('resolving'), 400);
      return () => clearTimeout(t);
    }
  }, [isCommandTyping, phase]);

  useEffect(() => {
    if (phase === 'resolving') {
      const t = setTimeout(() => setPhase('installing'), 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'installing') {
      const total = PERSONAL_INFO.npmPackages.length;
      if (installedCount < total) {
        const t = setTimeout(() => setInstalledCount((c) => c + 1), 350);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('done'), 600);
        return () => clearTimeout(t);
      }
    }
  }, [phase, installedCount]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20" id="hero">
      <div ref={containerRef} className="w-full max-w-3xl">
        {/* Terminal Window */}
        <div className="glass-holo overflow-hidden shadow-[0_0_80px_rgba(124,58,237,0.15)] border border-white/10" style={{ borderRadius: '12px' }}>
          {/* macOS title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors" />
            <div className="mx-auto text-xs text-white/40 font-mono">bash — 80×24</div>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm sm:text-base text-cyan-50 min-h-[320px] flex flex-col">
            {/* Command line */}
            <div className="flex gap-2 items-start">
              <span className="text-green-400 font-bold flex-shrink-0">❯</span>
              <span className="text-white relative">
                {commandText}
                {isCommandTyping && (
                  <span className="inline-block w-2 h-5 bg-white ml-0.5 animate-pulse align-middle" />
                )}
              </span>
            </div>

            {/* Resolving phase */}
            {(phase === 'resolving' || phase === 'installing' || phase === 'done') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-white/50 text-sm"
              >
                <span className="animate-pulse">⠋</span> Resolving packages...
              </motion.div>
            )}

            {/* Installing packages */}
            {(phase === 'installing' || phase === 'done') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 space-y-1"
              >
                <div className="text-white/50 text-sm mb-2">Installing dependencies:</div>
                {PERSONAL_INFO.npmPackages.map((pkg, i) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={i < installedCount ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]">✓</span>
                    <span className="text-white/80">{pkg.name}</span>
                    <span className="text-white/30">@{pkg.version}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Success message */}
            {phase === 'done' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 space-y-1"
              >
                <div className="text-green-400 font-bold drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                  ✅ Successfully installed karan-aggarwal@1.0.0 🚀
                </div>
                <div className="text-white/60">Ready to build something great.</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="#about"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 font-mono text-sm shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]"
              >
                Explore Portfolio →
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-all duration-300 font-mono text-sm"
              >
                Hire Me 🚀
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-16 flex flex-col items-center gap-2"
            >
              <span className="text-white/30 text-xs font-mono">scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
              >
                <div className="w-1 h-2 rounded-full bg-cyan-400/60" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
