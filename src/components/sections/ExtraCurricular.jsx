'use client';
import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Users, Monitor, Hash, Globe, Medal, Star } from 'lucide-react';

export default function ExtraCurricular({ leadershipRoles }) {
  if (!leadershipRoles || leadershipRoles.length === 0) return null;

  const formatYear = (role) => {
    if (role.year) return role.year;
    if (!role.startDate) return '';
    
    const parseDate = (dStr) => {
      if (!dStr) return '';
      if (dStr.length === 4) return dStr;
      const parts = dStr.split('-');
      if (parts.length >= 2) {
        const date = new Date(parts[0], parseInt(parts[1]) - 1);
        return `${date.toLocaleString('default', { month: 'short' })} ${parts[0]}`;
      }
      return dStr;
    };
    
    const startStr = parseDate(role.startDate);
    if (role.current) return `${startStr} - Present`;
    if (!role.endDate) return startStr;
    
    const endStr = parseDate(role.endDate);
    return `${startStr} - ${endStr}`;
  };

  const getTheme = (idx) => {
    const themes = [
      { text: 'text-accent-pending', hoverText: 'group-hover:text-accent-pending', bg: 'bg-accent-pending/10', border: 'hover:border-accent-pending/50', shadow: 'hover:shadow-[0_10px_40px_-15px_rgba(255,180,84,0.25)]', glow: 'bg-accent-pending/10' },
      { text: 'text-accent-info', hoverText: 'group-hover:text-accent-info', bg: 'bg-accent-info/10', border: 'hover:border-accent-info/50', shadow: 'hover:shadow-[0_10px_40px_-15px_rgba(108,140,255,0.25)]', glow: 'bg-accent-info/10' },
      { text: 'text-accent-accepted', hoverText: 'group-hover:text-accent-accepted', bg: 'bg-accent-accepted/10', border: 'hover:border-accent-accepted/50', shadow: 'hover:shadow-[0_10px_40px_-15px_rgba(47,217,138,0.25)]', glow: 'bg-accent-accepted/10' },
      { text: 'text-accent-wrong', hoverText: 'group-hover:text-accent-wrong', bg: 'bg-accent-wrong/10', border: 'hover:border-accent-wrong/50', shadow: 'hover:shadow-[0_10px_40px_-15px_rgba(255,107,107,0.25)]', glow: 'bg-accent-wrong/10' },
      { text: 'text-accent-pending', hoverText: 'group-hover:text-accent-pending', bg: 'bg-accent-pending/10', border: 'hover:border-accent-pending/50', shadow: 'hover:shadow-[0_10px_40px_-15px_rgba(255,180,84,0.25)]', glow: 'bg-accent-pending/10' },
      { text: 'text-accent-info', hoverText: 'group-hover:text-accent-info', bg: 'bg-accent-info/10', border: 'hover:border-accent-info/50', shadow: 'hover:shadow-[0_10px_40px_-15px_rgba(108,140,255,0.25)]', glow: 'bg-accent-info/10' },
    ];
    return themes[idx % themes.length];
  };

  const getRotation = (idx) => (idx % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1');

  return (
    <>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border-subtle/40 to-transparent"></div>
      <section id="extracurricular" className="py-20 md:py-32 bg-bg-base relative overflow-hidden">
        {/* Glow effect matching the theme */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-pending/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Reveal>
            <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
              // 11 — Extra Curricular
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-text-primary tracking-tight mb-16">
              Beyond the Screen
            </h2>
          </Reveal>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {leadershipRoles.map((role, idx) => {
              const theme = getTheme(idx);
              const rotation = getRotation(idx);
              const dateStr = formatYear(role);

              // Rotate icons array
              const icons = [Monitor, Hash, Users, Globe, Medal, Star];
              const Icon = icons[idx % icons.length];

              return (
                <div key={role._id || idx} className="break-inside-avoid w-full">
                  <Reveal delay={idx * 0.1}>
                    <div className={`group flex flex-col bg-bg-surface border border-border-subtle rounded-[2rem] p-6 md:p-8 hover:-translate-y-2 ${theme.shadow} ${theme.border} ${rotation} transition-all duration-300 relative overflow-hidden`}>
                      
                      <div className={`absolute top-0 right-0 w-48 h-48 ${theme.glow} rounded-full blur-[60px] -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                      <div className={`mb-8 relative z-10 w-16 h-16 rounded-2xl ${theme.bg} flex items-center justify-center border border-border-subtle group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={28} strokeWidth={1.5} className={theme.text} />
                      </div>
                      
                      <div className="flex-grow relative z-10">
                        <div className={`text-xs font-mono ${theme.text} font-bold tracking-widest uppercase mb-3`}>
                          {role.role || role.title}
                        </div>
                        <h4 className={`text-xl md:text-2xl font-display text-text-primary font-medium mb-2 ${theme.hoverText} transition-colors`}>
                          {role.organization}
                        </h4>
                        {dateStr && (
                          <div className="text-xs md:text-sm text-text-muted font-mono mb-5 opacity-70">
                            {dateStr}
                          </div>
                        )}
                        
                        {role.responsibilities && role.responsibilities.length > 0 ? (
                          <ul className="text-sm text-text-muted leading-relaxed font-mono opacity-80 space-y-2 list-none mt-6">
                            {role.responsibilities.map((r, i) => (
                              <li key={i} className="flex gap-3">
                                <span className={`${theme.text} mt-0.5 opacity-70`}>•</span>
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        ) : role.description && (
                          <p className="text-sm text-text-muted leading-relaxed font-mono opacity-80 mt-6 text-base">
                            {role.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
