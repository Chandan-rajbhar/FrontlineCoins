import { cn } from '../../utils/cn';

export interface SegmentedOption<T extends string | number = string> {
  value: T;
  label: string;
}

export interface SegmentedProps<T extends string | number = string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function Segmented<T extends string | number = string>({
  options,
  value,
  onChange,
  className,
}: SegmentedProps<T>) {
  return (
    <div
      className={cn(
        'w-full bg-white border border-[#D9DCC8] rounded-[8px] p-[4px] flex gap-[4px] select-none',
        className
      )}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex-1 h-[40px] rounded-[6px] text-[14px] font-sans font-bold flex items-center justify-center transition-all',
              isSelected
                ? 'bg-[#4A5A1E] text-white shadow-none'
                : 'bg-transparent text-[#1B1C16] hover:bg-[#F4F3EA]'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
