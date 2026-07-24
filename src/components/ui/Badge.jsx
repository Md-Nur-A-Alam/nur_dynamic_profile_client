import React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border border-border-subtle bg-bg-surface-raised px-2.5 py-0.5 font-mono text-xs font-semibold text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-accepted focus:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
