'use client';
import React, { useMemo } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Trophy, Target, Award, Brain } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

export default function Competitive({ achievements }) {
  if (!achievements || achievements.length === 0) return null;

  const chartData = useMemo(() => {
    return achievements.map(ach => {
      let score = 70;
      const res = (ach.result || '').toLowerCase();
      if (res.includes('champion')) score = 98;
      else if (res.includes('1st runner-up')) score = 92;
      else if (res.includes('2nd runner-up')) score = 85;
      else if (res.includes('top 43%')) score = 75; 
      else if (res.includes('top 67%')) score = 65; 
      else score = 80;

      let shortName = ach.competitionOrPlatform;
      if (shortName.includes('ICPC')) shortName = 'ICPC Dhaka';
      else if (shortName.includes('DUET')) shortName = 'DUET IUPC';
      else if (shortName.includes('2023')) shortName = 'NMO \'23';
      else if (shortName.includes('2024')) shortName = 'NMO \'24';
      else if (shortName.includes('Intra')) shortName = 'Intra-Uni PC';
      else shortName = shortName.substring(0, 10);

      return {
        name: ach.competitionOrPlatform,
        shortName,
        score,
        result: ach.result
      };
    });
  }, [achievements]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-bg-base border border-border-subtle rounded-lg p-3 shadow-xl z-50 relative">
          <p className="text-text-primary font-display font-medium text-sm mb-1">{data.name}</p>
          <p className="text-accent-pending font-mono text-xs">{data.result}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border-subtle/40 to-transparent"></div>
      <section id="competitive" className="py-20 md:py-32 bg-bg-base relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-pending/5 rounded-[100%] blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Reveal>
            <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
              // 10 — Competitive Programming
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

          {/* 2-Column Split: Dense List on Left, Chart on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left: Dense Vertical List */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {achievements.map((ach, idx) => {
                return (
                  <Reveal key={ach._id || idx} delay={idx * 0.1}>
                    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-bg-surface border border-border-subtle rounded-2xl hover:border-accent-pending/50 hover:shadow-[0_0_30px_-10px_rgba(255,180,84,0.15)] transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-pending/10 rounded-full blur-[40px] -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      <div className="flex items-center gap-5 relative z-10">
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-bg-base border border-border-subtle flex items-center justify-center group-hover:border-accent-pending/50 transition-colors">
                          <Trophy size={20} className="text-accent-pending" />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-display text-text-primary font-medium group-hover:text-accent-pending transition-colors">
                            {ach.competitionOrPlatform}
                          </h3>
                          {(ach.context || ach.visibility) && (
                            <div className="text-xs font-mono text-text-muted mt-1 opacity-80">
                              {[ach.context, ach.visibility === 'public' ? null : ach.visibility].filter(Boolean).join(' · ')}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="sm:text-right relative z-10 sm:min-w-[140px]">
                        <div className="inline-block px-3 py-1.5 rounded-lg bg-accent-pending/10 border border-accent-pending/20 text-accent-pending font-mono text-xs font-bold uppercase tracking-wider">
                          {ach.result}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Right: Radar Chart Visual */}
            <div className="lg:col-span-5 w-full">
              <Reveal delay={0.3}>
                <div className="h-[400px] md:h-[450px] w-full flex items-center justify-center bg-[#13161c]/50 border border-border-subtle/30 rounded-[2rem] p-4 relative overflow-hidden group hover:border-accent-pending/40 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-pending/5 to-transparent opacity-50"></div>
                  
                  <div className="absolute top-6 right-6 flex items-center gap-2 font-mono text-[10px] text-accent-pending/70 uppercase tracking-widest bg-accent-pending/10 px-3 py-1 rounded-full border border-accent-pending/20">
                    <Brain size={12} /> Performance Matrix
                  </div>

                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
                      <PolarGrid gridType="polygon" radialLines={true} stroke="var(--border-subtle)" strokeOpacity={0.3} />
                      <PolarAngleAxis dataKey="shortName" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }} />
                      <RechartsTooltip content={<CustomTooltip />} cursor={false} />
                      <Radar name="Performance" dataKey="score" stroke="var(--accent-pending)" strokeWidth={2} fill="var(--accent-pending)" fillOpacity={0.15} activeDot={{ r: 6, fill: "var(--accent-pending)", stroke: "var(--bg-base)", strokeWidth: 2 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
