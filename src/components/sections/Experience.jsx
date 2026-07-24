import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { VerdictPill } from '@/components/ui/VerdictPill';

export default function Experience({ experience }) {
  if (!experience || experience.length === 0) return null;

  // Sort by startDate descending (assuming format YYYY-MM-DD or similar)
  const sorted = [...experience].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <section id="experience" className="py-12 md:py-24 border-t border-border-subtle bg-bg-base">
      <div className="container mx-auto px-4 max-w-3xl">
        <Reveal>
          <div className="mb-12 text-text-muted font-mono text-sm tracking-tight">
            // 04 — experience
          </div>

          <div className="relative border-l-2 border-border-subtle ml-3 md:ml-4 space-y-12 pb-4">
            {sorted.map((job, idx) => {
              const isCurrent = !job.endDate || job.endDate.toLowerCase() === 'present';
              // Hash-style marker
              const hash = `#${job._id?.substring(0,6) || Math.random().toString(16).substring(2,8)}`;

              return (
                <Reveal key={job._id || idx} delay={idx * 0.1}>
                  <div className="relative pl-8 md:pl-12">
                    {/* Timeline Node */}
                    <div 
                      className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${isCurrent ? 'bg-accent-accepted ring-4 ring-accent-accepted/20 shadow-[0_0_10px_var(--accent-accepted)]' : 'bg-border-subtle ring-4 ring-bg-base'}`} 
                    />
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-text-muted bg-bg-surface-raised px-2 py-0.5 rounded-sm border border-border-subtle">
                          {hash}
                        </span>
                        {isCurrent && <VerdictPill status="ACCEPTED" />}
                      </div>

                      <h3 className="text-xl font-display font-semibold text-text-primary mt-1">
                        {job.designation}
                      </h3>
                      
                      <div className="text-text-muted text-sm flex flex-wrap gap-x-2">
                        <span className="font-medium text-text-primary">{job.companyName}</span>
                        <span>·</span>
                        <span>{job.startDate} — {job.endDate || 'Present'}</span>
                        {job.location && (
                          <>
                            <span>·</span>
                            <span>{job.location}</span>
                          </>
                        )}
                      </div>

                      {job.responsibility && (
                        <p className="mt-3 text-sm text-text-muted leading-relaxed font-body">
                          {job.responsibility}
                        </p>
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
