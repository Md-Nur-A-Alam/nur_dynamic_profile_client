import React from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Research from '@/components/sections/Research';
import Certifications from '@/components/sections/Certifications';
import Achievements from '@/components/sections/Achievements';
import Competitive from '@/components/sections/Competitive';
import ExtraCurricular from '@/components/sections/ExtraCurricular';
import References from '@/components/sections/References';
import Contact from '@/components/sections/Contact';

async function fetchCollection(collectionName) {
  try {
    const baseUrl = process.env.SERVER_BASE_URL;
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
    documents,
    currentWork,
    headlineStats,
    competitiveAchievements,
    publications,
    training,
    honoursAndAwards,
    leadershipRoles,
    academicReferences
  ] = await Promise.all([
    fetchCollection('profile'),
    fetchCollection('personalDetails'),
    fetchCollection('skills'),
    fetchCollection('experience'),
    fetchCollection('education'),
    fetchCollection('projects'),
    fetchCollection('contact'),
    fetchCollection('documents'),
    fetchCollection('currentWork'),
    fetchCollection('headlineStats'),
    fetchCollection('competitiveAchievements'),
    fetchCollection('publications'),
    fetchCollection('training'),
    fetchCollection('honoursAndAwards'),
    fetchCollection('leadershipRoles'),
    fetchCollection('academicReferences')
  ]);

  return (
    <div className="flex flex-col w-full">
      <Hero profile={profile?.[0]} documents={documents} />
      <About
        details={personalDetails}
        currentWork={currentWork}
        stats={headlineStats}
        experience={experience}
        education={education}
        competitiveAchievements={competitiveAchievements}
        publications={publications}
        training={training}
        honoursAndAwards={honoursAndAwards}
      />
      <Experience experience={experience} />
      <Education education={education} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Research publications={publications} />
      <Certifications training={training} />
      <Achievements achievements={honoursAndAwards} />
      <Competitive achievements={competitiveAchievements} />
      <ExtraCurricular leadershipRoles={leadershipRoles} />
      <References references={academicReferences} />
      <Contact contactInfo={contact} />
    </div>
  );
}
