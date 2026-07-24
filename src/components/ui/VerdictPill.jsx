import React from 'react';
import { cn } from '@/lib/utils';

export function VerdictPill({ status, className, dotOnly = false }) {
  const normalized = status.toUpperCase();
  
  let baseColor = '';
  let label = normalized;
  
  switch (normalized) {
    case 'ACCEPTED':
    case 'PUBLISHED':
    case 'LIVE':
      baseColor = 'text-accent-accepted bg-accent-accepted/10 ring-accent-accepted/20';
      label = 'ACCEPTED';
      break;
    case 'PENDING':
    case 'IN-PROGRESS':
      baseColor = 'text-accent-pending bg-accent-pending/10 ring-accent-pending/20';
      label = 'PENDING';
      break;
    case 'WA':
    case 'DEPRECATED':
      baseColor = 'text-accent-wrong bg-accent-wrong/10 ring-accent-wrong/20';
      label = 'WA';
      break;
    case 'TLE':
    case 'FUTURE':
      baseColor = 'text-text-muted ring-border-subtle';
      label = 'TLE';
      break;
    case 'PEER-REVIEWED':
      baseColor = 'text-accent-info bg-accent-info/10 ring-accent-info/20';
      label = 'PEER-REVIEWED';
      break;
    default:
      baseColor = 'text-text-muted ring-border-subtle';
      label = normalized;
  }

  // Pulse animation for 'ACCEPTED'
  const isPulse = label === 'ACCEPTED';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-mono text-[10px] sm:text-xs font-semibold tracking-tight px-2 py-0.5 ring-1 ring-inset',
        baseColor,
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5 items-center justify-center">
        {isPulse && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {!dotOnly && <span>{label}</span>}
    </span>
  );
}
