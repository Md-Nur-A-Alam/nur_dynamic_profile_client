'use client';
import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { BadgeCheck, ExternalLink, GraduationCap } from 'lucide-react';

export default function Certifications({ training }) {
  if (!training || training.length === 0) return null;

  return (
    <>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border-subtle/40 to-transparent"></div>
      <section id="certifications" className="py-20 md:py-32 bg-bg-base relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-info/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Reveal>
            <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
              // 08 — Certifications & Training
            </div>
            
            <div className="flex flex-col mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-text-primary tracking-tight mb-6">
                Continuous Learning
              </h2>
              <p className="text-text-muted font-mono max-w-2xl text-sm md:text-base leading-relaxed">
                Specialized training and certifications acquired to stay at the cutting edge of software engineering and artificial intelligence.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {training.map((item, idx) => (
              <Reveal key={item._id || idx} delay={idx * 0.1}>
                <div className="group h-full bg-bg-surface border border-border-subtle rounded-2xl p-6 md:p-8 hover:border-accent-info/50 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden flex flex-col justify-between">
                  
                  {/* Hover gradient sweep */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-info/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent-info/10 border border-accent-info/20 flex items-center justify-center text-accent-info mb-6">
                      <BadgeCheck size={24} />
                    </div>
                    
                    <h3 className="text-xl font-display text-text-primary font-medium mb-3 group-hover:text-accent-info transition-colors line-clamp-2">
                      {item.domain || item.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm font-mono text-text-muted mb-4">
                      <GraduationCap size={16} className="text-accent-info/70" />
                      <span>{item.provider || item.organization}</span>
                    </div>

                    {item.year && (
                      <div className="text-xs font-mono text-text-muted/60 mb-4">
                        {item.year}
                      </div>
                    )}
                  </div>

                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-accent-info hover:text-accent-info/80 transition-colors w-fit group/link"
                    >
                      View Credential 
                      <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}

                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
