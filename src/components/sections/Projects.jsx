import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { VerdictPill } from '@/components/ui/VerdictPill';

export default function Projects({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-12 md:py-24 border-t border-border-subtle bg-bg-base">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mb-12 text-text-muted font-mono text-sm tracking-tight">
            // 06 — projects
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => {
              const status = project.status || (project.liveLink ? 'ACCEPTED' : 'PENDING');
              
              return (
                <Reveal key={project._id || idx} delay={idx * 0.1}>
                  <Card className="h-full flex flex-col group overflow-hidden cursor-pointer hover:border-accent-accepted transition-colors">
                    {/* Image Area */}
                    <div className="relative h-48 bg-border-subtle overflow-hidden">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono text-text-muted text-sm">
                          {project.title}
                        </div>
                      )}
                      <div className="absolute top-4 right-4 z-10">
                        <VerdictPill status={status} />
                      </div>
                    </div>
                    
                    <CardHeader className="flex-1">
                      <CardTitle className="group-hover:text-accent-accepted transition-colors">
                        <Link href={`/projects/${project._id}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-accepted rounded-sm">
                          <span className="absolute inset-0 z-0"></span>
                          {project.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mt-2">
                        {project.shortDescription || project.description}
                      </CardDescription>
                      
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border-subtle">
                        {project.techStack?.slice(0, 4).map(tech => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                        {(project.techStack?.length > 4) && (
                          <Badge>+{project.techStack.length - 4}</Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardFooter className="pt-0">
                      <span className="text-sm font-semibold text-text-primary group-hover:text-accent-accepted flex items-center transition-colors">
                        View Details 
                        <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </CardFooter>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
