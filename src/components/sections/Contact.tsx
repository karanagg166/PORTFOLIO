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
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#d4a852', '#38bdf8', '#34d399'] });
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
        setResponseMsg(data.message || "Transmission received! I will respond within 24 hours.");
        setFormData({ name: '', email: '', message: '', urgency: 'normal' });
        fireConfetti();
      } else {
        setStatus('error');
        setResponseMsg(data.message || 'Signal interference — please try again.');
      }
    } catch {
      setStatus('error');
      setResponseMsg('Transmission error — please verify network connection.');
    }
  };

  return (
    <section className="relative py-24 px-4 min-h-screen flex items-center justify-center font-mono" id="contact">
      <div ref={containerRef} className="w-full max-w-3xl">
        <div className="rounded-xl border border-white/10 bg-[#05080f]/85 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono tracking-[0.2em] text-amber-400 uppercase">
                TRANSMISSION CONSOLE // RADIO SIGNAL
              </span>
            </div>
            <div className="text-[11px] font-mono text-white/40 hidden sm:block">
              SIGNAL: ENCRYPTED
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-10 space-y-6">
            <p className="text-xs text-white/60 font-sans">
              Send a direct signal to Karan Aggarwal. All messages are transmitted securely.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-amber-400/80 uppercase">OPERATOR NAME *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded p-3 text-white outline-none focus:border-amber-400 focus:shadow-[0_0_15px_rgba(212,168,82,0.2)] transition-all font-mono text-xs"
                  placeholder="Your Name / Organization"
                />
              </div>

              <div className="space-y-1">
                <label className="text-amber-400/80 uppercase">RETURN SIGNAL ADDRESS (EMAIL) *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded p-3 text-white outline-none focus:border-amber-400 focus:shadow-[0_0_15px_rgba(212,168,82,0.2)] transition-all font-mono text-xs"
                  placeholder="name@company.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-amber-400/80 uppercase">TRANSMISSION PAYLOAD (MESSAGE) *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded p-3 text-white outline-none focus:border-amber-400 focus:shadow-[0_0_15px_rgba(212,168,82,0.2)] transition-all font-mono text-xs resize-y"
                  placeholder="Detail your engineering request or proposal..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all font-mono text-xs tracking-wider uppercase font-semibold disabled:opacity-50 shadow-[0_0_20px_rgba(212,168,82,0.15)] flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <span>TRANSMITTING SIGNAL...</span>
                ) : (
                  <>
                    <span>TRANSMIT SIGNAL</span>
                    <span>📡</span>
                  </>
                )}
              </button>
            </form>

            {/* Accessibility announcement */}
            <div aria-live="polite" className="sr-only">
              {status === 'success' && responseMsg}
            </div>

            {/* Radio Transmission Result Status */}
            <AnimatePresence>
              {status !== 'idle' && status !== 'loading' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded border text-xs font-mono ${
                    status === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="font-bold mb-1">
                    {status === 'success' ? '✔ TRANSMISSION RECEIVED' : '✖ SIGNAL FAILURE'}
                  </div>
                  <div>{responseMsg}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
