import React from 'react';

export const StarTicker: React.FC = () => {
  return (
    <div
      className="mx-[12px] h-[34px] rounded-[8px] bg-[#4A5A1E] flex items-center justify-center gap-[8px] select-none px-[10px] overflow-hidden shrink-0"
      aria-label="Verified federal vendor announcement"
    >
      <span className="text-[#FFCC00] text-[11px] leading-none shrink-0">★</span>
      <span className="text-white text-[10.5px] font-sans font-bold tracking-[0.03em] whitespace-nowrap text-center">
        A verified and approved vendor for the U.S. Federal Government
      </span>
      <span className="text-[#FFCC00] text-[11px] leading-none shrink-0">★</span>
    </div>
  );
};
