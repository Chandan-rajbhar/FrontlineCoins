import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface StepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const Stepper: React.FC<StepperProps> = ({
  value,
  onChange,
  min = 50,
  max = 10000,
  step = 50,
}) => {
  const handleDec = () => {
    if (value - step >= min) onChange(value - step);
  };
  const handleInc = () => {
    if (value + step <= max) onChange(value + step);
  };

  return (
    <div className="flex items-center bg-surface-charcoal border border-border-tactical rounded-[6px] p-1">
      <button
        type="button"
        onClick={handleDec}
        disabled={value <= min}
        className="w-9 h-9 rounded flex items-center justify-center text-text-muted hover:text-tactical-yellow disabled:opacity-30 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-16 text-center font-display text-sm font-bold text-tactical-yellow">
        {value}
      </span>
      <button
        type="button"
        onClick={handleInc}
        disabled={value >= max}
        className="w-9 h-9 rounded flex items-center justify-center text-text-muted hover:text-tactical-yellow disabled:opacity-30 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
