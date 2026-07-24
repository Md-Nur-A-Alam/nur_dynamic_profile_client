'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useSession } from '@/lib/auth-client';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { data: session } = useSession();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Scroll spy logic
      const sections = ['about', 'skills', 'experience', 'education', 'projects', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', href: '/#about', id: 'about' },
    { name: 'Skills', href: '/#skills', id: 'skills' },
    { name: 'Experience', href: '/#experience', id: 'experience' },
    { name: 'Education', href: '/#education', id: 'education' },
    { name: 'Projects', href: '/#projects', id: 'projects' },
    { name: 'Contact', href: '/#contact', id: 'contact' },
    { name: 'Posts', href: '/posts', id: 'posts' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-200 border-b',
        scrolled ? 'bg-bg-base/80 backdrop-blur-md border-border-subtle py-3' : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold font-display tracking-tight text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-accepted rounded-sm">
          Nur_A.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-accepted rounded-sm",
                activeSection === l.id ? "text-accent-accepted font-semibold" : "text-text-muted hover:text-text-primary"
              )}
            >
              {l.name}
            </Link>
          ))}
          <div className="ml-2 pl-4 border-l border-border-subtle flex items-center gap-4">
            <ThemeToggle />
            {session ? (
              <Link href="/dashboard" className="text-sm font-medium text-text-primary hover:text-accent-accepted">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="text-sm font-medium text-text-primary hover:text-accent-accepted">
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-text-primary hover:bg-bg-surface-raised rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-accepted"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg-surface border-b border-border-subtle shadow-lg py-4 flex flex-col px-4 gap-4">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-base font-medium block py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-accepted rounded-sm",
                activeSection === l.id ? "text-accent-accepted" : "text-text-muted hover:text-text-primary"
              )}
            >
              {l.name}
            </Link>
          ))}
          <div className="border-t border-border-subtle pt-2 mt-2">
            {session ? (
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-base font-medium text-text-primary block py-2">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-base font-medium text-text-primary block py-2">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
      
      {/* Scroll Progress Line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-accepted origin-left"
        style={{ scaleX }}
      />
    </header>
  );
}
