'use client';

import React, { useState, useCallback } from 'react';
import { PROJECTS } from '@/lib/constants';
import { useInViewGSAP } from '@/hooks/useInViewGSAP';
import { useTypewriter } from '@/hooks/useTypewriter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types';

function CodeDrawer({ code, onClose }: { code: string; onClose: () => void }) {
  const { displayedText, isTyping } = useTypewriter(code, 12);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-y-0 right-0 w-full md:w-[550px] z-50 shadow-[−20px_0_60px_rgba(0,0,0,0.5)] border-l border-white/10 flex flex-col"
      style={{ background: '#0d1117' }}
    >
      <div className="flex justify-between items-center px-5 py-3 border-b border-white/10 bg-white/5">
        <h3 className="font-mono text-cyan-400 text-sm font-bold flex items-center gap-2">
          <span className="text-white/30">📄</span> project.ts
        </h3>
        <button onClick={onClose} className="text-white/40 hover:text-white px-2 py-1 text-lg leading-none hover:bg-white/10 rounded transition-colors">×</button>
      </div>
      <div className="flex-1 overflow-auto p-0">
        <SyntaxHighlighter
          language="typescript"
          style={vscDarkPlus}
          customStyle={{ background: 'transparent', margin: 0, padding: '1rem', fontSize: '13px', lineHeight: '1.6' }}
          showLineNumbers
          wrapLines
          lineNumberStyle={{ color: 'rgba(255,255,255,0.1)' }}
        >
          {displayedText + (isTyping ? '█' : '')}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
}

type Filter = 'all' | 'frontend' | 'backend' | 'fullstack';

export default function Projects() {
  const containerRef = useInViewGSAP<HTMLDivElement>();
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  const filters: { label: string; value: Filter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Full Stack', value: 'fullstack' },
  ];

  return (
    <section className="relative py-20 px-4 min-h-screen" id="projects">
      <AnimatePresence>
        {activeCode && <CodeDrawer code={activeCode} onClose={() => setActiveCode(null)} />}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {activeCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCode(null)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-raleway text-white mb-2">Latest Blocks Mined</h2>
          <p className="text-white/40 font-mono text-sm">Blockchain-verified project portfolio</p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-sm font-mono text-xs transition-all duration-200 ${
                filter === f.value
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                  : 'text-white/40 border border-white/10 hover:text-white/60 hover:border-white/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.hash}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-holo p-5 flex flex-col font-mono text-sm relative group border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]"
                style={{ borderRadius: '12px' }}
              >
                {/* Block header */}
                <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-3">
                  <div className="text-cyan-400 font-bold text-base">Block #{proj.blockNumber}</div>
                  <div className="text-white/20 text-[10px] truncate max-w-[100px] font-mono">{proj.hash}</div>
                </div>

                {/* Project Image */}
                {proj.image && (
                  <div className="relative w-full aspect-video mb-4 rounded-md overflow-hidden border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                    <img 
                      src={proj.image} 
                      alt={proj.name} 
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>
                )}

                {/* Transaction details */}
                <div className="space-y-1.5 mb-4 flex-1 text-white/70 text-xs">
                  <div className="flex justify-between"><span className="text-white/30">From:</span> <span>{proj.from}</span></div>
                  <div className="flex justify-between"><span className="text-white/30">To:</span> <span>{proj.to}</span></div>
                  <div className="flex justify-between mt-2"><span className="text-white/30">Project:</span> <span className="text-white font-bold text-sm">{proj.name}</span></div>
                  {proj.description && (
                    <div className="mt-2 text-white/50 text-[11px] leading-relaxed">{proj.description}</div>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-white/5">
                    {proj.stack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-purple-500/10 text-purple-300/80 rounded-sm text-[10px] border border-purple-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="bg-green-500/10 text-green-400 text-xs py-2 px-3 rounded-sm flex items-center justify-between mb-4 border border-green-500/20">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {proj.status}
                  </span>
                  <span className="text-green-400/60">({proj.confirmations})</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveCode(proj.codeSnippet)}
                    className="flex-1 py-2 text-center border border-white/15 rounded-sm hover:bg-white/10 transition-all text-white/70 hover:text-cyan-300 text-xs hover:border-cyan-500/30"
                  >
                    {'{ }'} View Code
                  </button>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 border border-white/15 rounded-sm hover:bg-white/10 transition-all text-white/70 hover:text-white text-xs"
                    >
                      ↗
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
