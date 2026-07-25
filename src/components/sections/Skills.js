'use client';
import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function Skills({ skills }) {
  const categories = ['Frontend', 'Backend', 'Languages', 'Database', 'Auth', 'AI/ML', 'Tools'];
  
  // Aggregate stats for radar chart (average proficiency per category)
  const radarData = categories.map(cat => {
    const catSkills = skills?.filter(s => s.category === cat) || [];
    const avg = catSkills.length > 0 
      ? catSkills.reduce((acc, curr) => acc + (curr.proficiency || 0), 0) / catSkills.length 
      : 0;
    return {
      category: cat,
      value: avg
    };
  });

  return (
    <section id="skills" className="py-12 md:py-24 border-t border-border-subtle bg-bg-surface">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal>
          <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
            // 05 — skills
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Radar Chart */}
            <div className="h-[350px] w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  {/* Faint reference ring at 50% */}
                  <PolarGrid gridType="circle" radialLines={false} stroke="var(--border-subtle)" strokeOpacity={0.08} />
                  
                  <PolarAngleAxis 
                    dataKey="category" 
                    tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)' }} 
                  />
                  <Radar 
                    name="Skills" 
                    dataKey="value" 
                    stroke="var(--accent-accepted)" 
                    strokeWidth={2}
                    fill="var(--accent-accepted)" 
                    fillOpacity={0.2} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Test Cases Passed Bars */}
            <div className="flex flex-col gap-8">
              {categories.map((cat, i) => {
                const catSkills = skills?.filter(s => s.category === cat) || [];
                if (catSkills.length === 0) return null;
                
                return (
                  <Reveal key={cat} delay={i * 0.1}>
                    <div className="mb-3 font-mono text-sm text-text-primary uppercase tracking-widest">{cat}</div>
                    <div className="space-y-4">
                      {catSkills.map(skill => {
                        const prof = skill.proficiency || 0;
                        let barColor = 'bg-text-muted';
                        let textColor = 'text-text-muted';
                        if (prof >= 85) {
                          barColor = 'bg-accent-accepted';
                          textColor = 'text-accent-accepted';
                        } else if (prof >= 60) {
                          barColor = 'bg-accent-pending';
                          textColor = 'text-accent-pending';
                        }

                        return (
                          <div key={skill._id || skill.name} className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-end font-mono text-xs">
                              <span className="text-text-primary">{skill.name}</span>
                              <span className={textColor}>{prof}/100 test cases passed</span>
                            </div>
                            <div className="h-1.5 w-full bg-bg-surface-raised rounded-sm overflow-hidden flex">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `\${prof}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`h-full \${barColor} rounded-sm`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Reveal>
                );
              })}
            </div>
            
          </div>
        </Reveal>
      </div>
    </section>
  );
}
