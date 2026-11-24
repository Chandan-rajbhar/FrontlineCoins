import React from 'react';
import { Card } from '../ui/Card';

interface QuoteStepProps {
  stepNumber: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const QuoteStep: React.FC<QuoteStepProps> = ({
  stepNumber,
  title,
  subtitle,
  children,
}) => {
  return (
    <Card padding="md" className="flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-border-tactical pb-2.5">
        <div className="w-6 h-6 rounded-full bg-tactical-yellow text-surface-charcoal font-display text-xs font-bold flex items-center justify-center shrink-0">
          {stepNumber}
        </div>
        <div className="flex flex-col text-left min-w-0">
          <h3 className="font-display text-xs uppercase font-bold text-text-crisp tracking-wider truncate">
            {title}
          </h3>
          <span className="font-sans text-[11px] text-text-muted truncate">
            {subtitle}
          </span>
        </div>
      </div>
      <div className="w-full pt-1">{children}</div>
    </Card>
  );
};
