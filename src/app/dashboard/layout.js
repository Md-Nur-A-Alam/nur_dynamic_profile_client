"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (!session || !session.user || session.user.role !== 'admin') {
        router.push('/login');
      }
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <div className="min-h-screen flex items-center justify-center bg-bg-base text-text-primary">Loading dashboard...</div>;
  }

  if (!session || !session.user || session.user.role !== 'admin') {
    return null; // Will redirect in useEffect
  }

  const collections = [
    'profile', 'personalDetails', 'addresses', 'family', 'headlineStats',
    'education', 'skills', 'experience', 'employmentCompensation', 'training',
    'projects', 'publications', 'researchProfiles', 'onlineProfiles', 'competitiveAchievements',
    'honoursAndAwards', 'leadershipRoles', 'committeeParticipation', 'languages',
    'contact', 'academicReferences', 'applications', 'images', 'documents', 'siteMeta'
  ];

  return (
    <div className="flex min-h-screen bg-bg-base">
      <aside className="w-64 bg-surface border-r border-border-subtle flex flex-col h-screen sticky top-0 overflow-y-auto">
        <div className="p-4 border-b border-border-subtle">
          <h2 className="text-xl font-bold font-mono text-accent-accepted">Admin_Dash</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <div className="mb-4">
            <p className="px-2 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Social & Content</p>
            <Link href="/dashboard/posts" className="block px-2 py-1 text-sm text-text-primary hover:bg-surface-raised rounded">Posts</Link>
            <Link href="/dashboard/comments" className="block px-2 py-1 text-sm text-text-primary hover:bg-surface-raised rounded">Comments</Link>
            <Link href="/dashboard/reactions" className="block px-2 py-1 text-sm text-text-primary hover:bg-surface-raised rounded">Reactions</Link>
          </div>
          <div>
            <p className="px-2 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Portfolio Data</p>
            {collections.map(col => (
              <Link key={col} href={`/dashboard/portfolio/${col}`} className="block px-2 py-1 text-sm text-text-primary hover:bg-surface-raised rounded capitalize">
                {col}
              </Link>
            ))}
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
