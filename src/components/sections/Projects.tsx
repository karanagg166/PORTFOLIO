'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from 'framer-motion';

export default function Projects() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'flagship' | 'archive'>('all');

  // Flagship projects with screenshots (Docstribe AI / TenkiSense, Quick Clinic, ExamArena, ShopSizzle)
  const flagshipProjects = PROJECTS.filter((p) => p.image);
  // Archive projects without screenshots
  const archiveProjects = PROJECTS.filter((p) => !p.image);

  return (
    <section className="relative py-24 px-4 min-h-screen font-mono" id="projects">
      <div ref={containerRef} className="max-w-6xl mx-auto space-y-12">
        {/* Main Station Panel */}
        <div className="rounded-xl border border-white/10 bg-[#05080f]/85 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono tracking-[0.2em] text-amber-400 uppercase">
                MISSION STATIONS // ENGINEERING CASE STUDIES
              </span>
            </div>
            <div className="text-[11px] font-mono text-white/40 hidden sm:block">
              TOTAL MISSIONS: {PROJECTS.length}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-12">
            {/* 1. Flagship Missions */}
            <div className="space-y-6">
              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold border-b border-white/10 pb-2">
                // FLAGSHIP MISSIONS
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {flagshipProjects.map((proj) => (
                  <div
                    key={proj.name}
                    className="group relative rounded-lg border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between transition-all duration-300 hover:border-amber-400/40 hover:shadow-[0_0_30px_rgba(212,168,82,0.15)] [perspective:1000px]"
                  >
                    <div className="space-y-4">
                      {/* Classification Badge */}
                      <div className="flex justify-between items-center text-[10px] text-amber-400/80">
                        <span className="uppercase tracking-wider">MISSION: {proj.name}</span>
                        <span className="text-emerald-400">● LIVE</span>
                      </div>

                      {/* Image Preview */}
                      {proj.image && (
                        <div className="relative w-full aspect-video rounded overflow-hidden border border-white/10">
                          <Image
                            src={proj.image}
                            alt={proj.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-xs text-white/70 font-sans leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-2 pt-6 mt-4 border-t border-white/10 text-xs">
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-2 text-center rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors"
                        >
                          LAUNCH STATION →
                        </a>
                      )}
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2 rounded bg-white/5 border border-white/15 text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Mission Archive */}
            <div className="space-y-6 pt-6 border-t border-white/10">
              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold border-b border-white/10 pb-2">
                // MISSION ARCHIVE
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {archiveProjects.map((proj) => (
                  <div
                    key={proj.name}
                    className="p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-white mb-1">{proj.name}</div>
                      <p className="text-[11px] text-white/60 font-sans leading-snug line-clamp-2">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                      <div className="flex flex-wrap gap-1">
                        {proj.stack.slice(0, 3).map((t) => (
                          <span key={t} className="text-white/40">{t}</span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {proj.live && (
                          <a href={proj.live} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
                            Live
                          </a>
                        )}
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noreferrer" className="text-white/60 hover:underline">
                            Repo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
