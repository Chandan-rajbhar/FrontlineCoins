import React from 'react';
import { cn } from '../../utils/cn';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  active = false,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        'h-[34px] px-[12px] rounded-[6px] text-[13px] font-sans font-medium whitespace-nowrap transition-all shrink-0 inline-flex items-center select-none border',
        active
          ? 'bg-[#E7ECD2] border-[#4A5A1E] text-[#1B1C16] gap-[6px]'
          : 'bg-white border-[#D9DCC8] text-[#1B1C16] hover:border-[#4A5A1E]/50',
        className
      )}
      {...props}
    >
      {active && (
        <span className="w-[6px] h-[6px] rounded-full bg-[#FFCC00] border border-[#4A5A1E] shrink-0" />
      )}
      <span>{children}</span>
    </button>
  );
};
