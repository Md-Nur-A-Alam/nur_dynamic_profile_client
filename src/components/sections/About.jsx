import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

export default function About({ details, currentWork, stats, experience, education, competitiveAchievements, publications, training, honoursAndAwards }) {
  // Use first personal details entry
  const data = details?.[0] || {};

  const trainingItems = Array.isArray(training) && training.length > 0 ? training.slice(0, 4) : [
    { domain: "Web Development", provider: "Programming Hero" },
    { domain: "Competitive Programming", provider: "CPS Academy" }
  ];

  const awardItems = Array.isArray(honoursAndAwards) && honoursAndAwards.length > 0 ? honoursAndAwards.slice(0, 4) : [
    { title: "Chancellor Award / University Gold Medal", notes: "Final CGPA 3.96/4.00" },
    { title: "Champion, BAUST Intra-University Programming Contest", notes: null }
  ];

  const currentWorkData = currentWork?.[0] || {
    title: "Privacce Labs",
    role: "AI Software Engineer Intern",
    summary: "CueKeep - Caregiver-facing RAG mobile application",
    techStack: ['React Native', 'Expo SDK 54', 'Zustand', 'React Query', 'FastAPI', 'RAG'],
    status: "In Progress"
  };

  const generateTimeline = () => {
    // Initialize with foundational historical events
    const events = [
      { date: new Date(2016, 0), yearStr: "2016", desc: "Started teaching math & competitive programming" },
      { date: new Date(2017, 0), yearStr: "2017", desc: "SSC · GPA 4.82 | Satkhira Govt. High School" },
      { date: new Date(2019, 0), yearStr: "2019", desc: "HSC · GPA 4.25 | Started freelancing (Fiverr)" },
      { date: new Date(2021, 0), yearStr: "2021", desc: "Joined BAUST CSE - Bangladesh Army University" },
      { date: new Date(2023, 0), yearStr: "2023", desc: "1st Runner-up · National Math Olympiad, Rangpur Region" }
    ];

    // 1. Education
    if (Array.isArray(education)) {
      education.forEach(edu => {
        if (edu.passingYear) {
          events.push({
            date: new Date(edu.passingYear, 0),
            yearStr: edu.passingYear.toString(),
            desc: `${edu.exam} · ${edu.result} | ${edu.institution}`
          });
        }
      });
    }

    // 2. Experience
    if (Array.isArray(experience)) {
      experience.forEach(exp => {
        if (exp.startDate) {
          const d = new Date(exp.startDate);
          const year = d.getFullYear();
          const month = d.toLocaleString('default', { month: 'short' });
          events.push({
            date: d,
            yearStr: exp.current ? `${year} Present` : `${year} ${month}`,
            desc: `${exp.role} · ${exp.organization}`
          });
        }
      });
    }

    // 3. Publications
    if (Array.isArray(publications)) {
      publications.forEach(pub => {
        if (pub.year) {
          events.push({
            date: new Date(pub.year, 3), // default to April
            yearStr: `${pub.year} Apr`,
            desc: `Publication: ${pub.title.split(':')[0]}`
          });
        }
      });
    }

    // 4. Competitive Achievements
    if (Array.isArray(competitiveAchievements)) {
      competitiveAchievements.forEach(ach => {
        const yearMatch = ach.competitionOrPlatform?.match(/20\d{2}/);
        if (yearMatch) {
          const year = parseInt(yearMatch[0], 10);
          events.push({
            date: new Date(year, 0),
            yearStr: ach.competitionOrPlatform.includes('Jan') ? `${year} Jan` : year.toString(),
            desc: `${ach.result} · ${ach.competitionOrPlatform}`
          });
        } else if (ach.competitionOrPlatform?.includes("Intra-University")) {
          events.push({
            date: new Date(2021, 0),
            yearStr: "2021",
            desc: `${ach.result} · ${ach.competitionOrPlatform}`
          });
        }
      });
    }

    // Sort ascending
    events.sort((a, b) => a.date - b.date);

    // Filter duplicates by description to prevent overlaps (e.g. BAUST from DB and Static)
    const uniqueEvents = [];
    const seenDesc = new Set();

    events.forEach(e => {
      // Normalize description for matching
      const descKey = e.desc.toLowerCase().substring(0, 20);
      if (!seenDesc.has(descKey)) {
        seenDesc.add(descKey);
        uniqueEvents.push(e);
      }
    });

    // Keep up to 15 items so the static and dynamic both fit beautifully
    const filteredEvents = uniqueEvents.slice(-15);

    if (filteredEvents.length === 0) {
      return [];
    }

    return filteredEvents.map(e => ({ year: e.yearStr, desc: e.desc }));
  };

  const timelineItems = generateTimeline();

  const dbStats = stats?.[0];
  
  // Dynamically generate stats so admin can add/remove fields freely
  const generateStatsItems = (statsObj) => {
    if (!statsObj) {
      // Fallback
      return [
        { value: "1500+", label: "Problems Solved" },
        { value: "3.96", label: "CGPA" },
        { value: "4", label: "IEEE Papers" },
        { value: "70+", label: "Contests" },
        { value: "1483", label: "CF Rating" },
        { value: "1%", label: "Beecrowd Rank" },
      ];
    }

    const items = [];
    const ignoredKeys = ['_id', 'visibility', 'createdAt', 'updatedAt', '__v'];

    // Helper to beautifully format camelCase keys if admin forgets to use spaces
    const formatLabel = (key) => {
      if (key.includes(' ') || key === key.toUpperCase()) return key; // already formatted or acronym
      const result = key.replace(/([A-Z])/g, " $1").trim();
      return result.charAt(0).toUpperCase() + result.slice(1);
    };

    for (const [key, value] of Object.entries(statsObj)) {
      if (!ignoredKeys.includes(key)) {
        // Automatically append '+' if needed based on typical logic, or just trust the DB string
        items.push({
          label: formatLabel(key),
          value: String(value)
        });
      }
    }
    
    // Sort them so they look consistent, or leave as DB order. 
    return items;
  };

  const statsItems = generateStatsItems(dbStats);

  const researchInterests = [
    "AI", "Machine Learning", "Deep Learning", "Image Processing",
    "Bangla NLP", "Lightweight CNN", "Edge AI", "Frontend Architecture"
  ];

  const defaultBio = `I am a Computer Science graduate from BAUST — Bangladesh Army University of Science and Technology — with a near-perfect CGPA of 3.96. My journey started not in a classroom but at a chalkboard at age 16, teaching mathematics. Since then I have competed internationally in programming, published in IEEE, built full-stack systems, and am now building my project ${currentWorkData.title} as ${currentWorkData.role}.`;

  return (
    <section id="about" className="py-16 md:py-28 bg-bg-base">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal>
          <div className="mb-8 text-text-muted font-mono text-sm tracking-tight">
            // 02 — about
          </div>
          {/* Section Header */}
          <div className="flex flex-col items-start mb-12">
            <div className="flex items-start gap-2 relative">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-pending mt-3 absolute -left-4"></span>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-text-primary tracking-tight">
                The Story Behind the Code
              </h2>
            </div>
            {/* Decorative circles */}
            <div className="w-8 h-8 rounded-full border border-border-subtle mt-6 ml-16 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border border-border-subtle/50"></div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-20">
            {statsItems.map((stat, idx) => (
              <div key={idx} className="bg-bg-surface rounded-xl p-4 md:p-6 border border-border-subtle shadow-lg hover:border-accent-pending/30 transition-colors">
                <div className="text-2xl md:text-3xl font-display text-accent-pending mb-3">{stat.value}</div>
                <div className="text-[10px] md:text-xs font-mono tracking-widest text-text-muted uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content Columns */}
          <div className="grid md:grid-cols-12 gap-12 md:gap-20">

            {/* Left Column - Timeline */}
            <div className="md:col-span-5 relative">
              <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-accent-pending/20"></div>

              <div className="space-y-10">
                {timelineItems.map((item, idx) => (
                  <div key={idx} className="relative pl-8">
                    <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-bg-base border-[2px] border-accent-pending shadow-[0_0_8px_var(--accent-pending)]"></span>
                    <div className="text-xs font-mono font-bold text-accent-pending mb-2 tracking-wider">{item.year}</div>
                    <div className="text-sm text-text-muted font-mono leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Bio & Cards */}
            <div className="md:col-span-7 flex flex-col pt-2 md:pt-0">

              <p className="text-text-primary text-base md:text-lg font-display leading-loose mb-12 text-justify">
                {data.bio || defaultBio}
              </p>

              {/* Currently Building Card */}
              <div className="border-l-2 border-accent-pending bg-bg-surface rounded-r-xl p-6 md:p-8 mb-12 shadow-xl relative overflow-hidden">
                {/* Subtle gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-pending opacity-[0.02] rounded-full blur-2xl"></div>

                <h3 className="text-[10px] md:text-xs font-mono text-accent-pending tracking-[0.2em] uppercase mb-4 font-bold">Currently Building</h3>

                <h4 className="text-2xl font-display text-text-primary font-medium mb-1">{currentWorkData.title}</h4>
                <div className="text-sm font-mono text-text-primary font-semibold mb-4 tracking-wide">{currentWorkData.role}</div>

                <p className="text-sm text-text-muted font-mono mb-6">{currentWorkData.summary}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {currentWorkData.techStack?.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded bg-bg-base border border-border-subtle text-text-muted text-[10px] md:text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-auto">
                  <span className="w-2 h-2 rounded-full bg-accent-accepted shadow-[0_0_8px_rgba(47,217,138,0.5)]"></span>
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">{currentWorkData.status || "In Progress"}</span>
                </div>
              </div>

              {/* Research Interests */}
              <div>
                <h3 className="text-[10px] md:text-xs font-mono text-accent-pending tracking-[0.2em] uppercase mb-5 font-bold">Research Interests</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {researchInterests.map(interest => (
                    <div key={interest} className="px-3 md:px-4 py-1.5 md:py-2 rounded-md bg-bg-surface border border-border-subtle text-text-primary text-[10px] md:text-xs font-mono hover:border-accent-pending/50 transition-colors cursor-default">
                      {interest}
                    </div>
                  ))}
                </div>
              </div>

              {/* Training & Certifications Summary */}
              <div className="mt-12">
                <h3 className="text-[10px] md:text-xs font-mono text-accent-pending tracking-[0.2em] uppercase mb-5 font-bold">Certifications & Training</h3>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">

                  {/* Training Block */}
                  <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 hover:border-accent-pending/30 transition-colors shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-info opacity-[0.02] rounded-full blur-2xl group-hover:opacity-[0.05] transition-opacity"></div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 rounded-full bg-accent-info shadow-[0_0_8px_var(--accent-info)]"></span>
                      <h4 className="text-sm font-display text-text-primary font-semibold">Specialized Training</h4>
                    </div>
                    <div className="space-y-4">
                      {trainingItems.map((item, idx) => (
                        <div key={idx} className="relative pl-4 border-l border-border-subtle hover:border-accent-info transition-colors">
                          <div className="text-xs font-mono text-text-primary mb-1">{item.domain}</div>
                          <div className="text-[10px] font-mono text-text-muted">{item.provider}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications / Awards Block */}
                  <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 hover:border-accent-pending/30 transition-colors shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-accepted opacity-[0.02] rounded-full blur-2xl group-hover:opacity-[0.05] transition-opacity"></div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 rounded-full bg-accent-accepted shadow-[0_0_8px_var(--accent-accepted)]"></span>
                      <h4 className="text-sm font-display text-text-primary font-semibold">Awards & Certs</h4>
                    </div>
                    <div className="space-y-4">
                      {awardItems.map((item, idx) => (
                        <div key={idx} className="relative pl-4 border-l border-border-subtle hover:border-accent-accepted transition-colors">
                          <div className="text-xs font-mono text-text-primary mb-1 line-clamp-2 leading-relaxed">{item.title}</div>
                          {item.notes && <div className="text-[10px] font-mono text-text-muted line-clamp-1">{item.notes}</div>}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
