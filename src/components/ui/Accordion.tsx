import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-[8px] bg-surface-elevated border border-border-tactical overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left font-display uppercase tracking-wider text-xs font-bold text-text-crisp min-h-[44px] hover:text-tactical-yellow transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-tactical-yellow transition-transform duration-200 shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 font-sans text-xs text-text-muted leading-relaxed border-t border-border-tactical/50 pt-3">
          {children}
        </div>
      )}
    </div>
  );
};
