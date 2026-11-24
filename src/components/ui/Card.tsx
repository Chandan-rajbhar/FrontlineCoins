import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  interactive = false,
  ...props
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-[10px]',
    md: 'p-[14px]',
    lg: 'p-[16px]',
  };

  return (
    <div
      className={cn(
        'rounded-[10px] bg-white border border-[#D9DCC8] transition-all',
        paddings[padding],
        interactive && 'cursor-pointer hover:border-[#4A5A1E]/60',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
