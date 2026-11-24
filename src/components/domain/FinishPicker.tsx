import React from 'react';

export interface FinishOption {
  id: string;
  name: string;
  description: string;
  colorSwatch: string;
}

interface FinishPickerProps {
  options: FinishOption[];
  selectedId: string;
  onChange: (id: string) => void;
}

export const FinishPicker: React.FC<FinishPickerProps> = ({
  options,
  selectedId,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {options.map((opt) => {
        const isSelected = opt.id === selectedId;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`p-2.5 rounded-[6px] border text-left flex items-center gap-2.5 transition-all select-none min-h-[44px] ${
              isSelected
                ? 'bg-primary-container border-tactical-yellow shadow-tactical-sm'
                : 'bg-surface-charcoal border-border-tactical hover:border-tactical-yellow/50'
            }`}
          >
            <span
              className="w-4 h-4 rounded-full border border-border-tactical shrink-0 shadow-sm"
              style={{ backgroundColor: opt.colorSwatch }}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-display text-xs uppercase font-bold text-text-crisp truncate">
                {opt.name}
              </span>
              <span className="font-sans text-[10px] text-text-muted truncate">
                {opt.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
