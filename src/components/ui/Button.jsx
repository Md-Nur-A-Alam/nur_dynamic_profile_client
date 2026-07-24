import React from 'react';
import { cn } from '@/lib/utils';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-accepted focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-bg-base';
  
  const variants = {
    primary: 'bg-accent-accepted text-bg-base hover:bg-accent-accepted-dim',
    secondary: 'bg-bg-surface-raised text-text-primary hover:bg-border-subtle',
    outline: 'border border-border-subtle text-text-primary hover:bg-bg-surface-raised',
    ghost: 'text-text-muted hover:text-text-primary hover:bg-bg-surface-raised',
    pending: 'bg-accent-pending text-bg-base hover:bg-accent-pending/90',
  };

  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 text-sm',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
