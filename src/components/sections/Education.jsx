'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

export default function Education({ education }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!education || education.length === 0) return null;

  const chronological = [...education].sort((a, b) => {
    const yearA = parseInt(a.passingYear) || 0;
    const yearB = parseInt(b.passingYear) || 0;
    return yearA - yearB;
  });

  const activeItem = chronological[activeIndex];
  const n = chronological.length;

  return (
    <section 
      id="education" 
      className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50/60 via-bg-base to-blue-50/40 dark:from-blue-950/20 dark:via-bg-base dark:to-blue-950/10 pt-16 pb-0 border-t border-border-subtle flex flex-col items-center justify-between"
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      <style>
        {`
          @keyframes spin { 
            from { transform: rotate(0deg); } 
            to { transform: rotate(360deg); } 
          }
        `}
      </style>

      {/* Animated Dot Pattern Background */}
      <motion.div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--border-subtle) 2px, transparent 2px)',
          backgroundSize: '40px 40px',
        }}
        animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
      />
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-[100%] blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-20 w-full mb-4">
        <Reveal>
          <div className="text-center text-blue-500 dark:text-blue-400 font-mono text-xs tracking-widest uppercase mb-4 opacity-80">
            // 04 - Academic Journey
          </div>
        </Reveal>

        {/* Top Area: Details (Outside Circle) */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center w-full"
            >
              
              <div className="mb-3 flex flex-wrap justify-center items-center gap-3">
                <span className="font-mono text-[9px] md:text-[10px] text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30 font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                  {activeItem.result}
                </span>
                <span className="font-mono text-[9px] md:text-[10px] text-text-muted bg-white/5 dark:bg-white/5 bg-black/5 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-md">
                  Class of {activeItem.passingYear}
                </span>
              </div>

              <h2 className="text-2xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-white/60 tracking-tight mb-2 drop-shadow-sm px-4">
                {activeItem.degree || activeItem.exam}
              </h2>
              
              <div className="text-text-muted font-mono text-xs md:text-sm mb-4 flex flex-wrap items-center justify-center gap-2">
                <span className="bg-black/5 dark:bg-white/5 px-3 py-1 rounded-md border border-black/10 dark:border-white/10 shadow-sm">{activeItem.institution}</span>
                {activeItem.board && <span className="bg-black/5 dark:bg-white/5 px-3 py-1 rounded-md border border-black/10 dark:border-white/10 shadow-sm">{activeItem.board}</span>}
              </div>

              {activeItem.honours && (
                <div className="text-blue-600 dark:text-blue-400 text-xs md:text-sm italic mb-4 font-medium flex items-center gap-2 bg-blue-500/10 px-4 py-1.5 rounded-lg border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <span className="text-base">🏆</span> {activeItem.honours}
                </div>
              )}

              {activeItem.achievements && activeItem.achievements.length > 0 && (
                <div className="flex flex-col gap-2 text-left w-full max-w-3xl relative mt-1">
                  {/* Decorative timeline spine */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent rounded-full"></div>
                  
                  {activeItem.achievements.map((ach, j) => (
                    <motion.div 
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + j * 0.05, duration: 0.3 }}
                      className="flex items-start gap-4 relative z-10 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors p-3 rounded-xl border border-black/5 dark:border-white/5 backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.15)] relative overflow-hidden group">
                         <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                         <span className="text-blue-500 text-[10px] relative z-10">✦</span>
                      </div>
                      <span className="text-xs md:text-sm text-text-muted leading-relaxed pt-2 font-medium">{ach}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Area: Rotary Dial (Half-hidden by overflow-hidden) */}
      <div className="relative w-full h-[180px] md:h-[225px] flex justify-center overflow-hidden mt-auto z-30">
        
        {/* The Wheel Container */}
        <div className="absolute top-0 w-[360px] h-[360px] md:w-[450px] md:h-[450px] group">
          
          {/* Outer Neon Circle */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15),inset_0_0_30px_rgba(59,130,246,0.15)] pointer-events-none transition-all duration-700"></div>
          {/* Outer Dashed Track */}
          <div className="absolute top-[2px] bottom-[2px] left-[2px] right-[2px] rounded-full border border-dashed border-blue-500/40 pointer-events-none" style={{ animation: 'spin 60s linear infinite reverse' }}></div>

          {/* Inner Neon Circle */}
          <div className="absolute top-[55px] bottom-[55px] left-[55px] right-[55px] md:top-[65px] md:bottom-[65px] md:left-[65px] md:right-[65px] rounded-full border-[1.5px] border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1),inset_0_0_20px_rgba(59,130,246,0.1)] pointer-events-none transition-all duration-700"></div>
          {/* Inner Dashed Track */}
          <div className="absolute top-[57px] bottom-[57px] left-[57px] right-[57px] md:top-[67px] md:bottom-[67px] md:left-[67px] md:right-[67px] rounded-full border border-dashed border-blue-500/40 pointer-events-none" style={{ animation: 'spin 45s linear infinite' }}></div>

          {/* Radar Sweep Effect */}
          <div 
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none mix-blend-screen opacity-50 mask-radial-faded" 
            style={{ animation: 'spin 10s linear infinite' }}
          >
            <div className="absolute inset-0" style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(59,130,246,0.2) 95%, rgba(59,130,246,0.6) 100%)' }}></div>
          </div>

          {/* Inner Core Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none"></div>

          {/* Orbiting Items Container */}
          <div 
            className="absolute top-[27.5px] bottom-[27.5px] left-[27.5px] right-[27.5px] md:top-[32.5px] md:bottom-[32.5px] md:left-[32.5px] md:right-[32.5px] pointer-events-none"
            style={{ animation: 'spin 40s linear infinite' }}
          >
            {[...chronological, ...chronological].map((item, i) => {
              const wheelN = n * 2;
              const wheelAngleStep = 360 / wheelN;
              
              const rad = (i * wheelAngleStep - 90) * (Math.PI / 180);
              const x = 50 + 50 * Math.cos(rad);
              const y = 50 + 50 * Math.sin(rad);
              
              const originalIndex = i % n;
              const isActive = activeIndex === originalIndex;

              return (
                <div
                  key={`${item._id || i}-dup-${i}`}
                  className="absolute flex items-center justify-center pointer-events-auto"
                  style={{ 
                    left: `${x}%`, top: `${y}%`, width: 0, height: 0,
                    animation: 'spin 40s linear infinite reverse' 
                  }}
                >
                  <button
                    onClick={() => setActiveIndex(originalIndex)}
                    className={`relative flex items-center justify-center font-display font-bold px-3 py-1.5 md:px-5 md:py-2 rounded-full border transition-all duration-300 whitespace-nowrap overflow-hidden group/btn ${
                      isActive 
                        ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-500 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.6)] z-50' 
                        : 'bg-white/90 dark:bg-bg-base/90 backdrop-blur-md text-text-muted border-black/10 dark:border-white/10 hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] z-40'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 dark:from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 text-[10px] md:text-sm tracking-wide">{item.exam}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Center Info inside the arc */}
          <div className="absolute top-[18%] md:top-[16%] left-1/2 -translate-x-1/2 text-center w-[80%] md:w-[70%] pointer-events-none flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(3px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(3px)' }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-white/40 mb-2 leading-snug drop-shadow-md">
                  {activeItem.exam}
                </h3>
                {activeItem.major && (
                  <p className="text-blue-600 dark:text-blue-400 font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.15)] line-clamp-1">
                    {activeItem.major}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
