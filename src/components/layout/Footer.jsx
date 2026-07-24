import React from 'react';

export default function Footer({ data }) {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Md. Nur A Alam. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          {data?.map((link) => (
            <a
              key={link.id || link._id || link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-accepted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-accepted rounded-sm p-1"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
