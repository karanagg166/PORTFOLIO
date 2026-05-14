'use client';

import React, { useState } from 'react';
import { VSCODE_FILES } from '@/lib/constants';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useInViewGSAP } from '@/hooks/useInViewGSAP';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['$ whoami', 'karan-aggarwal']);
  const containerRef = useInViewGSAP<HTMLDivElement>();

  const activeFile = VSCODE_FILES[activeFileIndex];

  const getLanguage = (filename: string) => {
    if (filename.endsWith('.md')) return 'markdown';
    if (filename.endsWith('.json')) return 'json';
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'typescript';
    if (filename.endsWith('.env')) return 'bash';
    return 'text';
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    setTerminalInput('');
    if (!cmd) return;

    let output = `bash: command not found: ${cmd}`;
    if (cmd === 'whoami') output = 'karan-aggarwal';
    else if (cmd === 'pwd') output = '/home/karan/portfolio';
    else if (cmd === 'ls') output = 'bio.md  skills.json  experience.ts  contact.env';
    else if (cmd === 'clear') { setTerminalOutput([]); return; }
    else if (cmd === 'date') output = new Date().toLocaleString();

    setTerminalOutput((prev) => [...prev, `$ ${cmd}`, output]);
  };

  return (
    <section className="relative py-20 px-4 min-h-screen flex items-center justify-center font-mono" id="about">
      <div className="text-center mb-0 absolute top-20 left-0 right-0">
        <h2 className="text-3xl md:text-4xl font-bold font-raleway text-white mb-2">About Me</h2>
        <p className="text-white/40 font-mono text-sm">Open in VSCode — click files to explore</p>
      </div>

      <div
        ref={containerRef}
        className="w-full max-w-5xl h-[550px] md:h-[600px] flex overflow-hidden shadow-[0_0_60px_rgba(124,58,237,0.1)] border border-white/10"
        style={{ background: '#1e1e2e', borderRadius: '12px' }}
      >
        {/* Activity Bar */}
        <div className="w-12 bg-[#181825] border-r border-white/5 flex flex-col items-center py-4 gap-4 flex-shrink-0 hidden sm:flex">
          <div className="w-8 h-8 rounded text-white/60 hover:text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors text-lg">📁</div>
          <div className="w-8 h-8 rounded text-white/40 hover:text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors text-lg">🔍</div>
          <div className="w-8 h-8 rounded text-white/40 hover:text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors text-lg">🔀</div>
          <div className="mt-auto w-8 h-8 rounded text-white/40 hover:text-white flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors text-lg">⚙️</div>
        </div>

        {/* Sidebar / Explorer */}
        <div className="w-48 bg-[#1e1e2e] border-r border-white/5 flex flex-col hidden md:flex flex-shrink-0">
          <div className="px-4 py-2.5 text-[10px] font-semibold text-white/50 uppercase tracking-widest border-b border-white/5">
            Explorer
          </div>
          <div className="p-2 flex-1">
            <div className="flex items-center gap-1 text-sm text-white/80 font-semibold mb-2 cursor-pointer hover:text-white transition-colors">
              <span className="text-[10px] text-white/40">▼</span>
              <span className="text-cyan-400/80">📁</span> karan-aggarwal
            </div>
            {VSCODE_FILES.map((f, i) => (
              <div
                key={f.name}
                onClick={() => setActiveFileIndex(i)}
                className={`pl-6 py-1.5 flex items-center gap-2 text-sm cursor-pointer transition-all duration-150 rounded-sm ${
                  i === activeFileIndex
                    ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-l-cyan-500'
                    : 'text-white/60 hover:bg-white/5 hover:text-white/80 border-l-2 border-l-transparent'
                }`}
              >
                <span className="text-xs">{f.icon}</span>
                <span className="truncate">{f.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor Panel */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e2e]">
          {/* Tab Bar */}
          <div className="flex bg-[#181825] border-b border-white/5 overflow-x-auto flex-shrink-0">
            {VSCODE_FILES.map((f, i) => (
              <div
                key={f.name}
                onClick={() => setActiveFileIndex(i)}
                className={`px-4 py-2 flex items-center gap-2 text-xs cursor-pointer border-r border-white/5 min-w-[100px] flex-shrink-0 transition-all duration-150 ${
                  i === activeFileIndex
                    ? 'bg-[#1e1e2e] text-cyan-400 border-t-2 border-t-cyan-500'
                    : 'text-white/40 bg-[#181825] hover:bg-[#1e1e2e]/50 border-t-2 border-t-transparent'
                }`}
              >
                <span className="text-[10px]">{f.icon}</span>
                <span className="truncate">{f.name}</span>
                {i === activeFileIndex && <span className="ml-auto opacity-40 text-xs hover:opacity-100">×</span>}
              </div>
            ))}
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFile.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <SyntaxHighlighter
                  language={activeFile.language || getLanguage(activeFile.name)}
                  style={vscDarkPlus}
                  customStyle={{
                    background: 'transparent',
                    margin: 0,
                    padding: '1rem',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    minHeight: '100%',
                  }}
                  showLineNumbers
                  wrapLines
                  lineNumberStyle={{ color: 'rgba(255,255,255,0.15)', minWidth: '2.5em', paddingRight: '1em' }}
                >
                  {activeFile.content}
                </SyntaxHighlighter>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mini Terminal */}
          <div className="h-28 border-t border-white/10 bg-[#181825] flex flex-col flex-shrink-0">
            <div className="px-3 py-1 text-[10px] text-white/40 uppercase tracking-widest border-b border-white/5 flex items-center gap-2">
              <span className="text-cyan-500/60">⬤</span> Terminal
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-1 text-xs text-white/60 font-mono space-y-0.5">
              {terminalOutput.map((line, i) => (
                <div key={i} className={line.startsWith('$') ? 'text-green-400/80' : 'text-white/50'}>{line}</div>
              ))}
            </div>
            <form onSubmit={handleTerminalSubmit} className="px-3 py-1 flex items-center gap-1 border-t border-white/5">
              <span className="text-green-400/60 text-xs">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent text-xs text-white/80 outline-none caret-cyan-400"
                placeholder="type a command..."
                spellCheck={false}
              />
            </form>
          </div>

          {/* Status Bar */}
          <div className="h-6 bg-[#007acc]/30 border-t border-white/5 flex justify-between items-center px-4 text-[10px] text-white/70 flex-shrink-0">
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><span className="text-cyan-400">⎇</span> main*</span>
              <span className="hidden sm:inline">karan-aggarwal</span>
              <span>⛔ 0 ⚠️ 0</span>
            </div>
            <div className="flex gap-4">
              <span>UTF-8</span>
              <span>TypeScript React</span>
              <span className="hidden sm:inline">Ln 1, Col 1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
