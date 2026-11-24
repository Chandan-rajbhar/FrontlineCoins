import React from 'react';
import { cn } from '../../utils/cn';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  badge?: number | boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  className,
  badge,
  size = 'md',
  ...props
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11 min-h-[44px] min-w-[44px]',
    lg: 'w-12 h-12',
  };

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg text-text-muted hover:text-tactical-yellow hover:bg-surface-elevated transition-colors focus:outline-none focus:ring-1 focus:ring-tactical-yellow select-none',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
      {badge && (
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-tactical-yellow ring-2 ring-surface-charcoal" />
      )}
    </button>
  );
};
