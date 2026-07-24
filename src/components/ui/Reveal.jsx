'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ children, delay = 0, className, width = 'w-full' }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative ${width} ${className || ''}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: delay, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
