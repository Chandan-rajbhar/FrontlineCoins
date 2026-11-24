import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Segmented } from '../../components/ui/Segmented';
import { Chip } from '../../components/ui/Chip';

interface DiameterOption {
  value: string;
  size: string;
  caption: string;
}

const diameterOptions: DiameterOption[] = [
  { value: '1.50', size: '1.50 in', caption: 'Compact' },
  { value: '1.75', size: '1.75 in', caption: 'Standard' },
  { value: '2.00', size: '2.00 in', caption: 'Heavyweight' },
  { value: '2.25', size: '2.25 in', caption: 'Large' },
];

const quantityOptions = [
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 250, label: '250' },
  { value: 500, label: '500+' },
];

const finishOptions = [
  { value: 'antique-brass', label: 'Antique brass' },
  { value: 'polished-gold', label: 'Polished gold' },
  { value: 'antique-silver', label: 'Antique silver' },
  { value: 'dual-plated', label: 'Dual plated' },
];

export const QuoteBuilderScreen: React.FC = () => {
  const navigate = useNavigate();

  // State matches the prototype Step 2 screen
  const [step, setStep] = useState(2);
  const [selectedDiameter, setSelectedDiameter] = useState('1.75');
  const [selectedQuantity, setSelectedQuantity] = useState(100);
  const [selectedFinish, setSelectedFinish] = useState('antique-brass');

  const stepName =
    step === 1
      ? 'Product type'
      : step === 2
      ? 'Size and quantity'
      : step === 3
      ? 'Artwork & plating'
      : 'Review & submit';

  const progressPercent = (step / 4) * 100;

  const handleNext = () => {
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      navigate('/orders');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col min-h-full justify-between bg-[#F4F3EA]">
      {/* Content area: Padding 16px 12px 0, 16px gap */}
      <div className="px-[12px] pt-[16px] pb-[20px] flex flex-col gap-[16px] w-full">
        {/* Progress block */}
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between text-[12px] text-[#5E6350] font-sans">
            <span>Step {step} of 4</span>
            <span>{stepName}</span>
          </div>
          {/* 6px track #D9DCC8 radius 3 with an olive fill (50%) */}
          <div className="w-full h-[6px] bg-[#D9DCC8] rounded-[3px] overflow-hidden mt-[6px]">
            <div
              className="h-full bg-[#4A5A1E] rounded-[3px] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Title: Challenge coin */}
        <h1 className="font-display font-bold text-[28px] leading-[32px] uppercase tracking-[0.02em] text-[#1B1C16]">
          Challenge coin
        </h1>

        {/* DIAMETER Section */}
        <div className="flex flex-col gap-[8px]">
          <span className="font-display font-semibold text-[14px] uppercase tracking-[0.08em] text-[#3A3D2E]">
            Diameter
          </span>
          {/* 2x2 grid, 8px gap */}
          <div className="grid grid-cols-2 gap-[8px]">
            {diameterOptions.map((opt) => {
              const isSelected = selectedDiameter === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedDiameter(opt.value)}
                  className={`h-[68px] px-[12px] py-[10px] rounded-[8px] flex flex-col justify-center text-left transition-all select-none ${
                    isSelected
                      ? 'bg-[#E7ECD2] border-2 border-[#4A5A1E]'
                      : 'bg-white border border-[#D9DCC8] hover:border-[#4A5A1E]/50'
                  }`}
                >
                  <span className="font-display font-semibold text-[22px] leading-[26px] text-[#1B1C16]">
                    {opt.size}
                  </span>
                  <span className="font-sans text-[12px] leading-[16px] text-[#5E6350]">
                    {opt.caption}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* QUANTITY Section */}
        <div className="flex flex-col gap-[8px]">
          <span className="font-display font-semibold text-[14px] uppercase tracking-[0.08em] text-[#3A3D2E]">
            Quantity
          </span>
          {/* Segmented control: white, 1px #D9DCC8, radius 8, padding 4px, 4px gap, 4 equal 40px segments, 14px weight 700; selected: bg #4A5A1E, white text */}
          <Segmented
            options={quantityOptions}
            value={selectedQuantity}
            onChange={(val) => setSelectedQuantity(Number(val))}
          />
        </div>

        {/* FINISH Section */}
        <div className="flex flex-col gap-[8px]">
          <span className="font-display font-semibold text-[14px] uppercase tracking-[0.08em] text-[#3A3D2E]">
            Finish
          </span>
          {/* Wrapping chips */}
          <div className="flex flex-wrap gap-[8px]">
            {finishOptions.map((f) => {
              const isSelected = selectedFinish === f.value;
              return (
                <Chip
                  key={f.value}
                  active={isSelected}
                  onClick={() => setSelectedFinish(f.value)}
                >
                  {f.label}
                </Chip>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky bottom bar: 72px high, white, 1px top border #D9DCC8, padding 0 12px, space-between */}
      <div className="h-[72px] bg-white border-t border-[#D9DCC8] px-[12px] flex items-center justify-between sticky bottom-0 z-30 w-full mt-auto">
        <button
          type="button"
          onClick={handleBack}
          className="font-sans text-[14px] font-medium text-[#1B1C16] underline underline-offset-[3px] hover:text-[#4A5A1E] transition-colors"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="h-[48px] px-[28px] bg-[#FFCC00] text-[#1B1C16] font-display font-bold text-[14px] uppercase tracking-[0.1em] rounded-[6px] border-b-2 border-b-[#B38F00] hover:bg-[#E6B800] active:translate-y-[1px] transition-all flex items-center justify-center shrink-0"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
