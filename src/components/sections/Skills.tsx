'use client';

import React, { useState, useMemo } from 'react';
import { SKILLS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { motion } from 'framer-motion';

const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#38bdf8',
  backend: '#a78bfa',
  devops: '#f59e0b',
  languages: '#34d399',
};

// Skill evidence mapping
const SKILL_EVIDENCE: Record<string, string[]> = {
  'React': ['Docstribe AI', 'Wishify', 'PennySaver', 'ExamArena'],
  'Next.js': ['Wishify', 'ExamArena', 'Quick Clinic', 'ShopSizzle', 'Portfolio'],
  'TypeScript': ['Wishify', 'ExamArena', 'Quick Clinic', 'Portfolio'],
  'Tailwind CSS': ['ExamArena', 'Quick Clinic', 'ShopSizzle', 'Portfolio'],
  'Three.js': ['Portfolio'],
  'Framer Motion': ['Portfolio'],
  'Python': ['Docstribe AI', 'Book Recommender', 'Stellar Stocks'],
  'FastAPI': ['Docstribe AI', 'Book Recommender', 'Stellar Stocks'],
  'Node.js': ['PennySaver', 'Quick Clinic'],
  'PostgreSQL': ['Docstribe AI', 'Quick Clinic'],
  'Redis': ['Quick Clinic'],
  'Docker': ['Docstribe AI', 'Quick Clinic'],
  'Git': ['All Repositories'],
  'CI/CD': ['Vercel Deployments'],
  'AWS': ['Docstribe AI Cloud Setup'],
  'JavaScript': ['All Projects'],
  'C++': ['Algorithms & Problem Solving'],
  'SQL': ['Docstribe AI', 'Quick Clinic', 'PennySaver'],
};

function SVGConstellation() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const { nodes, connections } = useMemo(() => {
    const w = 640;
    const h = 420;
    const cx = w / 2;
    const cy = h / 2;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    const points = SKILLS.map((skill, i) => {
      const r = 50 + Math.sqrt(i / SKILLS.length) * 140;
      const angle = i * goldenAngle;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        skill,
        color: CATEGORY_COLORS[skill.category] || '#38bdf8',
        usedIn: SKILL_EVIDENCE[skill.name] || ['Multiple Projects'],
      };
    });

    const conns: { from: number; to: number; opacity: number }[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          conns.push({ from: i, to: j, opacity: 1 - dist / 150 });
        }
      }
    }

    return { nodes: points, connections: conns };
  }, []);

  const activeEvidence = hoveredSkill ? SKILL_EVIDENCE[hoveredSkill] || [] : null;

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {/* Legend & Hover Info */}
      <div className="w-full flex flex-wrap justify-between items-center px-4 py-2 border-b border-white/10 text-xs font-mono">
        <div className="flex gap-4">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-white/40 uppercase">{cat}</span>
            </div>
          ))}
        </div>
        {hoveredSkill && (
          <div className="text-amber-300 font-mono text-[11px] animate-pulse">
            EVIDENCE: USED IN {activeEvidence?.join(', ')}
          </div>
        )}
      </div>

      <svg viewBox="0 0 640 420" className="w-full h-[380px]">
        {connections.map((conn, i) => {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          const isHighlighted = hoveredSkill === from.skill.name || hoveredSkill === to.skill.name;

          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isHighlighted ? '#d4a852' : '#ffffff'}
              strokeOpacity={isHighlighted ? 0.6 : conn.opacity * 0.1}
              strokeWidth={isHighlighted ? 1.5 : 0.8}
            />
          );
        })}

        {nodes.map((node) => {
          const isHovered = hoveredSkill === node.skill.name;
          return (
            <g
              key={node.skill.name}
              onMouseEnter={() => setHoveredSkill(node.skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="cursor-pointer"
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? 8 : 4.5}
                fill={isHovered ? '#d4a852' : node.color}
                fillOpacity={isHovered ? 1 : 0.7}
                className="transition-all duration-300"
              />
              <text
                x={node.x}
                y={node.y - 10}
                textAnchor="middle"
                fill={isHovered ? '#ffffff' : '#ffffff'}
                fillOpacity={isHovered ? 1 : 0.5}
                fontSize={isHovered ? 12 : 10}
                fontFamily="monospace"
                className="pointer-events-none select-none transition-all duration-200"
              >
                {node.skill.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Skills() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const groupedSkills = useMemo(() => {
    return {
      frontend: SKILLS.filter((s) => s.category === 'frontend'),
      backend: SKILLS.filter((s) => s.category === 'backend'),
      devops: SKILLS.filter((s) => s.category === 'devops'),
      languages: SKILLS.filter((s) => s.category === 'languages'),
    };
  }, []);

  return (
    <section className="relative py-24 px-4 min-h-screen flex items-center justify-center font-mono" id="skills">
      <div ref={containerRef} className="w-full max-w-5xl">
        <div className="rounded-xl border border-white/10 bg-[#05080f]/85 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono tracking-[0.2em] text-cyan-400 uppercase">
                SYSTEMS MAP // TECHNICAL CAPABILITIES
              </span>
            </div>
            <div className="text-[11px] font-mono text-white/40 hidden sm:block">
              INTEGRATION: ACTIVE
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            {isDesktop ? (
              <SVGConstellation />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.entries(groupedSkills).map(([cat, skills]) => (
                  <div key={cat} className="space-y-3 p-4 rounded bg-white/[0.02] border border-white/5">
                    <div className="text-xs uppercase tracking-widest text-amber-400 font-bold border-b border-white/10 pb-2">
                      // {cat} SYSTEMS
                    </div>
                    <div className="space-y-2">
                      {skills.map((skill) => {
                        const usedIn = SKILL_EVIDENCE[skill.name] || ['Projects'];
                        return (
                          <div key={skill.name} className="flex justify-between items-center text-xs">
                            <span className="text-white/90 font-medium">{skill.name}</span>
                            <span className="text-white/40 text-[10px] truncate max-w-[150px]">
                              {usedIn.join(', ')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
