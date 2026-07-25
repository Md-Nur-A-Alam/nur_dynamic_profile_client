import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export default function Contact({ contactInfo }) {
  if (!contactInfo || contactInfo.length === 0) return null;
  const data = contactInfo[0];

  return (
    <section id="contact" className="py-12 md:py-24 border-t border-border-subtle bg-bg-surface">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <Reveal>
          <div className="mb-8 text-text-muted font-mono text-sm tracking-tight flex justify-center">
            // 13 — contact
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
            Let's build together.
          </h2>
          <p className="text-lg text-text-muted mb-12 max-w-2xl mx-auto font-body">
            Currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {data.email && (
              <a href={`mailto:${data.email}`}>
                <Button variant="primary" size="lg">Say Hello</Button>
              </a>
            )}

            <div className="flex items-center gap-6">
              {data.phone && (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-text-muted">Phone</span>
                  <a href={`tel:${data.phone}`} className="font-mono text-sm text-text-primary hover:text-accent-accepted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-accepted rounded-sm p-1">
                    {data.phone}
                  </a>
                </div>
              )}
              {data.whatsapp && (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-text-muted">WhatsApp</span>
                  <a href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="font-mono text-sm text-text-primary hover:text-accent-accepted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-accepted rounded-sm p-1">
                    {data.whatsapp}
                  </a>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
