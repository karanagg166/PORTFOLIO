'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';
import { PERSONAL_INFO } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Hero() {
  const containerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1, y: 30, duration: 0.8 });
  const [phase, setPhase] = useState<'command' | 'resolving' | 'installing' | 'done'>('command');
  const [installedCount, setInstalledCount] = useState(0);
  const [windowState, setWindowState] = useState<'normal' | 'minimized' | 'closed' | 'maximized'>('normal');

  const { displayedText: commandText, isTyping: isCommandTyping } = useTypewriter(
    '$ npm install karan-aggarwal', 25
  );

  // Phase progression
  useEffect(() => {
    if (!isCommandTyping && phase === 'command') {
      const t = setTimeout(() => setPhase('resolving'), 200);
      return () => clearTimeout(t);
    }
  }, [isCommandTyping, phase]);

  useEffect(() => {
    if (phase === 'resolving') {
      const t = setTimeout(() => setPhase('installing'), 600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'installing') {
      const total = PERSONAL_INFO.npmPackages.length;
      if (installedCount < total) {
        const t = setTimeout(() => setInstalledCount((c) => c + 1), 150);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('done'), 300);
        return () => clearTimeout(t);
      }
    }
  }, [phase, installedCount]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20" id="hero">
      <div ref={containerRef} className="w-full max-w-3xl">
        {windowState === 'closed' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <button 
              onClick={() => setWindowState('normal')}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all font-mono text-sm shadow-[0_0_20px_rgba(6,182,212,0.15)]"
            >
              open -a Terminal
            </button>
          </motion.div>
        )}

        {/* Terminal Window */}
        <AnimatePresence>
          {windowState !== 'closed' && (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={
                windowState === 'minimized' ? { height: 48, opacity: 1, y: 0 } :
                windowState === 'maximized' ? { width: '100vw', maxWidth: '100vw', height: '100vh', opacity: 1, y: 0 } :
                { height: 'auto', width: '100%', maxWidth: '48rem', opacity: 1, y: 0 }
              }
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`glass-holo overflow-hidden shadow-[0_0_80px_rgba(124,58,237,0.15)] border border-white/10 relative ${windowState === 'maximized' ? 'fixed inset-0 z-50 rounded-none' : 'rounded-xl max-w-3xl w-full mx-auto'}`}
            >
              {/* CRT Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
              
              {/* macOS title bar */}
              <div className="flex items-center gap-2 px-4 h-12 bg-[#1e1e1e] border-b border-black/40 relative z-20">
                <button onClick={() => setWindowState('closed')} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors" />
                <button onClick={() => setWindowState(w => w === 'minimized' ? 'normal' : 'minimized')} className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors" />
                <button onClick={() => setWindowState(w => w === 'maximized' ? 'normal' : 'maximized')} className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors" />
                <div className="mx-auto text-xs text-white/50 font-mono select-none">karan-aggarwal — bash — 80×24</div>
              </div>

              {/* Terminal content */}
              <div className={`p-6 font-mono text-sm sm:text-base text-cyan-50 flex flex-col transition-opacity duration-300 ${windowState === 'minimized' ? 'opacity-0' : 'opacity-100 min-h-[320px]'}`}>
            {/* Command line */}
            <div className="flex gap-2 items-start">
              <span className="text-green-400 font-bold flex-shrink-0">❯</span>
              <span className="text-white relative flex items-center">
                {commandText}
                {isCommandTyping && (
                  <span className="inline-block w-[0.6em] h-[1.2em] bg-white/80 ml-1 shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-[pulse_0.8s_ease-in-out_infinite]" />
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
            </motion.div>
          )}
        </AnimatePresence>

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
