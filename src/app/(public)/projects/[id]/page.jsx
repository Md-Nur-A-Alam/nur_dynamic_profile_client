import React from 'react';
import Link from 'next/link';
import { FaGithub, FaVideo, FaCircleArrowLeft } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Badge } from '@/components/ui/Badge';
import { VerdictPill } from '@/components/ui/VerdictPill';
import { Reveal } from '@/components/ui/Reveal';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

async function fetchProject(id) {
  try {
    const baseUrl = process.env.SERVER_BASE_URL;
    const res = await fetch(`${baseUrl}/api/portfolio/projects/${id}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json;
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return null;
  }
}

function getEmbedUrl(url) {
  if (!url) return null;
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  if (url.includes('youtu.be/')) {
    return url.replace('youtu.be/', 'youtube.com/embed/');
  }
  return null; // Return null if it's not a recognized embed format
}

export default async function ProjectDetailsPage({ params }) {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-mono text-accent-wrong mb-4">404 - Project Not Found</h1>
        <Link href="/#projects" className="text-accent-accepted hover:underline">
          <FaCircleArrowLeft className="inline mr-2" /> Return to Home
        </Link>
      </div>
    );
  }

  const status = project.status || (project.live_link ? 'ACCEPTED' : 'PENDING');
  
  // Combine single image and gallery into one array for the carousel
  const allImages = [];
  if (project.image) allImages.push(project.image);
  if (project.gallery && Array.isArray(project.gallery)) {
    project.gallery.forEach(img => {
      if (img !== project.image) allImages.push(img);
    });
  }

  const embedUrl = getEmbedUrl(project.demoVideo);

  return (
    <div className="min-h-screen bg-bg-base pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal>
          {/* Header */}
          <div className="mb-8">
            <Link href="/#projects" className="inline-flex items-center text-sm font-mono text-text-muted hover:text-accent-accepted transition-colors mb-6">
              <FaCircleArrowLeft className="mr-2" /> back to projects
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary leading-tight">
                    {project.title}
                  </h1>
                  <VerdictPill status={status} />
                </div>
                {project.category && (
                  <div className="text-accent-accepted font-mono text-sm uppercase tracking-wider">
                    {project.category}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 shrink-0">
                {project.live_link && (
                  <a 
                    href={project.live_link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-accent-accepted/10 hover:bg-accent-accepted/20 text-accent-accepted border border-accent-accepted/30 rounded-md transition-colors font-medium text-sm"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                {project.repo_link && (
                  <a 
                    href={project.repo_link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-raised text-text-primary border border-border-subtle rounded-md transition-colors font-medium text-sm"
                  >
                    <FaGithub /> Source Code
                  </a>
                )}
                {project.demoVideo && !embedUrl && (
                  <a 
                    href={project.demoVideo} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-raised text-text-primary border border-border-subtle rounded-md transition-colors font-medium text-sm"
                  >
                    <FaVideo /> Watch Video
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Main Carousel */}
          {allImages.length > 0 && (
            <div className="mb-12">
              <ImageCarousel images={allImages} />
            </div>
          )}
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="md:col-span-2 space-y-12">
            
            <Reveal delay={0.2}>
              {/* Detailed Description */}
              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4 font-display">Overview</h2>
                <div className="text-lg text-text-muted leading-relaxed whitespace-pre-line">
                  {project.detailedDescription || project.summary || project.description}
                </div>
              </section>
            </Reveal>

            {project.features && project.features.length > 0 && (
              <Reveal delay={0.3}>
                <section>
                  <h2 className="text-2xl font-bold text-text-primary mb-6 font-display">Key Features</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="p-4 bg-surface rounded-xl border border-border-subtle hover:border-accent-accepted/50 transition-colors">
                        <div className="text-accent-accepted mb-2">✦</div>
                        <p className="text-text-primary">{feature}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}

            {project.architecture && (
              <Reveal delay={0.4}>
                <section>
                  <h2 className="text-2xl font-bold text-text-primary mb-4 font-display">Architecture</h2>
                  <div className="p-6 bg-surface-raised rounded-xl border border-border-subtle text-text-muted leading-relaxed">
                    {project.architecture}
                  </div>
                </section>
              </Reveal>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <Reveal delay={0.5}>
                <section>
                  <h2 className="text-2xl font-bold text-text-primary mb-4 font-display">Challenges Overcome</h2>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex gap-3 text-text-muted bg-surface p-4 rounded-lg border border-border-subtle">
                        <span className="text-accent-wrong shrink-0 mt-1">⚠️</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <Reveal delay={0.6}>
                <section>
                  <h2 className="text-2xl font-bold text-text-primary mb-4 font-display">Key Learnings</h2>
                  <ul className="space-y-3">
                    {project.learnings.map((learning, idx) => (
                      <li key={idx} className="flex gap-3 text-text-muted bg-surface p-4 rounded-lg border border-border-subtle">
                        <span className="text-accent-accepted shrink-0 mt-1">💡</span>
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            )}

            {embedUrl && (
              <Reveal delay={0.7}>
                <section className="mt-12">
                  <h2 className="text-2xl font-bold text-text-primary mb-6 font-display">Video Demo</h2>
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-border-subtle bg-surface">
                    <iframe 
                      src={embedUrl} 
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </section>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Reveal delay={0.3}>
              <div className="p-6 bg-surface-raised rounded-xl border border-border-subtle">
                <h3 className="text-lg font-bold text-text-primary mb-6 font-mono">Project Info</h3>
                
                <div className="space-y-6">
                  {project.role && (
                    <div>
                      <div className="text-sm text-text-muted mb-1 font-mono uppercase tracking-wider">Role</div>
                      <div className="text-text-primary font-medium">{project.role}</div>
                    </div>
                  )}
                  
                  {project.duration && (
                    <div>
                      <div className="text-sm text-text-muted mb-1 font-mono uppercase tracking-wider">Timeline</div>
                      <div className="text-text-primary font-medium">{project.duration}</div>
                    </div>
                  )}

                  {project.techStack && project.techStack.length > 0 && (
                    <div>
                      <div className="text-sm text-text-muted mb-3 font-mono uppercase tracking-wider">Technologies</div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tech => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </div>
  );
}
