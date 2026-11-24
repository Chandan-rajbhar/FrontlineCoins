import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../../assets/coins-hero-clean.jpg';

export const HeaderCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative mx-[12px] mt-[12px] h-[200px] rounded-[12px] border border-[#D9DCC8] overflow-hidden select-none shrink-0"
      style={{
        clipPath: 'polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%)',
      }}
    >
      {/* Background Photo */}
      <img
        src={heroImg}
        alt="Tactical coins background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '78% 50%' }}
      />

      {/* Light Scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(244,243,234,0.97) 0%, rgba(244,243,234,0.88) 48%, rgba(244,243,234,0.1) 100%)',
        }}
      />

      {/* Inner Content anchored to the bottom with 16px padding */}
      <div className="relative z-10 h-full p-[16px] flex flex-col justify-end">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-[30px] leading-[34px] uppercase tracking-[0.02em] text-[#1B1C16] max-w-[260px]">
              Custom challenge coins
            </h1>
            <p className="font-sans text-[13px] leading-[18px] text-[#3A3D2E] mt-1">
              Free design, no mold fees, and fast production.
            </p>
          </div>

          {/* Actions: Primary yellow button + Underlined link */}
          <div className="flex items-center gap-[18px]">
            <button
              type="button"
              onClick={() => navigate('/quote')}
              className="h-[44px] px-[20px] bg-[#FFCC00] text-[#1B1C16] font-display font-bold text-[14px] uppercase tracking-[0.1em] rounded-[6px] border-b-2 border-b-[#B38F00] hover:bg-[#E6B800] active:translate-y-[1px] transition-all flex items-center justify-center shrink-0 select-none cursor-pointer"
            >
              Get a quote
            </button>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="font-sans text-[13px] font-medium text-[#1B1C16] underline underline-offset-[3px] hover:text-[#4A5A1E] transition-colors shrink-0 cursor-pointer"
            >
              Browse the shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
