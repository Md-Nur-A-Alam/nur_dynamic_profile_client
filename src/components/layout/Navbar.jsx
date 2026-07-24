'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
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
              className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-accepted rounded-sm"
            >
              {l.name}
            </Link>
          ))}
          <div className="ml-2 pl-4 border-l border-border-subtle">
            <ThemeToggle />
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
              className="text-base font-medium text-text-muted hover:text-text-primary block py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-accepted rounded-sm"
            >
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
