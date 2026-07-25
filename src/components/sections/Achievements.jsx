'use client';
import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Award, ChevronRight, Sparkles } from 'lucide-react';

export default function Achievements({ achievements }) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border-subtle/40 to-transparent"></div>
      <section id="achievements" className="py-20 md:py-32 bg-bg-base relative overflow-hidden">
        {/* Background ambient glow matching the research section theme */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent-info/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Reveal>
            <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
              // 09 — Honours & Awards
            </div>
            
            <div className="flex flex-col mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-text-primary tracking-tight mb-6">
                Key Achievements
              </h2>
              <p className="text-text-muted font-mono max-w-2xl text-sm md:text-base leading-relaxed">
                Recognition and milestones achieved through academic excellence, innovation, and leadership.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {achievements.map((award, idx) => (
              <Reveal key={award._id || idx} delay={idx * 0.1}>
                <div className="group h-full bg-bg-surface border border-border-subtle rounded-3xl p-6 md:p-8 hover:border-accent-info/50 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden flex flex-col justify-between">
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-info/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none"></div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent-info/10 border border-accent-info/30 flex items-center justify-center text-accent-info shrink-0">
                      <Award size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-display text-text-primary font-medium mb-1 group-hover:text-accent-info transition-colors leading-tight">
                        {award.title}
                      </h3>
                      {(award.organization || award.year) && (
                        <div className="flex items-center gap-2 text-[10px] font-mono text-accent-info uppercase tracking-widest mt-2">
                          <Sparkles size={12} />
                          <span>{award.organization} {award.year && `· ${award.year}`}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {award.notes && (
                    <div className="mt-auto pt-4 border-t border-border-subtle/50">
                      <p className="text-sm text-text-muted font-mono leading-relaxed group-hover:text-text-primary/90 transition-colors">
                        {award.notes}
                      </p>
                    </div>
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
