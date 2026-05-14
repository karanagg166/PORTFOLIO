'use client';

import React, { useState, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const [formData, setFormData] = useState({ name: '', email: '', message: '', urgency: 'normal' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const fireConfetti = useCallback(async () => {
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#06b6d4', '#7c3aed', '#22d3ee'] });
    } catch {}
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setResponseMsg(data.message || "I'll get back within 24h! 🚀");
        setFormData({ name: '', email: '', message: '', urgency: 'normal' });
        fireConfetti();
      } else {
        setStatus('error');
        setResponseMsg(data.message || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setResponseMsg('Network error — please try again.');
    }
  };

  const endpoints = [
    { method: 'POST', path: '/api/v1/karan/hire', active: true, scrollTo: undefined },
    { method: 'GET', path: '/api/v1/karan/skills', active: false, scrollTo: '#skills' },
    { method: 'GET', path: '/api/v1/karan/projects', active: false, scrollTo: '#projects' },
    { method: 'GET', path: '/api/v1/karan/experience', active: false, scrollTo: '#experience' },
  ];

  return (
    <section className="relative py-20 px-4 min-h-screen flex flex-col items-center justify-center font-mono" id="contact">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold font-raleway text-white mb-2">API Reference</h2>
        <p className="text-white/40 font-mono text-sm">REST API documentation for contacting Karan</p>
      </div>

      <div
        ref={containerRef}
        className="w-full max-w-4xl glass border-white/10 overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.08)] flex flex-col md:flex-row"
        style={{ borderRadius: '12px', background: 'rgba(3,7,18,0.85)' }}
      >
        {/* Sidebar — Endpoints */}
        <div className="w-full md:w-64 p-5 border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.02] flex-shrink-0">
          <div className="text-white/40 text-[10px] mb-3 uppercase tracking-widest">Endpoints</div>
          <div className="flex flex-col gap-2">
            {endpoints.map((ep) => (
              <div
                key={ep.path}
                onClick={ep.scrollTo ? () => document.querySelector(ep.scrollTo!)?.scrollIntoView({ behavior: 'smooth' }) : undefined}
                className={`p-2.5 rounded-md text-xs flex items-center gap-2 transition-all duration-200 ${
                  ep.active
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] cursor-pointer'
                }`}
              >
                <span className={`font-bold text-[10px] px-1.5 py-0.5 rounded ${
                  ep.method === 'POST' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {ep.method}
                </span>
                <span className={ep.active ? 'text-green-300' : 'text-white/50'}>{ep.path}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 text-white/40 text-[10px] uppercase tracking-widest mb-2">Status</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400">Available for hire</span>
          </div>

          <div className="mt-6 text-white/40 text-[10px] uppercase tracking-widest mb-2">Base URL</div>
          <div className="text-cyan-400/70 text-xs break-all">karanaggarwal.dev</div>
        </div>

        {/* Main — Form */}
        <div className="flex-1 p-5 md:p-7">
          <h3 className="text-lg text-white font-bold mb-1 flex items-center gap-2">
            <span className="text-green-400 text-sm px-1.5 py-0.5 bg-green-500/10 rounded">POST</span>
            Send Message
          </h3>
          <p className="text-white/30 text-xs mb-5">Request body (application/json)</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <label className="text-white/40 text-xs">&quot;name&quot;: string <span className="text-red-400">*required</span></label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/[0.03] border border-white/10 rounded-md p-2.5 text-white outline-none focus:border-cyan-500/50 transition-colors text-sm"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-white/40 text-xs">&quot;email&quot;: string <span className="text-red-400">*required</span></label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/[0.03] border border-white/10 rounded-md p-2.5 text-white outline-none focus:border-cyan-500/50 transition-colors text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-white/40 text-xs">&quot;message&quot;: string <span className="text-red-400">*required</span></label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/[0.03] border border-white/10 rounded-md p-2.5 text-white outline-none focus:border-cyan-500/50 transition-colors resize-y text-sm"
                placeholder="Let's build something..."
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-white/40 text-xs">&quot;urgency&quot;: enum</label>
              <select
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                className="bg-white/[0.03] border border-white/10 rounded-md p-2.5 text-white outline-none focus:border-cyan-500/50 transition-colors text-sm appearance-none cursor-pointer"
              >
                <option value="low" className="bg-[#0d1117]">low</option>
                <option value="normal" className="bg-[#0d1117]">normal</option>
                <option value="high" className="bg-[#0d1117]">high</option>
                <option value="critical" className="bg-[#0d1117]">critical 🔥</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold py-2.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            >
              {status === 'loading' ? '⏳ Sending Request...' : '▶ Execute Request'}
            </button>

            {/* Response */}
            <AnimatePresence>
              {status !== 'idle' && status !== 'loading' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-md text-xs whitespace-pre-wrap font-mono ${
                    status === 'success'
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {`HTTP/1.1 ${status === 'success' ? '200 OK' : '500 Internal Server Error'}\nContent-Type: application/json\n\n{\n  "status": "${status}",\n  "message": "${responseMsg}"\n}`}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
