'use client';
import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, FileText, GraduationCap } from 'lucide-react';

export default function Research({ publications }) {
  if (!publications || publications.length === 0) return null;

  return (
    <>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border-subtle/40 to-transparent"></div>
      <section id="research" className="py-20 md:py-32 bg-bg-base relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-info/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Reveal>
            <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
              // 05 — Research
            </div>
            {/* Section Header */}
            <div className="flex flex-col mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-text-primary tracking-tight mb-6">
                Academic Contributions
              </h2>
              <p className="text-text-muted font-mono max-w-2xl text-sm md:text-base leading-relaxed">
                Exploring the frontiers of Image Processing, Deep Learning, and Bangla NLP through peer-reviewed publications and active research.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {publications.map((pub, idx) => (
              <Reveal key={pub._id || idx} delay={idx * 0.1}>
                <div className="group bg-bg-surface/30 border border-border-subtle rounded-2xl p-6 md:p-8 hover:bg-bg-surface hover:border-accent-info/50 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-info opacity-0 group-hover:opacity-[0.03] rounded-full blur-2xl transition-opacity"></div>
                  
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    
                    {/* Left Icon / Date */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-full bg-accent-info/10 border border-accent-info/20 text-accent-info">
                      <BookOpen size={24} />
                      <span className="text-[10px] font-mono mt-1 font-bold">{pub.year}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-display text-text-primary font-medium mb-3 group-hover:text-accent-info transition-colors">
                        {pub.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-xs md:text-sm font-mono text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <GraduationCap size={14} className="text-accent-info" />
                          <span>{pub.authors || "Primary Author"}</span>
                        </div>
                        <div className="hidden md:block w-1 h-1 rounded-full bg-border-subtle"></div>
                        <div className="flex items-center gap-1.5">
                          <FileText size={14} className="text-accent-info" />
                          <span className="text-accent-info/90 font-semibold">{pub.publisher || pub.conference || "IEEE Xplore"}</span>
                        </div>
                      </div>

                      {pub.description && (
                        <p className="text-text-muted text-sm leading-relaxed mb-6">
                          {pub.description}
                        </p>
                      )}
                      
                      {pub.link && (
                        <a 
                          href={pub.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-bg-base bg-accent-info px-4 py-2 rounded-lg hover:bg-accent-info/90 hover:scale-[1.02] transition-all"
                        >
                          Read Paper <ExternalLink size={14} />
                        </a>
                      )}
                    </div>

                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
