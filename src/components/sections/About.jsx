import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

export default function About({ details }) {
  // Use first personal details entry
  const data = details?.[0] || {};
  
  return (
    <section id="about" className="py-12 md:py-24 border-t border-border-subtle bg-bg-base">
      <div className="container mx-auto px-4 max-w-4xl">
        <Reveal>
          <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
            // 02 — about
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose prose-invert max-w-none">
              <h2 className="text-3xl font-display font-bold text-text-primary mb-6">
                Behind the Code
              </h2>
              <div className="text-lg text-text-muted space-y-4 leading-relaxed font-body">
                {data.bio ? (
                  <p>{data.bio}</p>
                ) : (
                  <p>
                    I am a highly motivated software engineer bridging the gap between elegant frontend interfaces and intelligent backend systems. My work is driven by a deep curiosity for AI research and a passion for competitive programming, which sharpens my ability to deliver highly optimized, robust solutions.
                  </p>
                )}
              </div>
            </div>
            
            <div className="md:col-span-1 border-l border-border-subtle pl-8">
              <h3 className="text-sm font-mono text-text-primary mb-4 uppercase tracking-widest">Quick Stats</h3>
              <ul className="space-y-4 text-sm font-mono text-text-muted">
                <li>
                  <span className="block text-text-primary font-semibold mb-1">Based In</span>
                  {data.homeDistrict || data.placeOfBirth || 'Dhaka, Bangladesh'}
                </li>
                <li>
                  <span className="block text-text-primary font-semibold mb-1">Education</span>
                  B.Sc. Engg. in CSE
                </li>
                <li>
                  <span className="block text-text-primary font-semibold mb-1">Languages</span>
                  {data.languages?.join(', ') || 'English, Bangla'}
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
