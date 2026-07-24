import React from 'react';
import Link from 'next/link';
import { VerdictPill } from '@/components/ui/VerdictPill';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
// import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Reveal } from '@/components/ui/Reveal';

async function fetchProject(id) {
  try {
    const baseUrl = process.env.SERVER_BASE_URL;
    const res = await fetch(`${baseUrl}/api/portfolio/projects/${id}`, { 
      next: { revalidate: 60 } 
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch project ${id}:`, error);
    return null;
  }
}

export default async function ProjectDetailPage({ params }) {
  // Access params.id, handling dynamic route structure
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-mono text-accent-wrong mb-4">404 - Project Not Found</h1>
        <Link href="/">
          <Button variant="outline">
            <FaCircleArrowLeft className="mr-2" size={16} /> Return Home
          </Button>
        </Link>
      </div>
    );
  }

  const status = project.status || (project.liveLink ? 'ACCEPTED' : 'PENDING');

  return (
    <div className="min-h-screen bg-bg-base py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <Reveal>
          <Link href="/">
            <Button variant="ghost" className="mb-8 font-mono text-sm pl-0 hover:bg-transparent">
              <FaCircleArrowLeft className="mr-2" size={16} /> // back to root
            </Button>
          </Link>
          
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary leading-tight">
              {project.title}
            </h1>
            <VerdictPill status={status} className="mt-2" />
          </div>

          {project.image && (
            <div className="w-full h-[300px] md:h-[450px] rounded-lg overflow-hidden border border-border-subtle bg-bg-surface mb-12">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <div className="mb-4 text-text-muted font-mono text-sm tracking-tight">
                  // overview
                </div>
                <div className="prose prose-invert max-w-none text-text-muted font-body leading-relaxed text-lg">
                  <p>{project.description}</p>
                </div>
              </section>

              {/* Challenges - Terminal Motif */}
              {project.challenges && (
                <section>
                  <div className="mb-4 text-text-muted font-mono text-sm tracking-tight">
                    // retrospective
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border-subtle bg-[#0B0E14] shadow-lg w-full">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-bg-surface-raised">
                      <div className="w-3 h-3 rounded-full bg-border-subtle"></div>
                      <div className="w-3 h-3 rounded-full bg-border-subtle"></div>
                      <div className="w-3 h-3 rounded-full bg-border-subtle"></div>
                    </div>
                    <div className="p-6 font-mono text-sm text-text-primary min-h-[120px] whitespace-pre-wrap flex flex-col gap-4">
                      <div><span className="text-text-muted">/* challenges */</span></div>
                      <div className="text-text-primary leading-relaxed pl-4 border-l-2 border-border-subtle">
                        {project.challenges}
                      </div>
                      
                      {project.futureImprovements && (
                        <>
                          <div className="mt-4"><span className="text-text-muted">/* future_improvements */</span></div>
                          <div className="text-text-primary leading-relaxed pl-4 border-l-2 border-border-subtle">
                            {project.futureImprovements}
                          </div>
                        </>
                      )}
                      
                      <div className="mt-2"><span className="text-accent-accepted animate-pulse">_</span></div>
                    </div>
                  </div>
                </section>
              )}
            </div>

            <div className="md:col-span-1 space-y-8">
              {/* Tech Stack */}
              <div className="p-6 rounded-lg bg-bg-surface border border-border-subtle">
                <h3 className="font-mono text-sm uppercase tracking-widest text-text-muted mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map(tech => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.liveLink || project.clientRepo || project.serverRepo) && (
                <div className="p-6 rounded-lg bg-bg-surface border border-border-subtle flex flex-col gap-4">
                  <h3 className="font-mono text-sm uppercase tracking-widest text-text-muted mb-2">Links</h3>
                  
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="w-full">
                      <Button variant="primary" className="w-full justify-between group">
                        Live Deployment
                        <FaExternalLinkAlt size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Button>
                    </a>
                  )}
                  
                  {project.clientRepo && (
                    <a href={project.clientRepo} target="_blank" rel="noreferrer" className="w-full">
                      <Button variant="secondary" className="w-full justify-between">
                        Client Repo
                        <FaGithub size={16} />
                      </Button>
                    </a>
                  )}
                  
                  {project.serverRepo && (
                    <a href={project.serverRepo} target="_blank" rel="noreferrer" className="w-full">
                      <Button variant="secondary" className="w-full justify-between">
                        Server Repo
                        <Github size={16} />
                      </Button>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
