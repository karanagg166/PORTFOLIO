import React from 'react';

const USES_DATA = [
  {
    category: 'Editor & Terminal',
    items: [
      { name: 'VS Code', description: 'Primary editor with a custom dark theme.' },
      { name: 'Warp', description: 'Blazing fast Rust-based terminal with AI.' },
      { name: 'JetBrains Mono', description: 'The best monospaced font with ligatures.' },
    ],
  },
  {
    category: 'Hardware',
    items: [
      { name: 'MacBook Pro 16" (M3 Max)', description: 'The daily driver. Unmatched performance.' },
      { name: 'Keychron Q1 Pro', description: 'Custom mechanical keyboard with tactile switches.' },
      { name: 'Logitech MX Master 3S', description: 'Ergonomic mouse with great customizability.' },
    ],
  },
  {
    category: 'Software & Tools',
    items: [
      { name: 'Figma', description: 'For all UI/UX design and prototyping.' },
      { name: 'Notion', description: 'Second brain for tasks, notes, and planning.' },
      { name: 'Linear', description: 'Lightning fast issue tracking and project management.' },
      { name: 'Vercel', description: 'Go-to deployment and hosting platform.' },
    ],
  },
];

export const metadata = {
  title: 'Uses | Karan Aggarwal',
  description: 'A list of hardware, software, and tools I use on a daily basis.',
};

import Link from 'next/link';

export default function UsesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <div className="mb-12">
        <Link href="/" className="text-cyan-400 font-mono text-sm hover:underline mb-6 inline-block">← cd ..</Link>
        <h1 className="text-4xl md:text-5xl font-bold font-raleway text-white mb-4">What I Use</h1>
        <p className="text-white/50 text-lg font-mono">A curated list of my everyday tech stack, hardware, and tools.</p>
      </div>

      <div className="space-y-16">
        {USES_DATA.map((section, idx) => (
          <section key={idx}>
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-raleway border-b border-white/10 pb-2">
              {section.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="glass-holo p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
