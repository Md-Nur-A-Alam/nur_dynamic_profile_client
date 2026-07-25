'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

export default function Experience({ experience }) {
  if (!experience || experience.length === 0) return null;

  // Sort by startDate descending
  const sorted = [...experience].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <section id="experience" className="py-16 md:py-24 bg-bg-base border-t border-border-subtle">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal>
          {/* Section Header */}
          <div className="flex flex-col mb-12">
            <h3 className="text-[10px] md:text-xs font-mono text-accent-pending tracking-[0.2em] uppercase mb-4 font-bold">
              // 02 — Professional Journey
            </h3>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-text-primary tracking-tight">
              Where I've Worked
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Minimalist Timeline Line */}
          <div className="absolute left-[7px] md:left-[9px] top-2 bottom-0 w-[1px] bg-border-subtle"></div>

          <div className="space-y-8 md:space-y-10">
            {sorted.map((job, idx) => {
              const isCurrent = job.current || (!job.endDate || job.endDate.toLowerCase() === 'present');
              
              // Format dates precisely
              const start = new Date(job.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              const end = isCurrent ? 'Present' : new Date(job.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

              return (
                <Reveal key={job._id || idx} delay={idx * 0.1}>
                  <div className="relative pl-8 md:pl-12 group">
                    
                    {/* Sleek Timeline Node */}
                    <div className={`absolute left-0 md:left-[2px] top-1.5 w-4 h-4 rounded-full border-[3px] border-bg-base transition-all duration-300 z-10
                      ${isCurrent ? 'bg-accent-pending shadow-[0_0_8px_var(--accent-pending)]' : 'bg-border-subtle group-hover:bg-accent-info'}`}
                    ></div>

                    {/* Intellectual / Professional Card */}
                    <motion.div 
                      className="bg-bg-surface border border-border-subtle rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-accent-pending/30 shadow-sm hover:shadow-md relative overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
                        <div>
                          <h3 className="text-lg md:text-xl font-display font-semibold text-text-primary group-hover:text-accent-pending transition-colors duration-300">
                            {job.role}
                          </h3>
                          <div className="text-[10px] md:text-xs font-mono text-text-muted mt-2 uppercase tracking-widest">
                            <span className="font-semibold text-text-primary">{job.organization}</span>
                          </div>
                        </div>

                        {/* Precise Date Badge */}
                        <div className="shrink-0 font-mono text-[10px] tracking-widest text-text-muted uppercase border border-border-subtle px-2.5 py-1 rounded-sm bg-bg-base self-start">
                          {start} — {end}
                        </div>
                      </div>

                      {job.notes && (
                        <p className="text-sm text-text-muted leading-relaxed font-body mt-5 relative z-10">
                          {job.notes}
                        </p>
                      )}
                      
                      {/* Subtle hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-pending/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </motion.div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
