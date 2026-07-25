import React from 'react';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface py-8 text-center mt-20">
      <div className="container mx-auto px-4">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Md. Nur A Alam. All rights reserved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
                className="text-text-muted hover:text-accent-pending hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-pending rounded-sm p-1"
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
