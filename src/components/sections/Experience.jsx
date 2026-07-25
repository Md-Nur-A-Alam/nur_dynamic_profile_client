'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { ExternalLink } from 'lucide-react';

export default function Experience({ experience }) {
  if (!experience || experience.length === 0) return null;

  // Sort by startDate descending
  const sorted = [...experience].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <section id="experience" className="py-16 md:py-28 bg-bg-base border-t border-border-subtle">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal>
          <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
            // 03 — experience
          </div>
          {/* Section Header */}
          <div className="flex flex-col mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-text-primary tracking-tight uppercase">
              Experience
            </h2>
            <div className="w-full h-[1px] bg-border-subtle mt-8"></div>
          </div>
        </Reveal>

        <div className="space-y-24 md:space-y-8">
          {sorted.map((job, idx) => {
            const isCurrent = job.current || (!job.endDate || job.endDate.toLowerCase() === 'present');
            const isOdd = idx % 2 !== 0;
            
            // Format dates
            const start = new Date(job.startDate).getFullYear() || new Date(job.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            const end = isCurrent ? 'Present' : (new Date(job.endDate).getFullYear() || new Date(job.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));

            return (
              <motion.div
                key={job._id || idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative group"
              >
                {/* Decorative background glow that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-pending/5 via-transparent to-accent-pending/5 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-[2rem] blur-2xl -z-10 pointer-events-none"></div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  
                  {/* IMAGE BLOCK */}
                  <div className={`md:col-span-4 lg:col-span-3 flex flex-col order-1 ${isOdd ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="w-full h-full min-h-[200px] border border-border-subtle/60 rounded-[2rem] p-8 flex items-center justify-center bg-bg-surface/30 group-hover:bg-bg-surface/50 group-hover:border-accent-pending/30 transition-all duration-500 shadow-sm overflow-hidden relative">
                      {job.image ? (
                        <motion.img 
                          whileHover={{ scale: 1.05 }}
                          src={job.image} 
                          alt={job.organization} 
                          className="max-w-[120px] max-h-[120px] object-contain grayscale group-hover:grayscale-0 transition-all duration-700 z-10 relative drop-shadow-md" 
                        />
                      ) : (
                        <span className="text-3xl font-display font-bold text-text-muted/30 uppercase tracking-widest">{job.organization.slice(0,2)}</span>
                      )}
                      
                      {/* Interactive background accent in image block */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-pending/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* TEXT CONTAINER BLOCK */}
                  <div className={`md:col-span-8 lg:col-span-9 flex flex-col order-2 ${isOdd ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="w-full h-full border border-border-subtle/60 rounded-[2rem] p-6 md:p-8 lg:p-10 bg-bg-surface/20 group-hover:bg-bg-surface/40 group-hover:border-accent-pending/30 transition-all duration-500 shadow-sm relative overflow-hidden">
                      
                      {/* Text block top gradient */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-pending/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 h-full">
                        
                        {/* Inner Col 1: Organization & Dates */}
                        <div className="lg:col-span-4 flex flex-col">
                          <h3 className="text-2xl md:text-3xl font-display font-medium text-text-primary group-hover:text-accent-pending transition-colors duration-300 mb-2">
                            {job.organization}
                          </h3>
                          <div className="text-sm font-body text-text-muted mb-4 opacity-90">
                            {job.role}
                          </div>
                          <div className="text-sm font-mono text-text-primary mb-2">
                            {start} — {end}
                          </div>
                        </div>

                        {/* Inner Col 2: Metadata List */}
                        <div className="lg:col-span-4 flex flex-col text-xs md:text-sm font-body gap-3">
                          {job.position && (
                            <div className="flex justify-between items-start">
                              <span className="text-text-muted">Position</span>
                              <span className="text-text-primary text-right font-medium">{job.position}</span>
                            </div>
                          )}
                          {job.location && (
                            <div className="flex justify-between items-start">
                              <span className="text-text-muted">Location</span>
                              <span className="text-text-primary text-right">{job.location}</span>
                            </div>
                          )}
                          {job.industry && (
                            <div className="flex justify-between items-start">
                              <span className="text-text-muted">Industry</span>
                              <span className="text-text-primary text-right">{job.industry}</span>
                            </div>
                          )}
                          {job.website && (
                            <div className="flex justify-between items-center pb-1">
                              <span className="text-text-muted">Website</span>
                              <a 
                                href={job.website} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-text-primary hover:text-accent-pending transition-colors text-right flex items-center gap-1 border-b border-text-primary hover:border-accent-pending pb-0.5"
                              >
                                {new URL(job.website).hostname.replace('www.', '')}
                                <ExternalLink size={10} className="ml-0.5" />
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Inner Col 3: Responsibilities */}
                        <div className="lg:col-span-4 text-sm md:text-sm text-text-muted leading-relaxed font-body opacity-90">
                          {job.responsibilities && job.responsibilities.length > 0 ? (
                            <p>
                              As a {job.role} at {job.organization}, {job.responsibilities.join(', ').toLowerCase()}.
                            </p>
                          ) : job.notes ? (
                            <p>{job.notes}</p>
                          ) : null}
                          
                          {/* If you want to keep bullet points instead of paragraph, uncomment below: */}
                          {/* 
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-accent-pending">▹</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul> 
                          */}
                        </div>

                      </div>

                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
