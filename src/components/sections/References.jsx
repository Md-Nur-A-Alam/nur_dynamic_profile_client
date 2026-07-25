'use client';
import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Mail, Phone, Building2, UserCircle2 } from 'lucide-react';

export default function References({ references }) {
  if (!references || references.length === 0) return null;

  return (
    <>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border-subtle/40 to-transparent"></div>
      <section id="references" className="py-20 md:py-32 bg-bg-base relative overflow-hidden">
        
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-pending/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Reveal>
            <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
              // 11 — References
            </div>
            
            <div className="flex flex-col mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-text-primary tracking-tight mb-6">
                Professional References
              </h2>
              <p className="text-text-muted font-mono max-w-2xl text-sm md:text-base leading-relaxed">
                Mentors, professors, and colleagues who can vouch for my professional capabilities and work ethic.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {references.map((ref, idx) => (
              <Reveal key={ref._id || idx} delay={idx * 0.1}>
                <div className="group h-full bg-bg-surface border border-border-subtle rounded-3xl p-6 md:p-8 hover:border-accent-pending/50 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden flex flex-col justify-between">
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent-pending/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full pointer-events-none"></div>

                  <div className="flex items-start gap-5 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-bg-base border border-border-subtle flex items-center justify-center text-text-muted group-hover:text-accent-pending group-hover:border-accent-pending/50 transition-colors shrink-0">
                      <UserCircle2 size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-display text-text-primary font-medium mb-1 group-hover:text-accent-pending transition-colors">
                        {ref.name}
                      </h3>
                      <div className="text-sm font-mono text-text-muted">
                        {ref.designation || ref.position}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 font-mono text-sm">
                    {ref.organization && (
                      <div className="flex items-start gap-3 text-text-muted">
                        <Building2 size={16} className="text-accent-pending mt-0.5 shrink-0" />
                        <span>{ref.organization}</span>
                      </div>
                    )}
                    
                    {ref.email && (
                      <a href={`mailto:${ref.email}`} className="flex items-start gap-3 text-text-muted hover:text-accent-pending transition-colors w-fit">
                        <Mail size={16} className="text-accent-pending mt-0.5 shrink-0" />
                        <span>{ref.email}</span>
                      </a>
                    )}

                    {ref.phone && (
                      <a href={`tel:${ref.phone}`} className="flex items-start gap-3 text-text-muted hover:text-accent-pending transition-colors w-fit">
                        <Phone size={16} className="text-accent-pending mt-0.5 shrink-0" />
                        <span>{ref.phone}</span>
                      </a>
                    )}
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
