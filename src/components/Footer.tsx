'use client';

import React from 'react';
import { SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0f19]/80 border-t border-white/5 py-8 mt-20 font-mono text-sm relative z-10 glass">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-white/50">
          © {new Date().getFullYear()} Karan Aggarwal. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-white/50 hover:text-cyan-400 transition-colors">
            GitHub
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-white/50 hover:text-cyan-400 transition-colors">
            LinkedIn
          </a>
          <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" className="text-white/50 hover:text-cyan-400 transition-colors">
            X
          </a>
        </div>
        <div className="text-white/30 text-xs flex gap-2">
          <span>Built with</span>
          <span className="text-cyan-400">Next.js</span>
          <span className="text-purple-400">Three.js</span>
        </div>
      </div>
    </footer>
  );
}
