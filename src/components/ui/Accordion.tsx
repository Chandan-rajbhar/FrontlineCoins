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
    <div className="rounded-[10px] bg-white border border-[#D9DCC8] overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-[14px] flex items-center justify-between text-left font-display uppercase tracking-[0.03em] text-[13.5px] font-semibold text-[#1B1C16] min-h-[44px] hover:text-[#4A5A1E] transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            'w-[16px] h-[16px] text-[#4A5A1E] stroke-[2.5] transition-transform duration-200 shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <div className="px-[14px] pb-[14px] font-sans text-[12.5px] text-[#5E6350] leading-relaxed border-t border-[#D9DCC8]/60 pt-[10px]">
          {children}
        </div>
      )}
    </div>
  );
};
