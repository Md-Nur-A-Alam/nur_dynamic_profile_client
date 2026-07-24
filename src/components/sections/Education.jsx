import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { VerdictPill } from '@/components/ui/VerdictPill';

export default function Education({ education }) {
  if (!education || education.length === 0) return null;

  const sorted = [...education].sort((a, b) => new Date(b.passingYear || b.endDate) - new Date(a.passingYear || a.endDate));

  return (
    <section id="education" className="py-12 md:py-24 border-t border-border-subtle bg-bg-surface">
      <div className="container mx-auto px-4 max-w-3xl">
        <Reveal>
          <div className="mb-12 text-text-muted font-mono text-sm tracking-tight">
            // 05 — education
          </div>

          <div className="relative border-l-2 border-border-subtle ml-3 md:ml-4 space-y-12 pb-4">
            {sorted.map((edu, idx) => {
              const hash = `#${edu._id?.substring(0,6) || Math.random().toString(16).substring(2,8)}`;
              const isCurrent = !edu.passingYear && (!edu.endDate || edu.endDate.toLowerCase() === 'present');

              return (
                <Reveal key={edu._id || idx} delay={idx * 0.1}>
                  <div className="relative pl-8 md:pl-12">
                    <div 
                      className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${isCurrent ? 'bg-accent-accepted ring-4 ring-accent-accepted/20 shadow-[0_0_10px_var(--accent-accepted)]' : 'bg-border-subtle ring-4 ring-bg-surface'}`} 
                    />
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-text-muted bg-bg-base px-2 py-0.5 rounded-sm border border-border-subtle">
                          {hash}
                        </span>
                        {isCurrent && <VerdictPill status="PENDING" />}
                      </div>

                      <h3 className="text-xl font-display font-semibold text-text-primary mt-1">
                        {edu.degree}
                      </h3>
                      
                      <div className="text-text-muted text-sm flex flex-wrap gap-x-2">
                        <span className="font-medium text-text-primary">{edu.institution}</span>
                        <span>·</span>
                        <span>{edu.passingYear || (edu.startDate + ' — Present')}</span>
                      </div>

                      {edu.cgpa && (
                        <div className="mt-2 text-sm font-mono text-text-primary bg-bg-base inline-flex px-2 py-1 rounded-sm border border-border-subtle w-fit">
                          Result: {edu.cgpa}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
