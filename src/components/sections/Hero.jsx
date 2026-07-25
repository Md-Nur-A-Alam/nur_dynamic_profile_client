'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FileText, Download, Linkedin, Trophy, BookOpen } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';

export default function Hero({ profile, documents }) {
  const [typeWriterText, setTypeWriterText] = useState('');

  const shouldReduceMotion = useReducedMotion();
  const resumeDoc = documents?.find(d => d.type === 'resume' || d.title.toLowerCase().includes('resume'));

  const titles = useMemo(() => {
    return profile?.titles?.length ? profile.titles : [
      "FRONTEND DEVELOPER", "COMPETITIVE PROGRAMMER", "BACKEND DEVELOPER",
      "AI ENGINEER", "FULLSTACK DEVELOPER", "AI RESEARCHER", "PROBLEM SOLVER"
    ];
  }, [profile?.titles]);

  useEffect(() => {
    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timeoutId;

    const type = () => {
      const currentTitle = titles[currentTitleIndex];

      if (isDeleting) {
        setTypeWriterText(currentTitle.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 30; // faster deletion
      } else {
        setTypeWriterText(currentTitle.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && currentCharIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end of word
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before new word
      }

      timeoutId = setTimeout(type, typingSpeed);
    };

    timeoutId = setTimeout(type, 500); // Initial start delay

    return () => clearTimeout(timeoutId);
  }, [titles]);

  return (
    <motion.section
      id="hero"
      className="min-h-[90vh] flex items-center py-12 md:py-24 relative overflow-hidden bg-bg-base text-text-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Subtle Background Elements */}
      <motion.div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, var(--accent-pending), transparent 50%), radial-gradient(circle at 85% 30%, var(--accent-pending), transparent 50%)' }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
      ></motion.div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center z-10 relative">

        {/* Left Content */}
        <div className="order-2 lg:order-1 flex flex-col gap-6 md:gap-8">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Pill Container */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              {/* Pill */}
              <div className="inline-flex items-center gap-3 border border-border-subtle rounded-full px-5 py-2 bg-bg-surface/50 backdrop-blur-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-accepted shadow-[0_0_8px_rgba(47,217,138,0.6)]"></span>
                <span className="text-sm font-mono font-medium text-text-primary tracking-wide">
                  Open to Work · Available Now
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 md:gap-2 mb-6">
              <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight text-text-primary">
                {profile?.fullName || 'Md. Nur'}<br />
                {profile?.lastName || 'A Alam'}<span className="text-accent-pending">.</span>
              </h1>

              <div className="mt-4 text-accent-pending font-mono text-lg sm:text-xl h-8 uppercase tracking-[0.1em] font-semibold">
                {typeWriterText}<span className="animate-pulse">|</span>
              </div>
            </div>

            <p className="text-text-muted text-base md:text-lg max-w-lg mb-10 leading-relaxed">
              {profile?.tagline || 'Building intelligent, elegant systems at the intersection of frontend craft and AI.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button
                variant="default"
                size="lg"
                className="bg-accent-pending text-[#0B0E14] hover:bg-accent-pending/90 font-semibold border-none"
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group relative border-accent-pending text-accent-pending hover:bg-accent-pending/10"
                disabled={!resumeDoc}
                title={!resumeDoc ? 'Resume coming soon' : ''}
              >
                {resumeDoc ? (
                  <a
                    href={resumeDoc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                    onClick={(e) => {
                      import('@/lib/confetti').then(m => m.triggerConfetti(true));
                    }}
                  >
                    Download CV
                  </a>
                ) : (
                  <span className="flex items-center gap-2">
                    Resume Pending
                  </span>
                )}
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-6 text-text-muted">
              {profile?.socialLinks?.map((link, i) => {
                let Icon = FaGithub;
                if (link.platform.toLowerCase() === 'linkedin') Icon = FaLinkedinIn;
                if (link.platform.toLowerCase().includes('leet')) Icon = Trophy;
                if (link.platform.toLowerCase().includes('scholar')) Icon = BookOpen;
                return (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="hover:text-accent-pending transition-colors">
                    <Icon size={22} />
                  </a>
                );
              })}
              {!profile?.socialLinks?.length && (
                <>
                  <a href="#" className="hover:text-accent-pending transition-colors"><FaGithub size={22} /></a>
                  <a href="#" className="hover:text-accent-pending transition-colors"><FaLinkedinIn size={22} /></a>
                  <a href="#" className="hover:text-accent-pending transition-colors"><Trophy size={22} /></a>
                  <a href="#" className="hover:text-accent-pending transition-colors"><BookOpen size={22} /></a>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Content - Hexagon Profile */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative min-h-[400px] flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="relative"
          >
            {/* Hexagon Wrapper */}
            <motion.div
              animate={{
                y: [0, -15, 0, 10, 0],
                x: [0, 5, 0, -5, 0],
                rotate: [0, 2, -1, 1, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div
                className="relative w-[280px] h-[320px] md:w-[350px] md:h-[400px] bg-accent-pending p-1 shadow-[0_0_40px_var(--accent-pending)]"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <div
                  className="w-full h-full bg-bg-surface"
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                >
                  {profile?.image ? (
                    <img src={profile.image} alt={profile.fullName} className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted text-6xl font-display bg-bg-surface-raised">
                      {profile?.fullName?.charAt(0) || 'N'}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Floating Pills */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -left-12 md:-left-20 top-1/4 z-10"
            >
              <motion.div
                animate={{ y: [0, -10, 0, 8, 0], x: [0, -5, 0, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="border border-accent-pending/40 bg-bg-surface px-4 py-2 rounded-md shadow-lg flex items-center gap-2 backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-pending"></span>
                <span className="text-xs font-mono text-text-primary font-medium">IEEE Published</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="absolute -right-4 md:-right-10 top-10 z-10"
            >
              <motion.div
                animate={{ y: [0, 12, 0, -8, 0], x: [0, 5, 0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="border border-accent-pending/40 bg-bg-surface px-4 py-2 rounded-md shadow-lg flex items-center gap-2 backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-pending"></span>
                <span className="text-xs font-mono text-text-primary font-medium">CGPA 3.96 / 4.00</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10"
            >
              <motion.div
                animate={{ y: [0, -8, 0, 10, 0], x: [-50, -53, -50, -47, -50] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="border border-accent-pending/40 bg-bg-surface px-4 py-2 rounded-md shadow-lg flex items-center gap-2 backdrop-blur-md whitespace-nowrap -ml-[50%]"
                style={{ transform: "translateX(50%)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-pending"></span>
                <span className="text-xs font-mono text-text-primary font-medium">1500+ Problems Solved</span>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent-pending to-transparent"></div>
        <span className="text-[10px] font-mono tracking-[0.3em] text-text-muted uppercase">Scroll</span>
      </motion.div>
    </motion.section>
  );
}

