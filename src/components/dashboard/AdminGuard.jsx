"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export function AdminGuard({ children }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending) {
      if (!session || !session.user || session.user.role !== 'admin') {
        router.push('/login');
      }
    }
  }, [session, isPending, router]);

  if (isPending || !session || session.user.role !== 'admin') {
    return <div className="p-8 text-text-primary font-mono animate-pulse">Checking credentials...</div>;
  }

  return <>{children}</>;
}
