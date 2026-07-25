'use client';
import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Users } from 'lucide-react';

export default function ExtraCurricular({ leadershipRoles }) {
  if (!leadershipRoles || leadershipRoles.length === 0) return null;

  return (
    <>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border-subtle/40 to-transparent"></div>
      <section id="extracurricular" className="py-20 md:py-32 bg-bg-base relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-accepted/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Reveal>
            <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
              // 10 — Extra Curricular
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-text-primary tracking-tight mb-16">
              Beyond the Screen
            </h2>
          </Reveal>

          <div className="max-w-4xl">
            <div className="flex flex-col gap-8">
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-accepted/10 border border-accent-accepted/30 flex items-center justify-center text-accent-accepted">
                    <Users size={20} />
                  </div>
                  <h3 className="text-2xl font-display text-text-primary font-medium">Leadership & Community</h3>
                </div>
              </Reveal>

              <div className="space-y-6 border-l-2 border-border-subtle/50 ml-5 pl-8">
                {leadershipRoles.map((role, idx) => (
                  <Reveal key={role._id || idx} delay={idx * 0.1}>
                    <div className="relative group">
                      {/* Timeline node */}
                      <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-bg-base border-2 border-border-subtle group-hover:border-accent-accepted group-hover:scale-125 transition-all duration-300 shadow-[0_0_0_4px_var(--bg-base)]"></div>
                      
                      <h4 className="text-lg md:text-xl font-display text-text-primary font-medium mb-1 group-hover:text-accent-accepted transition-colors">
                        {role.title || role.role}
                      </h4>
                      <div className="text-xs font-mono text-accent-accepted font-bold tracking-wider uppercase mb-3">
                        {role.organization} {role.year && `· ${role.year}`}
                      </div>
                      {role.description && (
                        <p className="text-sm text-text-muted leading-relaxed font-mono">
                          {role.description}
                        </p>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
