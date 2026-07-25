'use client';
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';

const PlayfulShape = ({ shape, springX, springY }) => {
  const x = useTransform(springX, [-1, 1], [-shape.depth, shape.depth]);
  const y = useTransform(springY, [-1, 1], [-shape.depth, shape.depth]);

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={{ top: shape.top, left: shape.left, x, y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: shape.delay, type: 'spring', stiffness: 100 }}
    >
      <motion.div
        animate={{ rotate: shape.depth > 0 ? 360 : -360 }}
        transition={{ duration: 25 + Math.abs(shape.depth), repeat: Infinity, ease: 'linear' }}
      >
        {shape.type === 'circle' && (
          <div style={{ width: shape.size, height: shape.size, borderRadius: '50%', backgroundColor: shape.color, opacity: 0.15 }} />
        )}
        {shape.type === 'square' && (
          <div style={{ width: shape.size, height: shape.size, borderRadius: '12px', backgroundColor: shape.color, opacity: 0.15 }} />
        )}
        {shape.type === 'triangle' && (
          <div style={{ width: 0, height: 0, borderLeft: `${shape.size/2}px solid transparent`, borderRight: `${shape.size/2}px solid transparent`, borderBottom: `${shape.size}px solid ${shape.color}`, opacity: 0.15 }} />
        )}
        {shape.type === 'donut' && (
          <div style={{ width: shape.size, height: shape.size, borderRadius: '50%', border: `8px solid ${shape.color}`, opacity: 0.15 }} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default function InteractiveBackground() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const springX = useSpring(0, { stiffness: 40, damping: 20 });
  const springY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      springX.set(x);
      springY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  
  if (!mounted || currentTheme === 'dark') return null;

  const shapes = [
    { type: 'circle', color: '#FFB454', size: 60, top: '20%', left: '10%', depth: 40, delay: 0 },
    { type: 'square', color: '#2FD98A', size: 40, top: '60%', left: '15%', depth: -30, delay: 0.1 },
    { type: 'triangle', color: '#6C8CFF', size: 55, top: '30%', left: '80%', depth: 50, delay: 0.2 },
    { type: 'circle', color: '#FF6B6B', size: 25, top: '75%', left: '75%', depth: -40, delay: 0.3 },
    { type: 'donut', color: '#D98A1F', size: 70, top: '80%', left: '30%', depth: 35, delay: 0.4 },
    { type: 'square', color: '#3E5FE0', size: 30, top: '15%', left: '60%', depth: -25, delay: 0.5 },
    { type: 'donut', color: '#2FD98A', size: 45, top: '10%', left: '40%', depth: 60, delay: 0.6 },
    { type: 'triangle', color: '#FFB454', size: 30, top: '85%', left: '60%', depth: -55, delay: 0.7 },
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Light subtle gradient radial mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FFB454]/10 via-transparent to-transparent opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#2FD98A]/10 via-transparent to-transparent opacity-60"></div>
      
      {/* Playful Floating & Interactive Shapes */}
      {shapes.map((shape, i) => (
        <PlayfulShape key={i} shape={shape} springX={springX} springY={springY} />
      ))}

      {/* Very faint dotted grid for a "playful notebook" feel in light mode */}
      <div 
        className="absolute inset-0 opacity-[0.08]" 
        style={{ 
          backgroundImage: 'radial-gradient(#12151C 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
