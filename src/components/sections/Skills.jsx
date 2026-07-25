'use client';
import React, { useState, useMemo, useTransition } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip as RechartsTooltip, PieChart as RechartsPieChart, Pie as RechartsPie, Cell as RechartsCell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Code2, Database, LayoutTemplate, BrainCircuit, ShieldCheck, TerminalSquare, Sparkles, Loader2 } from 'lucide-react';

const getIconForCategory = (cat) => {
  switch (cat.toLowerCase()) {
    case 'frontend': return <LayoutTemplate size={18} className="text-accent-pending" />;
    case 'backend': return <TerminalSquare size={18} className="text-accent-pending" />;
    case 'languages': return <Code2 size={18} className="text-accent-pending" />;
    case 'database': return <Database size={18} className="text-accent-pending" />;
    case 'ai/ml': return <BrainCircuit size={18} className="text-accent-pending" />;
    case 'auth': return <ShieldCheck size={18} className="text-accent-pending" />;
    default: return <Wrench size={18} className="text-accent-pending" />;
  }
};

export default function Skills({ skills }) {
  const [activeTab, setActiveTab] = useState('All');
  const [isPending, startTransition] = useTransition();
  const [loadingTab, setLoadingTab] = useState(null);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setLoadingTab(tab);
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  const categories = useMemo(() => {
    if (!skills) return [];
    return [...new Set(skills.map(s => s.category))].filter(Boolean);
  }, [skills]);

  const allTabs = ['All', ...categories];

  // Aggregate stats for radar chart (average proficiency per category)
  // Radar chart always shows the full profile shape
  const radarData = useMemo(() => {
    if (!skills) return [];
    return categories.map(cat => {
      const catSkills = skills.filter(s => s.category === cat);
      const avg = catSkills.length > 0
        ? catSkills.reduce((acc, curr) => acc + (curr.proficiency || 0), 0) / catSkills.length
        : 0;
      return {
        category: cat,
        value: Math.round(avg)
      };
    });
  }, [categories, skills]);

  if (!skills || skills.length === 0) return null;

  // Group skills by category to render cards
  const cardsToRender = useMemo(() => {
    if (activeTab !== 'All') return [activeTab];

    // In "All" view, sort categories by the number of skills they contain (descending)
    return [...categories].sort((a, b) => {
      const countA = skills.filter(s => s.category === a).length;
      const countB = skills.filter(s => s.category === b).length;
      return countB - countA;
    });
  }, [activeTab, categories, skills]);

  return (
    <>
      {/* Soft gradient divider between sections */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border-subtle/40 to-transparent"></div>
      <section id="skills" className="py-10 md:py-18 bg-bg-base relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent-pending/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Reveal>
            <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
            // 03 — Skills
            </div>
            {/* Section Header */}
            <div className="flex flex-col mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-text-primary tracking-tight mb-8">
                The Architect's Toolkit
              </h2>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                {allTabs.map(tab => {
                  const isActive = activeTab === tab;
                  const isLoading = isPending && loadingTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      disabled={isPending}
                      className={`px-5 py-2.5 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 border flex items-center justify-center gap-2 ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      } ${isActive
                          ? 'bg-accent-pending text-bg-base border-accent-pending font-semibold shadow-[0_0_15px_rgba(252,211,77,0.3)]'
                          : 'bg-bg-surface/50 text-text-muted border-border-subtle hover:border-accent-pending/50 hover:text-text-primary disabled:hover:border-border-subtle'
                        }`}
                    >
                      {isLoading && <Loader2 size={14} className="animate-spin" />}
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {activeTab === 'All' ? (
            /* "ALL" VIEW: Multi-column grid of cards, no specific chart to save space, or put a small radar at top */
            <div className="flex flex-col gap-12 mt-12">

              {/* Optional: Show Radar chart centrally in All view before the grid */}
              <div className="w-full flex justify-center mb-4">
                <div className="h-[350px] w-full max-w-2xl flex items-center justify-center bg-[#13161c]/50 border border-border-subtle/30 rounded-3xl p-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-pending/5 to-transparent opacity-50"></div>
                  <div className="absolute top-4 right-6 flex items-center gap-2 font-mono text-[10px] text-accent-pending/70 uppercase tracking-widest bg-accent-pending/10 px-3 py-1 rounded-full">
                    <Sparkles size={12} /> Synergy Matrix
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid gridType="polygon" radialLines={true} stroke="var(--border-subtle)" strokeOpacity={0.2} />
                      <PolarAngleAxis dataKey="category" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }} />
                      <RechartsTooltip cursor={false} contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '12px' }} itemStyle={{ color: 'var(--accent-pending)' }} formatter={(value) => [`${value}%`, 'Proficiency']} />
                      <Radar name="Mastery" dataKey="value" stroke="var(--accent-pending)" strokeWidth={2} fill="var(--accent-pending)" fillOpacity={0.15} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Grid of all category cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 items-start">
                <AnimatePresence mode="popLayout">
                  {cardsToRender.map((cat, i) => {
                    const catSkills = skills.filter(s => s.category === cat);
                    if (catSkills.length === 0) return null;

                    return (
                      <motion.div
                        key={cat}
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="bg-[#13161c] border border-border-subtle/50 rounded-2xl p-5 shadow-xl flex flex-col h-full"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          {getIconForCategory(cat)}
                          <h3 className="font-mono text-sm font-bold text-accent-pending tracking-widest uppercase">
                            {cat}
                          </h3>
                        </div>

                        <div className="space-y-5 grow">
                          {catSkills.map(skill => {
                            const prof = skill.proficiency || 0;
                            return (
                              <div key={skill._id || skill.name} className="flex flex-col gap-2 group">
                                <div className="flex justify-between items-end font-mono text-xs">
                                  <span className="text-text-primary/90 font-medium group-hover:text-accent-pending transition-colors">{skill.name}</span>
                                  <span className="text-accent-pending font-semibold">{prof}%</span>
                                </div>
                                <div className="h-1 w-full bg-bg-base rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${prof}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-accent-pending rounded-full shadow-[0_0_8px_var(--accent-pending)]"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* SPECIFIC CATEGORY VIEW: 2-column layout (Card + BarChart) */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-12 items-start">

              {/* Left Column: Single Skill Card */}
              <div className="flex flex-col w-full">
                <AnimatePresence mode="popLayout">
                  {cardsToRender.map((cat) => {
                    const catSkills = skills.filter(s => s.category === cat);
                    if (catSkills.length === 0) return null;

                    return (
                      <motion.div
                        key={cat}
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="bg-[#13161c] border border-border-subtle/50 rounded-2xl p-6 md:p-8 shadow-xl"
                      >
                        <div className="flex items-center gap-3 mb-8">
                          {getIconForCategory(cat)}
                          <h3 className="font-mono text-base font-bold text-accent-pending tracking-widest uppercase">
                            {cat}
                          </h3>
                        </div>

                        <div className="space-y-6">
                          {catSkills.map(skill => {
                            const prof = skill.proficiency || 0;
                            return (
                              <div key={skill._id || skill.name} className="flex flex-col gap-2 group">
                                <div className="flex justify-between items-end font-mono text-sm">
                                  <span className="text-text-primary/90 font-medium group-hover:text-accent-pending transition-colors">{skill.name}</span>
                                  <span className="text-accent-pending font-semibold">{prof}%</span>
                                </div>
                                <div className="h-1 w-full bg-bg-base rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${prof}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                    className="h-full bg-accent-pending rounded-full shadow-[0_0_8px_var(--accent-pending)]"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Right Column: Individual Skill Bar Chart */}
              <div className="sticky top-32 h-[400px] lg:h-[500px] w-full flex items-center justify-center bg-[#13161c]/50 border border-border-subtle/30 rounded-3xl p-4 lg:p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tl from-accent-pending/5 to-transparent opacity-50"></div>

                <div className="absolute top-6 right-6 flex items-center gap-2 font-mono text-[10px] text-accent-pending/70 uppercase tracking-widest bg-accent-pending/10 px-3 py-1 rounded-full">
                  <Sparkles size={12} /> {activeTab} Mastery
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <RechartsTooltip
                      cursor={false}
                      contentStyle={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}
                      itemStyle={{ color: 'var(--accent-pending)' }}
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                    <RechartsPie
                      data={skills.filter(s => s.category === activeTab)}
                      cx="50%"
                      cy="50%"
                      innerRadius="50%"
                      outerRadius="75%"
                      paddingAngle={3}
                      dataKey="proficiency"
                      nameKey="name"
                      stroke="none"
                      labelLine={false}
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 20;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text x={x} y={y} fill="var(--text-muted)" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="11" fontFamily="var(--font-mono)">
                            {name}
                          </text>
                        );
                      }}
                    >
                      {skills.filter(s => s.category === activeTab).map((entry, index) => (
                        <RechartsCell
                          key={`cell-${index}`}
                          fill="var(--accent-pending)"
                          fillOpacity={1 - (index % 5) * 0.15}
                        />
                      ))}
                    </RechartsPie>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Floating Skill Badges (Infinite Scrolling Marquees) */}
          <Reveal>
            <div className="mt-24 pt-12 border-t border-border-subtle/30 overflow-hidden relative">

              {/* Ambient gradients to fade the edges */}
              <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-bg-base to-transparent z-10 pointer-events-none"></div>
              <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-bg-base to-transparent z-10 pointer-events-none"></div>

              <div className="flex flex-col gap-4 opacity-80">

                {/* Row 1 (LTR) */}
                <div className="flex w-full">
                  <motion.div
                    className="flex gap-4 min-w-max"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ ease: "linear", duration: 35, repeat: Infinity }}
                  >
                    {[...skills.slice(0, Math.ceil(skills.length / 3)), ...skills.slice(0, Math.ceil(skills.length / 3))].map((skill, i) => (
                      <div key={`row1-${i}`} className="px-5 py-2.5 rounded-xl bg-bg-surface/50 border border-border-subtle/50 font-mono text-xs text-text-muted hover:text-accent-pending hover:border-accent-pending hover:opacity-100 transition-all cursor-default shadow-sm backdrop-blur-sm">
                        {skill.name}
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Row 2 (RTL) */}
                <div className="flex w-full">
                  <motion.div
                    className="flex gap-4 min-w-max"
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{ ease: "linear", duration: 45, repeat: Infinity }}
                  >
                    {[...skills.slice(Math.ceil(skills.length / 3), Math.ceil(skills.length * 2 / 3)), ...skills.slice(Math.ceil(skills.length / 3), Math.ceil(skills.length * 2 / 3))].map((skill, i) => (
                      <div key={`row2-${i}`} className="px-5 py-2.5 rounded-xl bg-bg-surface/50 border border-border-subtle/50 font-mono text-xs text-text-muted hover:text-accent-pending hover:border-accent-pending hover:opacity-100 transition-all cursor-default shadow-sm backdrop-blur-sm">
                        {skill.name}
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Row 3 (LTR) */}
                <div className="flex w-full">
                  <motion.div
                    className="flex gap-4 min-w-max"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                  >
                    {[...skills.slice(Math.ceil(skills.length * 2 / 3)), ...skills.slice(Math.ceil(skills.length * 2 / 3))].map((skill, i) => (
                      <div key={`row3-${i}`} className="px-5 py-2.5 rounded-xl bg-bg-surface/50 border border-border-subtle/50 font-mono text-xs text-text-muted hover:text-accent-pending hover:border-accent-pending hover:opacity-100 transition-all cursor-default shadow-sm backdrop-blur-sm">
                        {skill.name}
                      </div>
                    ))}
                  </motion.div>
                </div>

              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}
