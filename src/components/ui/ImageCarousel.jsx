"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

export function ImageCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isLightboxOpen) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length, isLightboxOpen]);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Carousel Container */}
      <div 
        className="relative w-full h-[40vh] md:h-[60vh] lg:h-[70vh] bg-border-subtle rounded-xl overflow-hidden cursor-pointer group"
        onClick={() => setIsLightboxOpen(true)}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Project screenshot ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-bg-base/50 hover:bg-bg-base/80 backdrop-blur-md rounded-full text-text-primary transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-bg-base/50 hover:bg-bg-base/80 backdrop-blur-md rounded-full text-text-primary transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <FaChevronRight />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-accent-accepted w-6' : 'bg-text-muted hover:bg-text-primary'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-base/95 backdrop-blur-sm p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 p-2 text-text-primary hover:text-accent-accepted transition-colors z-[110]"
              onClick={() => setIsLightboxOpen(false)}
            >
              <FaTimes size={24} />
            </button>

            <img 
              src={images[currentIndex]} 
              alt={`Project screenshot ${currentIndex + 1} full`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-4 bg-surface/50 hover:bg-surface rounded-full text-text-primary transition-colors z-[110]"
                >
                  <FaChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-4 bg-surface/50 hover:bg-surface rounded-full text-text-primary transition-colors z-[110]"
                >
                  <FaChevronRight size={24} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
