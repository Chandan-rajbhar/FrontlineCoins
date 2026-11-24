import React from 'react';

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex justify-between items-center text-xs font-display uppercase tracking-wider">
        <span className="text-tactical-yellow font-bold">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-text-muted">{percent}% Assembled</span>
      </div>
      <div className="w-full h-1.5 bg-surface-charcoal rounded-full overflow-hidden border border-border-tactical">
        <div
          className="h-full bg-tactical-yellow transition-all duration-300 shadow-[0_0_8px_#FFCC00]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
