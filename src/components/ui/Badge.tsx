import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'yellow' | 'olive' | 'muted' | 'red';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'yellow',
  size = 'sm',
  ...props
}) => {
  const variants = {
    yellow: 'bg-tactical-yellow/20 text-tactical-yellow border-tactical-yellow/40',
    olive: 'bg-primary-container text-on-primary-container border-border-tactical',
    muted: 'bg-surface-elevated text-text-muted border-border-tactical',
    red: 'bg-alert-red/20 text-alert-red border-alert-red/40',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-1 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-display uppercase tracking-wider font-bold rounded border leading-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
