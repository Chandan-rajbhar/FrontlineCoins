import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="font-display text-xs text-text-crisp uppercase tracking-wider font-semibold"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'h-11 px-3 bg-surface-charcoal border border-border-tactical rounded-[6px] text-text-crisp text-xs font-sans placeholder:text-text-muted focus:outline-none focus:border-tactical-yellow focus:ring-1 focus:ring-tactical-yellow transition-colors min-h-[44px]',
          error && 'border-alert-red focus:border-alert-red focus:ring-alert-red',
          className
        )}
        {...props}
      />
      {error && <span className="font-sans text-[11px] text-alert-red">{error}</span>}
    </div>
  );
};
