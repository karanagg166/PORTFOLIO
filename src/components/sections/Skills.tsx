'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { SKILLS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SVGConstellation — Lightweight 2D constellation replacing the second Canvas context.
 * Renders skill nodes and connection lines as SVG, animated with CSS.
 * Zero WebGL overhead. Supports hover interactions.
 */
function SVGConstellation({ skills }: { skills: typeof SKILLS }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const categoryColors: Record<string, string> = {
    frontend: '#06b6d4',
    backend: '#7c3aed',
    devops: '#f59e0b',
    languages: '#10b981',
  };

  // Generate deterministic positions using golden ratio spiral
  const { nodes, connections } = useMemo(() => {
    const w = 600;
    const h = 500;
    const cx = w / 2;
    const cy = h / 2;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    const points = skills.map((skill, i) => {
      const r = 60 + Math.sqrt(i / skills.length) * 160;
      const angle = i * goldenAngle;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        skill,
        color: categoryColors[skill.category] || '#06b6d4',
        radius: 4 + (skill.proficiency / 100) * 8,
      };
    });

    // Connect nearby nodes (distance < 180)
    const conns: { from: number; to: number; opacity: number }[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          conns.push({ from: i, to: j, opacity: 1 - dist / 180 });
        }
      }
    }

    return { nodes: points, connections: conns };
  }, [skills]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 500"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 0 20px rgba(124, 58, 237, 0.1))' }}
    >
      {/* Connection lines */}
      {connections.map((conn, i) => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        const isHighlighted =
          hoveredSkill === from.skill.name || hoveredSkill === to.skill.name;
        return (
          <line
            key={`conn-${i}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={isHighlighted ? '#7c3aed' : '#7c3aed'}
            strokeOpacity={isHighlighted ? 0.5 : conn.opacity * 0.12}
            strokeWidth={isHighlighted ? 1.5 : 0.8}
            className="transition-all duration-500"
          />
        );
      })}

      {/* Skill nodes */}
      {nodes.map((node, i) => {
        const isHovered = hoveredSkill === node.skill.name;
        return (
          <g
            key={node.skill.name}
            onMouseEnter={() => setHoveredSkill(node.skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            className="cursor-pointer"
            style={{
              animation: `constellation-float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {/* Glow ring */}
            {isHovered && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radius + 8}
                fill="none"
                stroke={node.color}
                strokeOpacity={0.3}
                strokeWidth={1}
                className="animate-ping"
              />
            )}

            {/* Main dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isHovered ? node.radius + 3 : node.radius}
              fill={node.color}
              fillOpacity={isHovered ? 0.9 : 0.5}
              className="transition-all duration-300"
            />

            {/* Inner glow */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.radius * 0.4}
              fill="white"
              fillOpacity={isHovered ? 0.8 : 0.3}
              className="transition-all duration-300"
            />

            {/* Label */}
            <text
              x={node.x}
              y={node.y - node.radius - 8}
              textAnchor="middle"
              fill="white"
              fillOpacity={isHovered ? 0.9 : 0}
              fontSize={11}
              fontFamily="monospace"
              className="transition-all duration-300 pointer-events-none select-none"
            >
              {node.skill.name}
            </text>
            {isHovered && (
              <text
                x={node.x}
                y={node.y + node.radius + 16}
                textAnchor="middle"
                fill={node.color}
                fontSize={10}
                fontFamily="monospace"
                className="pointer-events-none select-none"
              >
                {node.skill.proficiency}%
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function Skills() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const [inView, setInView] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [view, setView] = useState<'htop' | 'constellation'>('htop');

  // Detect when section is in view for bar animations
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Group skills by category
  const topSkills = [...SKILLS].sort((a, b) => b.proficiency - a.proficiency).slice(0, 10);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 min-h-screen flex flex-col items-center justify-center" id="skills">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold font-raleway text-white mb-2">System Monitor</h2>
        <p className="text-white/40 font-mono text-sm">Real-time skill proficiency metrics</p>
      </div>

      {/* View Toggle (desktop only) */}
      {isDesktop && (
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('htop')}
            className={`px-4 py-1.5 rounded-sm font-mono text-xs transition-all ${view === 'htop' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-white/40 border border-white/10 hover:text-white/60'}`}
          >
            htop
          </button>
          <button
            onClick={() => setView('constellation')}
            className={`px-4 py-1.5 rounded-sm font-mono text-xs transition-all ${view === 'constellation' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-white/40 border border-white/10 hover:text-white/60'}`}
          >
            constellation
          </button>
        </div>
      )}

      <div ref={containerRef} className="w-full max-w-6xl flex gap-6">
        {/* htop Panel */}
        {(view === 'htop' || !isDesktop) && (
          <div className="flex-1 glass-holo p-5 md:p-6 shadow-[0_0_60px_rgba(6,182,212,0.08)] border border-white/10" style={{ borderRadius: '12px' }}>
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-5">
              <div className="text-cyan-400 font-bold font-mono text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                System Monitor (htop)
              </div>
              <div className="text-white/30 font-mono text-xs hidden sm:block">
                Uptime: ∞ days | Load: 99.9%
              </div>
            </div>

            {/* CPU Bars */}
            <div className="mb-5">
              <div className="text-white/40 mb-3 font-mono text-xs uppercase tracking-wider">CPU Usage by Skill</div>
              <div className="space-y-2.5">
                {topSkills.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-cyan-300/80 font-mono text-xs w-24 truncate">{s.name}</span>
                    <div className="flex-1 h-3 bg-white/5 rounded-sm overflow-hidden">
                      <div
                        className="h-full rounded-sm transition-all duration-[2000ms] ease-out"
                        style={{
                          width: inView ? `${s.proficiency}%` : '0%',
                          transitionDelay: `${i * 100}ms`,
                          background: s.category === 'frontend'
                            ? 'linear-gradient(90deg, #06b6d4, #22d3ee)'
                            : s.category === 'backend'
                              ? 'linear-gradient(90deg, #7c3aed, #a855f7)'
                              : 'linear-gradient(90deg, #06b6d4, #7c3aed)',
                        }}
                      />
                    </div>
                    <span className="text-white/50 font-mono text-xs w-10 text-right">{s.proficiency}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Memory */}
            <div className="mb-5 space-y-2">
              <div className="text-white/40 font-mono text-xs uppercase tracking-wider mb-2">Memory</div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-green-400 w-16 font-mono">Projects</span>
                <div className="flex-1 h-2.5 bg-white/5 rounded-sm overflow-hidden">
                  <div className="h-full bg-green-500/60 rounded-sm" style={{ width: inView ? '80%' : '0%', transition: 'width 1.5s ease-out 0.5s' }} />
                </div>
                <span className="text-xs text-white/40 font-mono">8/10</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-red-400 w-16 font-mono">Ideas</span>
                <div className="flex-1 h-2.5 bg-white/5 rounded-sm overflow-hidden">
                  <div className="h-full bg-red-500/60 rounded-sm" style={{ width: inView ? '100%' : '0%', transition: 'width 1.5s ease-out 0.7s' }} />
                </div>
                <span className="text-xs text-red-400 font-mono animate-pulse">OVERFLOW</span>
              </div>
            </div>

            {/* Process Table */}
            <div>
              <div className="grid grid-cols-[50px_1fr_80px_60px] text-white/30 mb-2 border-b border-white/10 pb-1 font-mono text-[10px] uppercase tracking-wider">
                <span>PID</span>
                <span>NAME</span>
                <span>STATUS</span>
                <span className="text-right">CPU%</span>
              </div>

              {SKILLS.slice(0, 8).map((s) => (
                <div key={s.pid} className="grid grid-cols-[50px_1fr_80px_60px] py-1 text-white/70 hover:bg-white/5 cursor-pointer font-mono text-xs transition-colors">
                  <span className="text-green-400/70">{s.pid}</span>
                  <span className="text-cyan-100/70 truncate">{s.name.toLowerCase().replace(/\s+/g, '_')}</span>
                  <span className={`${s.status === 'CRITICAL' ? 'text-red-400 animate-pulse' : s.status === 'SLEEPING' ? 'text-yellow-400' : 'text-green-400/80'}`}>
                    {s.status}
                  </span>
                  <span className="text-right text-white/50">{s.proficiency}%</span>
                </div>
              ))}

              <div className="grid grid-cols-[50px_1fr_80px_60px] py-1 text-white/70 hover:bg-white/5 cursor-pointer font-mono text-xs">
                <span className="text-red-400">999</span>
                <span className="text-red-200/70">coffee_intake</span>
                <span className="text-red-300 animate-pulse font-bold">CRITICAL</span>
                <span className="text-right text-red-400">100%</span>
              </div>
            </div>
          </div>
        )}

        {/* Constellation View (desktop) — SVG-based, no Canvas/WebGL */}
        {isDesktop && view === 'constellation' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex-1 glass border border-white/10 overflow-hidden relative"
            style={{ borderRadius: '12px', height: '600px' }}
          >
            {/* Category legend */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-3">
              {Object.entries({ frontend: '#06b6d4', backend: '#7c3aed', devops: '#f59e0b', languages: '#10b981' }).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-white/40 font-mono text-[10px] uppercase">{cat}</span>
                </div>
              ))}
            </div>
            <SVGConstellation skills={SKILLS} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
