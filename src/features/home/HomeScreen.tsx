import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { HeaderCard } from '../../components/domain/HeaderCard';
import { StarTicker } from '../../components/layout/StarTicker';
import { Chip } from '../../components/ui/Chip';

const categoryChips = [
  { name: 'Challenge coins', slug: 'challenge-coins' },
  { name: 'Lapel pins', slug: 'lapel-pins' },
  { name: 'Law enforcement badges', slug: 'badges' },
  { name: 'Medals', slug: 'medals' },
  { name: 'Key chains', slug: 'keychains' },
  { name: 'Bottle openers', slug: 'bottle-openers' },
  { name: 'Trail / vehicle badges', slug: 'trail-badges' },
  { name: 'Poker chips', slug: 'poker-chips' },
];

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('challenge-coins');

  const handleChipClick = (slug: string) => {
    setSelectedCategory(slug);
    navigate(`/shop?category=${slug}`);
  };

  return (
    <div className="flex flex-col w-full bg-[#F4F3EA] pb-6">
      {/* 1. HeaderCard */}
      <HeaderCard />

      {/* 2. Star Ticker (14px below the card) */}
      <div className="mt-[14px] w-full">
        <StarTicker />
      </div>

      {/* 3. Shop by Category (padding 20px 12px 0, 12px gap) */}
      <section className="px-[12px] pt-[20px] flex flex-col gap-[12px]">
        {/* Title row */}
        <div className="flex items-baseline justify-between w-full">
          <h2 className="font-display font-semibold text-[20px] leading-[26px] uppercase tracking-[0.02em] text-[#1B1C16]">
            Shop by category
          </h2>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="font-sans text-[13px] font-medium text-[#4A5A1E] hover:underline"
          >
            View all
          </button>
        </div>

        {/* Wrapping chips with 8px gap */}
        <div className="flex flex-wrap gap-[8px]">
          {categoryChips.map((chip) => {
            const isSelected = selectedCategory === chip.slug;
            return (
              <Chip
                key={chip.slug}
                active={isSelected}
                onClick={() => handleChipClick(chip.slug)}
              >
                {chip.name}
              </Chip>
            );
          })}
        </div>
      </section>

      {/* 4. Why Frontline - Flat White Cards with Olive/Yellow Accents */}
      <section className="px-[12px] pt-[24px] flex flex-col gap-[12px]">
        <h2 className="font-display font-semibold text-[18px] leading-[24px] uppercase tracking-[0.02em] text-[#1B1C16]">
          Why Frontline Coins
        </h2>

        <div className="grid grid-cols-2 gap-[10px]">
          <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[12px] flex flex-col gap-2">
            <div className="w-[36px] h-[36px] rounded-[6px] bg-[#E7ECD2] border border-[#D9DCC8] flex items-center justify-center text-[#4A5A1E] shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="font-display font-bold text-[13px] uppercase tracking-wide text-[#1B1C16] leading-snug">
              Officer Owned
            </h4>
            <p className="font-sans text-[12px] leading-[16px] text-[#5E6350]">
              Founded and operated by active &amp; veteran peace officers.
            </p>
          </div>

          <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[12px] flex flex-col gap-2">
            <div className="w-[36px] h-[36px] rounded-[6px] bg-[#E7ECD2] border border-[#D9DCC8] flex items-center justify-center text-[#4A5A1E] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-display font-bold text-[13px] uppercase tracking-wide text-[#1B1C16] leading-snug">
              Free Art &amp; Design
            </h4>
            <p className="font-sans text-[12px] leading-[16px] text-[#5E6350]">
              Complimentary photorealistic digital proofs &amp; edits.
            </p>
          </div>

          <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[12px] flex flex-col gap-2">
            <div className="w-[36px] h-[36px] rounded-[6px] bg-[#E7ECD2] border border-[#D9DCC8] flex items-center justify-center text-[#4A5A1E] shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="font-display font-bold text-[13px] uppercase tracking-wide text-[#1B1C16] leading-snug">
              No Mold Fees
            </h4>
            <p className="font-sans text-[12px] leading-[16px] text-[#5E6350]">
              Zero mold fees on qualifying custom production runs.
            </p>
          </div>

          <div className="rounded-[10px] bg-white border border-[#D9DCC8] p-[12px] flex flex-col gap-2">
            <div className="w-[36px] h-[36px] rounded-[6px] bg-[#E7ECD2] border border-[#D9DCC8] flex items-center justify-center text-[#4A5A1E] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="font-display font-bold text-[13px] uppercase tracking-wide text-[#1B1C16] leading-snug">
              Fast Turnaround
            </h4>
            <p className="font-sans text-[12px] leading-[16px] text-[#5E6350]">
              Reliable 14-day production with priority rush options.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
