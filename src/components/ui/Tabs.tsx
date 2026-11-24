import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeId,
  onChange,
  className,
}) => {
  return (
    <div className={cn('flex border-b border-border-tactical w-full', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex-1 py-3 px-2 font-display uppercase text-xs tracking-wider font-bold transition-all relative flex items-center justify-center gap-1.5 min-h-[44px]',
              isActive ? 'text-tactical-yellow' : 'text-text-muted hover:text-text-crisp'
            )}
          >
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.2 rounded font-sans',
                  isActive ? 'bg-tactical-yellow text-surface-charcoal' : 'bg-surface-elevated text-text-muted'
                )}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-tactical-yellow shadow-[0_0_8px_#FFCC00]" />
            )}
          </button>
        );
      })}
    </div>
  );
};
