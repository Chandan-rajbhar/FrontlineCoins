import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-[8px] bg-surface-elevated border border-border-tactical">
      <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-tactical-yellow mb-3">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <h3 className="font-display text-base uppercase font-bold text-text-crisp tracking-wider mb-1">
        {title}
      </h3>
      <p className="font-sans text-xs text-text-muted max-w-xs mb-4">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
