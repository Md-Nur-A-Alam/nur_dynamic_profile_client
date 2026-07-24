'use client';
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FileText, Download } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import Image from 'next/image';

export default function Hero({ profile, documents }) {
  const [bootSequence, setBootSequence] = useState({ 
    done: false, 
    line1: '', 
    line2: '', 
    line3: '', 
    line4: '' 
  });
  
  const shouldReduceMotion = useReducedMotion();
  const resumeDoc = documents?.find(d => d.type === 'resume' || d.title.toLowerCase().includes('resume'));

  useEffect(() => {
    // Check session storage
    if (shouldReduceMotion || sessionStorage.getItem('heroBooted')) {
      setBootSequence({
        done: true,
        line1: '$ whoami',
        line2: `> ${profile?.fullName} — ${profile?.titles?.[0]} · ${profile?.titles?.[1]}`,
        line3: '$ status --check',
        line4: `> [●] ${profile?.availability || 'Open to Work'}`
      });
      return;
    }

    const seq1 = '$ whoami';
    const seq2 = `> ${profile?.fullName || 'User'} — ${profile?.titles?.[0]} · ${profile?.titles?.[1]}`;
    const seq3 = '$ status --check';
    const seq4 = `> [●] ${profile?.availability || 'Open to Work'}`;

    let currentStep = 0;
    
    const typeWriter = (text, callback) => {
      let i = 0;
      let currentText = '';
      const interval = setInterval(() => {
        currentText += text.charAt(i);
        callback(currentText);
        i++;
        if (i === text.length) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    };

    let cleanup = null;

    // Orchestration
    setTimeout(() => {
      cleanup = typeWriter(seq1, (t) => setBootSequence(p => ({ ...p, line1: t })));
    }, 500);

    setTimeout(() => {
      setBootSequence(p => ({ ...p, line2: seq2 }));
    }, 1200);

    setTimeout(() => {
      cleanup = typeWriter(seq3, (t) => setBootSequence(p => ({ ...p, line3: t })));
    }, 1800);

    setTimeout(() => {
      setBootSequence(p => ({ ...p, line4: seq4, done: true }));
      sessionStorage.setItem('heroBooted', 'true');
    }, 2500);

    return () => {
      if (cleanup) cleanup();
    };
  }, [profile, shouldReduceMotion]);

  return (
    <section id="hero" className="min-h-[85vh] flex items-center py-12 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Terminal Chrome */}
        <div className="order-2 lg:order-1 flex flex-col gap-8">
          <div className="rounded-lg overflow-hidden border border-border-subtle bg-[#0B0E14] shadow-lg max-w-xl w-full">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-bg-surface-raised">
              <div className="w-3 h-3 rounded-full bg-border-subtle"></div>
              <div className="w-3 h-3 rounded-full bg-border-subtle"></div>
              <div className="w-3 h-3 rounded-full bg-border-subtle"></div>
            </div>
            <div className="p-6 font-mono text-sm sm:text-base text-text-primary min-h-[160px] flex flex-col gap-2">
              <div><span className="text-accent-accepted">{bootSequence.line1}</span></div>
              {bootSequence.line2 && <div className="text-text-muted">{bootSequence.line2}</div>}
              {bootSequence.line3 && <div><span className="text-accent-accepted">{bootSequence.line3}</span></div>}
              {bootSequence.line4 && (
                <div className="text-text-muted flex items-center gap-2">
                  <span className="text-accent-pending animate-pulse">●</span> 
                  {bootSequence.line4.replace('> [●]', '')}
                </div>
              )}
              {!bootSequence.done && (
                <div className="w-2.5 h-5 bg-text-primary animate-pulse inline-block mt-1"></div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: bootSequence.done ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Building intelligent, elegant systems.
            </h1>
            <p className="text-text-muted text-lg max-w-lg mb-8">
              {profile?.tagline}
            </p>

            <div className="flex items-center gap-4">
              <Button 
                variant="pending" 
                size="lg" 
                className="group relative"
                disabled={!resumeDoc}
                title={!resumeDoc ? 'Resume coming soon' : ''}
              >
                {resumeDoc ? (
                  <a 
                    href={resumeDoc.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2"
                    onClick={() => {
                      import('@/lib/confetti').then(m => m.triggerConfetti(true));
                    }}
                  >
                    <Download size={18} />
                    Download Resume
                  </a>
                ) : (
                  <span className="flex items-center gap-2">
                    <FileText size={18} />
                    Resume Pending
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Photo Crossfade */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: bootSequence.done ? 1 : 0, scale: bootSequence.done ? 1 : 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-bg-surface-raised shadow-xl"
          >
            {profile?.image ? (
              <img src={profile.image} alt={profile.fullName} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full bg-border-subtle flex items-center justify-center text-text-muted text-5xl font-mono">
                {profile?.fullName?.charAt(0) || 'N'}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
