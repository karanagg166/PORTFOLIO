'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GITHUB_WRAPPED, PERSONAL_INFO } from '@/lib/constants';
import { useInViewGSAP } from '@/hooks/useInViewGSAP';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';

function CountUp({ target, duration = 2000, prefix = '', suffix = '' }: { target: number | string; duration?: number; prefix?: string; suffix?: string }) {
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

const statCards = [
  { label: 'Top Language', value: GITHUB_WRAPPED.topLanguage.name, sub: `${GITHUB_WRAPPED.topLanguage.percentage}% of commits`, color: 'text-cyan-400' },
  { label: 'Longest Streak', value: GITHUB_WRAPPED.longestStreak, sub: 'days 🔥', color: 'text-purple-400', isNumber: true },
  { label: 'Total Commits', value: GITHUB_WRAPPED.totalCommits, sub: 'contributions', color: 'text-green-400', isNumber: true },
  { label: 'Favorite Time', value: GITHUB_WRAPPED.favoriteCommitTime, sub: 'peak coding hour', color: 'text-yellow-400' },
  { label: 'Total PRs', value: GITHUB_WRAPPED.totalPRs, sub: 'pull requests', color: 'text-cyan-400', isNumber: true },
  { label: 'Lines Written', value: GITHUB_WRAPPED.linesWritten, sub: 'and counting', color: 'text-purple-400' },
];

export default function GitHubWrapped() {
  const containerRef = useInViewGSAP<HTMLDivElement>();

  return (
    <section className="relative py-20 px-4 min-h-screen flex items-center justify-center" id="github">
      <div className="w-full max-w-4xl" ref={containerRef}>
        <div className="glass border-white/10 p-6 md:p-8 shadow-[0_0_80px_rgba(124,58,237,0.1)] relative overflow-hidden" style={{ borderRadius: '16px', background: 'rgba(3,7,18,0.8)' }}>
          {/* Top gradient bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500" />

          <h2 className="text-2xl md:text-4xl font-bold font-raleway text-center mb-10 flex justify-center items-center gap-3">
            YOUR {GITHUB_WRAPPED.year} GITHUB WRAPPED <span className="text-3xl">🎁</span>
          </h2>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {statCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-inner p-4 md:p-5 text-center hover:bg-white/[0.06] transition-all duration-300 group relative overflow-hidden"
                style={{ borderRadius: '10px' }}
              >
                <div className="text-white/40 text-[10px] md:text-xs mb-2 uppercase tracking-wider">{stat.label}</div>
                <div className={`text-xl md:text-3xl font-bold font-mono ${stat.color}`}>
                  {stat.isNumber ? (
                    <CountUp target={stat.value as number} />
                  ) : (
                    String(stat.value)
                  )}
                </div>
                <div className="text-white/30 text-[10px] md:text-xs mt-1">{stat.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Personality Type — Special Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-inner p-6 text-center mb-10 border border-yellow-500/10 relative overflow-hidden"
            style={{ borderRadius: '10px' }}
          >
            <div className="text-white/40 text-xs mb-2 uppercase tracking-wider">Developer Personality</div>
            <div className="text-xl md:text-2xl font-bold text-yellow-400 font-mono italic">
              &ldquo;{GITHUB_WRAPPED.personalityType}&rdquo;
            </div>
            <div className="text-white/30 text-xs mt-2">😂 It&apos;s a feature, not a bug</div>
          </motion.div>

          {/* GitHub Contribution Calendar */}
          <div className="flex justify-center flex-col items-center border-t border-white/10 pt-8">
            <h3 className="text-white/50 font-mono mb-5 text-sm">Contribution History</h3>
            <div className="glass-inner p-4 md:p-6 overflow-x-auto w-full max-w-full flex justify-center" style={{ borderRadius: '10px' }}>
              <GitHubCalendar
                username={PERSONAL_INFO.github}
                colorScheme="dark"
                theme={{
                  light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
                fontSize={11}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
