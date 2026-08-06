'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GITHUB_WRAPPED, PERSONAL_INFO } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';

function CountUp({ target, duration = 1500, prefix = '', suffix = '' }: { target: number | string; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const num = typeof target === 'number' ? target : parseInt(target) || 0;
    if (num === 0) return;

    let start = 0;
    const step = Math.ceil(num / (duration / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  if (typeof target === 'string' && isNaN(parseInt(target))) {
    return <span ref={ref}>{prefix}{target}{suffix}</span>;
  }

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const verifiedStats = [
  { label: 'Primary Language', value: GITHUB_WRAPPED.topLanguage.name, sub: `${GITHUB_WRAPPED.topLanguage.percentage}% repository usage`, color: 'text-amber-300' },
  { label: 'Contribution Streak', value: GITHUB_WRAPPED.longestStreak, sub: 'consecutive active days', color: 'text-emerald-400', isNumber: true },
  { label: 'Total Commits', value: GITHUB_WRAPPED.totalCommits, sub: 'verified contributions', color: 'text-cyan-300', isNumber: true },
  { label: 'Pull Requests', value: GITHUB_WRAPPED.totalPRs, sub: 'merged codebase PRs', color: 'text-amber-300', isNumber: true },
];

export default function GitHubWrapped() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 px-4 min-h-screen flex items-center justify-center font-mono" id="github">
      <div className="w-full max-w-4xl" ref={containerRef}>
        <div className="rounded-xl border border-white/10 bg-[#05080f]/85 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono tracking-[0.2em] text-emerald-400 uppercase">
                VERIFIED ENGINEERING ACTIVITY // GITHUB METRICS
              </span>
            </div>
            <div className="text-[11px] font-mono text-white/40 hidden sm:block">
              UPDATED: AUGUST 2026
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-10">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {verifiedStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="p-4 rounded-lg border border-white/5 bg-white/[0.02] text-center space-y-1"
                >
                  <div className="text-white/40 text-[10px] uppercase tracking-wider">{stat.label}</div>
                  <div className={`text-xl sm:text-2xl font-bold font-mono ${stat.color}`}>
                    {stat.isNumber ? (
                      <CountUp target={stat.value as number} />
                    ) : (
                      String(stat.value)
                    )}
                  </div>
                  <div className="text-white/30 text-[10px]">{stat.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* GitHub Contribution Calendar */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                // CONTRIBUTION HISTORY
              </div>

              <div className="p-4 sm:p-6 rounded-lg border border-white/5 bg-white/[0.01] overflow-x-auto flex justify-center">
                <GitHubCalendar
                  username={PERSONAL_INFO.github}
                  colorScheme="dark"
                  theme={{
                    light: ['#0d1117', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    dark: ['#0d1117', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                  fontSize={11}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
