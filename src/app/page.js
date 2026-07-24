import React from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

async function fetchCollection(collectionName) {
  try {
    const baseUrl = process.env.SERVER_BASE_URL || 'http://localhost:8000';
    const res = await fetch(`${baseUrl}/api/portfolio/${collectionName}`, { 
      next: { revalidate: 60 } 
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch ${collectionName}:`, error);
    return null;
  }
}

export default async function Home() {
  // Parallel fetch for speed
  const [
    profile, 
    personalDetails, 
    skills, 
    experience, 
    education, 
    projects, 
    contact,
    documents
  ] = await Promise.all([
    fetchCollection('profile'),
    fetchCollection('personalDetails'),
    fetchCollection('skills'),
    fetchCollection('experience'),
    fetchCollection('education'),
    fetchCollection('projects'),
    fetchCollection('contact'),
    fetchCollection('documents')
  ]);

  return (
    <div className="flex flex-col w-full">
      <Hero profile={profile?.[0]} documents={documents} />
      <About details={personalDetails} />
      <Skills skills={skills} />
      <Experience experience={experience} />
      <Education education={education} />
      <Projects projects={projects} />
      <Contact contactInfo={contact} />
    </div>
  );
}
