import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  width?: number | string;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  height,
  width,
  circle = false,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-surface-container-high/60 border border-border-tactical/30',
        circle ? 'rounded-full' : 'rounded-[6px]',
        className
      )}
      style={{
        height,
        width,
        ...style,
      }}
      {...props}
    />
  );
};
