import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-display uppercase transition-all select-none rounded-[6px] focus:outline-none disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-[#FFCC00] text-[#1B1C16] font-bold text-[14px] tracking-[0.1em] border-b-2 border-b-[#B38F00] border-t-0 border-l-0 border-r-0 hover:bg-[#E6B800] active:translate-y-[1px]',
    secondary:
      'bg-white border border-[#4A5A1E] text-[#4A5A1E] font-semibold text-[12px] tracking-[0.1em] hover:bg-[#E7ECD2]/40',
    ghost:
      'bg-transparent text-[#5E6350] hover:text-[#1B1C16] hover:bg-black/5 font-medium',
    danger:
      'bg-[#B3262E] text-white font-bold text-[14px] hover:bg-[#B3262E]/90',
  };

  const sizes = {
    sm: 'h-[36px] px-3',
    md: 'h-[44px] px-4',
    lg: 'h-[48px] px-6 text-[14px]',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="mr-2 inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="ml-2 inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
