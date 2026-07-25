'use client';
import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { motion } from 'framer-motion';
import { Trophy, Medal, Target, Award } from 'lucide-react';

const getMedalColor = (result) => {
  const res = result?.toLowerCase() || '';
  if (res.includes('champion') || res.includes('1st')) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
  if (res.includes('runner-up') || res.includes('2nd')) return 'text-slate-300 bg-slate-300/10 border-slate-300/30';
  if (res.includes('3rd') || res.includes('bronze')) return 'text-amber-600 bg-amber-600/10 border-amber-600/30';
  return 'text-accent-pending bg-accent-pending/10 border-accent-pending/30';
};

export default function Competitive({ achievements }) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border-subtle/40 to-transparent"></div>
      <section id="competitive" className="py-20 md:py-32 bg-bg-base relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-pending/5 rounded-[100%] blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Reveal>
            <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
              // 06 — Competitive Programming
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <div className="flex flex-col">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-text-primary tracking-tight mb-4">
                  The Arena
                </h2>
                <p className="text-text-muted font-mono max-w-lg text-sm md:text-base leading-relaxed">
                  Proven algorithmic problem-solving skills tested across national and international programming contests.
                </p>
              </div>
              
              <div className="flex items-center gap-4 bg-bg-surface/50 border border-border-subtle rounded-2xl p-4">
                <div className="flex flex-col items-center px-4 border-r border-border-subtle">
                  <span className="text-2xl font-display text-accent-pending">1500+</span>
                  <span className="text-[10px] font-mono text-text-muted uppercase">Problems Solved</span>
                </div>
                <div className="flex flex-col items-center px-4">
                  <span className="text-2xl font-display text-accent-pending">70+</span>
                  <span className="text-[10px] font-mono text-text-muted uppercase">Contests</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Zigzag Leaderboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {achievements.map((ach, idx) => {
              const colorClasses = getMedalColor(ach.result);
              
              return (
                <Reveal key={ach._id || idx} delay={idx * 0.1}>
                  <div className="group h-full bg-bg-surface border border-border-subtle rounded-3xl p-6 md:p-8 hover:border-accent-pending/50 transition-all duration-300 shadow-lg relative overflow-hidden flex flex-col justify-between">
                    
                    <div className="flex justify-between items-start mb-8">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${colorClasses}`}>
                        <Trophy size={20} />
                      </div>
                      {ach.date && (
                        <div className="text-xs font-mono text-text-muted border border-border-subtle px-3 py-1 rounded-full bg-bg-base">
                          {ach.date}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-display text-text-primary font-medium mb-2 group-hover:text-accent-pending transition-colors">
                        {ach.result}
                      </h3>
                      <div className="flex items-center gap-2 text-sm font-mono text-text-muted mb-4">
                        <Target size={14} className="text-accent-pending" />
                        <span>{ach.competitionOrPlatform}</span>
                      </div>
                      
                      {ach.description && (
                        <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                          {ach.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
