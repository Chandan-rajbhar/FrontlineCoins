import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Package, RotateCcw, ChevronRight } from 'lucide-react';
import { HeaderCard } from '../../components/domain/HeaderCard';
import { StarTicker } from '../../components/layout/StarTicker';
import { ActiveOrderCard } from '../../components/domain/ActiveOrderCard';
import { Chip } from '../../components/ui/Chip';
import { mockProducts } from '../../data/products';

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

const whyItems = [
  {
    num: '01',
    title: 'Free design changes',
    description: 'Unlimited revisions until it looks right.',
  },
  {
    num: '02',
    title: 'No mold fees',
    description: 'No setup costs, ever.',
  },
  {
    num: '03',
    title: 'Fast production',
    description: 'Quick turnaround for events and fundraisers.',
  },
  {
    num: '04',
    title: 'Built by those who serve',
    description: 'Made by people from the communities we serve.',
  },
];

const howItWorksSteps = [
  'Share your idea',
  'We design it',
  'Approve and produce',
  'Delivered to you',
];

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('challenge-coins');

  const handleChipClick = (slug: string) => {
    setSelectedCategory(slug);
    navigate(`/shop?category=${slug}`);
  };

  // 4 clean mock featured coins
  const featuredCoins = mockProducts.slice(0, 4);

  return (
    <div className="flex flex-col w-full bg-[#F4F3EA] pb-[20px]">
      {/* 1. HeaderCard */}
      <HeaderCard />

      {/* 2. Star Ticker: Inset matching header card size */}
      <div className="mt-[12px] w-full">
        <StarTicker />
      </div>

      {/* 3. Quick Actions: 3-column grid, reduced height */}
      <section className="pt-[14px] px-[12px] grid grid-cols-3 gap-[8px]" aria-label="Quick actions">
        <button
          type="button"
          onClick={() => navigate('/quote')}
          className="bg-white border border-[#D9DCC8] rounded-[10px] px-[10px] py-[8px] flex flex-col items-start gap-[6px] text-left hover:border-[#4A5A1E] transition-colors cursor-pointer"
        >
          <FileText className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[1.8] shrink-0" />
          <span className="font-sans font-bold text-[12px] leading-[15px] text-[#1B1C16]">
            Start a quote
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/orders')}
          className="bg-white border border-[#D9DCC8] rounded-[10px] px-[10px] py-[8px] flex flex-col items-start gap-[6px] text-left hover:border-[#4A5A1E] transition-colors cursor-pointer"
        >
          <Package className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[1.8] shrink-0" />
          <span className="font-sans font-bold text-[12px] leading-[15px] text-[#1B1C16]">
            Track an order
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/account')}
          className="bg-white border border-[#D9DCC8] rounded-[10px] px-[10px] py-[8px] flex flex-col items-start gap-[6px] text-left hover:border-[#4A5A1E] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-[18px] h-[18px] text-[#4A5A1E] stroke-[1.8] shrink-0" />
          <span className="font-sans font-bold text-[12px] leading-[15px] text-[#1B1C16]">
            Reorder a design
          </span>
        </button>
      </section>

      {/* 4. Active Order Card */}
      <section className="pt-[16px] px-[12px]">
        <ActiveOrderCard />
      </section>

      {/* 5. Shop by Category: section title with "View all" link; single row with horizontal scrolling */}
      <section className="pt-[24px] px-[12px] flex flex-col gap-[12px]">
        <div className="flex items-baseline justify-between w-full">
          <h2 className="font-display font-semibold text-[20px] leading-[26px] uppercase tracking-[0.02em] text-[#1B1C16]">
            Shop by category
          </h2>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="font-sans text-[13px] font-medium text-[#4A5A1E] hover:underline cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="flex flex-nowrap gap-[8px] overflow-x-auto no-scrollbar scroll-smooth -mx-[12px] px-[12px] pb-1">
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

      {/* 6. Featured Coins: 2 cards in a row and another two in the row below + view button to view all */}
      <section className="pt-[24px] px-[12px] flex flex-col gap-[12px]">
        <div className="flex items-baseline justify-between w-full">
          <h2 className="font-display font-semibold text-[20px] leading-[26px] uppercase tracking-[0.02em] text-[#1B1C16]">
            Featured coins
          </h2>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="font-sans text-[13px] font-medium text-[#4A5A1E] hover:underline cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 gap-[10px]">
          {featuredCoins.map((coin) => (
            <button
              key={coin.id}
              type="button"
              onClick={() => navigate(`/product/${coin.id}`)}
              className="bg-white border border-[#D9DCC8] rounded-[10px] overflow-hidden text-left hover:border-[#4A5A1E] transition-colors cursor-pointer group flex flex-col"
            >
              <img
                src={coin.images[0]}
                alt={coin.name}
                className="w-full h-[108px] object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="p-[10px] flex flex-col flex-1">
                <div className="h-[34px] flex items-start">
                  <h3 className="line-clamp-2 font-sans font-bold text-[13px] leading-[17px] text-[#1B1C16]">
                    {coin.name}
                  </h3>
                </div>
                <span className="font-sans text-[12px] leading-[16px] text-[#5E6350] mt-[4px]">
                  {coin.specs.size} · {coin.specs.plating}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 7. Why Frontline: Clean 2x2 individual cards with prominent olive number badges */}
      <section className="pt-[24px] px-[12px] flex flex-col gap-[12px]">
        <h2 className="font-display font-semibold text-[20px] leading-[26px] uppercase tracking-[0.02em] text-[#1B1C16]">
          Why Frontline
        </h2>

        <div className="grid grid-cols-2 gap-[8px]">
          {whyItems.map((item) => (
            <div
              key={item.num}
              className="bg-white border border-[#D9DCC8] rounded-[10px] p-[12px] flex flex-col justify-between min-h-[116px] hover:border-[#4A5A1E] transition-colors"
            >
              <div className="w-[32px] h-[32px] rounded-[6px] bg-[#E7ECD2] flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-[16px] text-[#4A5A1E] leading-none">
                  {item.num}
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-sans font-bold text-[13px] leading-[17px] text-[#1B1C16]">
                  {item.title}
                </h4>
                <p className="font-sans text-[11.5px] leading-[15px] text-[#5E6350] mt-[3px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. How It Works: Card-based stepper with circular badges */}
      <section className="pt-[24px] px-[12px] flex flex-col gap-[14px]">
        <h2 className="font-display font-semibold text-[20px] leading-[26px] uppercase tracking-[0.02em] text-[#1B1C16]">
          How it works
        </h2>

        <div className="relative">
          {/* Subtle connecting line across cards on larger screens */}
          <div className="hidden sm:block absolute top-1/2 left-[8%] right-[8%] -translate-y-1/2 border-t-2 border-dashed border-[#D9DCC8] pointer-events-none z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[8px] relative z-10">
            {howItWorksSteps.map((step, idx) => (
              <div
                key={step}
                className="bg-white border border-[#D9DCC8] rounded-[10px] p-[12px] flex sm:flex-col items-center sm:text-center gap-[10px] sm:gap-[8px] hover:border-[#4A5A1E] transition-colors min-h-[58px]"
              >
                <div className="w-[28px] h-[28px] rounded-full bg-[#4A5A1E] text-white flex items-center justify-center font-display font-bold text-[13px] shrink-0 shadow-sm">
                  {idx + 1}
                </div>
                <span className="font-sans font-bold text-[12.5px] leading-[16px] text-[#1B1C16]">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Fundraising with Coins: Prominent promotional card with distinct CTA */}
      <section className="pt-[24px] px-[12px]">
        <div className="bg-[#E7ECD2] border border-[#C9CDB4] rounded-[12px] p-[16px] flex flex-col gap-[10px] relative overflow-hidden shadow-subtle">
          <div className="flex items-center justify-between w-full">
            <span className="font-display font-semibold text-[11px] uppercase tracking-wider text-[#3D4C11] bg-white/70 border border-[#C9CDB4] px-2 py-0.5 rounded-[4px]">
              Unit Programs
            </span>
          </div>

          <div className="flex flex-col gap-[4px]">
            <h3 className="font-display font-bold text-[20px] leading-[24px] uppercase tracking-[0.02em] text-[#1B1C16]">
              Fundraising with Coins
            </h3>
            <p className="font-sans text-[13px] leading-[18px] text-[#3A3D2E]">
              Sell custom coins to supporters and raise money for your unit or cause.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/quote')}
            className="h-[40px] px-[18px] rounded-[6px] bg-[#4A5A1E] text-white font-display font-semibold text-[13px] uppercase tracking-[0.06em] hover:bg-[#3D4C11] active:translate-y-[1px] transition-all flex items-center justify-center gap-[6px] self-start shadow-sm cursor-pointer mt-1"
          >
            <span>Start a campaign</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
