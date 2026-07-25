'use client';
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CURSOR_STYLES = ['floaty', 'blend', 'text', 'trail'];

export default function CustomCursor() {
  const [cursorStyle, setCursorStyle] = useState('floaty');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default true to prevent hydration mismatch, update in effect
  
  // Smooth springs for delayed effect
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it's a touch device
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);

    // Cycle styles every 30 seconds
    const interval = setInterval(() => {
      setCursorStyle(prev => {
        const currentIndex = CURSOR_STYLES.indexOf(prev);
        const nextIndex = (currentIndex + 1) % CURSOR_STYLES.length;
        return CURSOR_STYLES[nextIndex];
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Handle trail logic
      if (cursorStyle === 'trail') {
        setTrail(prev => {
          // Throttle trail generation slightly
          if (prev.length > 0 && Date.now() - prev[prev.length - 1].id < 20) return prev;
          const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
          if (newTrail.length > 20) return newTrail.slice(newTrail.length - 20);
          return newTrail;
        });
      }
    };

    // Detect hovering over interactable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractable = target.tagName.toLowerCase() === 'a' || 
                             target.tagName.toLowerCase() === 'button' || 
                             target.closest('a') || 
                             target.closest('button') ||
                             window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(isInteractable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, cursorStyle, isTouchDevice]);

  // Trail fade out interval
  useEffect(() => {
    if (cursorStyle !== 'trail' || isTouchDevice) return;
    const interval = setInterval(() => {
      setTrail(prev => (prev.length > 0 ? prev.slice(1) : []));
    }, 40);
    return () => clearInterval(interval);
  }, [cursorStyle, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Global CSS to hide default cursor */}
      <style jsx global>{`
        body, a, button, [role="button"], input, select, textarea {
          cursor: none !important;
        }
      `}</style>

      {/* 1. Base tiny dot (always follows exactly, unless in blend mode) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent-pending rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: cursorStyle === 'blend' ? 0 : 1
        }}
        transition={{ type: "tween", duration: 0 }}
      />

      {/* 2. STYLE: Floaty Delayed Ring */}
      {cursorStyle === 'floaty' && (
        <motion.div
          className="fixed top-0 left-0 w-10 h-10 border border-accent-pending rounded-full pointer-events-none z-[9998]"
          style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
          animate={{
            scale: isHovering ? 1.5 : 1,
            backgroundColor: isHovering ? 'rgba(252, 211, 77, 0.1)' : 'transparent',
            borderWidth: isHovering ? '2px' : '1px'
          }}
        />
      )}

      {/* 3. STYLE: Blend-Mode Inversion */}
      {cursorStyle === 'blend' && (
        <motion.div
          className="fixed top-0 left-0 w-10 h-10 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
          style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
          animate={{ 
            scale: isHovering ? 2.5 : 1,
          }}
        />
      )}

      {/* 4. STYLE: Contextual Text Label */}
      {cursorStyle === 'text' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center w-20 h-20 rounded-full bg-accent-pending text-bg-base font-mono text-[10px] font-bold tracking-widest shadow-xl"
          style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovering ? 1 : 0,
            opacity: isHovering ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          EXPLORE
        </motion.div>
      )}

      {/* 5. STYLE: Particle Trail */}
      {cursorStyle === 'trail' && (
        <>
          {trail.map((t) => (
            <motion.div
              key={t.id}
              className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9997]"
              initial={{ x: t.x - 5, y: t.y - 5, opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ backgroundColor: 'var(--accent-pending)' }}
            />
          ))}
          {/* Also show the floaty ring slightly when in trail mode to give it a head */}
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-accent-pending/50 rounded-full pointer-events-none z-[9998]"
            style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
            animate={{ scale: isHovering ? 1.5 : 1 }}
          />
        </>
      )}
    </>
  );
}
