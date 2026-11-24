import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Package, RotateCcw } from 'lucide-react';
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
    <div className="flex flex-col w-full bg-[#F4F3EA] pb-[88px]">
      {/* 1. HeaderCard */}
      <HeaderCard />

      {/* 2. Star Ticker (Margin-top 14px) */}
      <div className="mt-[14px] w-full">
        <StarTicker />
      </div>

      {/* 3. Quick Actions: 3-column grid, 8px gap, padding 16px 12px 0 */}
      <section className="pt-[16px] px-[12px] grid grid-cols-3 gap-[8px]" aria-label="Quick actions">
        <button
          type="button"
          onClick={() => navigate('/quote')}
          className="bg-white border border-[#D9DCC8] rounded-[10px] p-[12px] flex flex-col items-start gap-[8px] text-left hover:border-[#4A5A1E] transition-colors min-h-[44px] cursor-pointer"
        >
          <FileText className="w-[22px] h-[22px] text-[#4A5A1E] stroke-[1.8] shrink-0" />
          <span className="font-sans font-bold text-[13px] leading-[17px] text-[#1B1C16]">
            Start a quote
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/orders')}
          className="bg-white border border-[#D9DCC8] rounded-[10px] p-[12px] flex flex-col items-start gap-[8px] text-left hover:border-[#4A5A1E] transition-colors min-h-[44px] cursor-pointer"
        >
          <Package className="w-[22px] h-[22px] text-[#4A5A1E] stroke-[1.8] shrink-0" />
          <span className="font-sans font-bold text-[13px] leading-[17px] text-[#1B1C16]">
            Track an order
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/account')}
          className="bg-white border border-[#D9DCC8] rounded-[10px] p-[12px] flex flex-col items-start gap-[8px] text-left hover:border-[#4A5A1E] transition-colors min-h-[44px] cursor-pointer"
        >
          <RotateCcw className="w-[22px] h-[22px] text-[#4A5A1E] stroke-[1.8] shrink-0" />
          <span className="font-sans font-bold text-[13px] leading-[17px] text-[#1B1C16]">
            Reorder a design
          </span>
        </button>
      </section>

      {/* 4. Active Order Card */}
      <section className="pt-[24px] px-[12px]">
        <ActiveOrderCard />
      </section>

      {/* 5. Shop by Category: section title with "View all" link; wrapping chips with 8px gap */}
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

      {/* 6. Featured Coins: title with "View portfolio" link; horizontal scroll row */}
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
            View portfolio
          </button>
        </div>

        <div className="flex gap-[10px] overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-1 -mx-[12px] px-[12px]">
          {featuredCoins.map((coin) => (
            <button
              key={coin.id}
              type="button"
              onClick={() => navigate(`/product/${coin.id}`)}
              className="w-[156px] shrink-0 snap-start bg-white border border-[#D9DCC8] rounded-[10px] overflow-hidden text-left hover:border-[#4A5A1E] transition-colors cursor-pointer group flex flex-col"
            >
              <img
                src={coin.images[0]}
                alt={coin.name}
                className="w-full h-[104px] object-cover group-hover:scale-[1.02] transition-transform duration-300"
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

      {/* 7. Why Frontline: title with 1px #D9DCC8 divider between rows */}
      <section className="pt-[24px] px-[12px] flex flex-col gap-[12px]">
        <h2 className="font-display font-semibold text-[20px] leading-[26px] uppercase tracking-[0.02em] text-[#1B1C16]">
          Why Frontline
        </h2>

        <div className="border-t border-[#D9DCC8] flex flex-col">
          {whyItems.map((item) => (
            <div
              key={item.num}
              className="py-[12px] flex items-start gap-[14px] border-b border-[#D9DCC8] last:border-b-0"
            >
              <span className="w-[28px] shrink-0 font-display font-semibold text-[20px] leading-[24px] text-[#4A5A1E]">
                {item.num}
              </span>
              <div className="flex flex-col">
                <h4 className="font-sans font-bold text-[14px] leading-[18px] text-[#1B1C16]">
                  {item.title}
                </h4>
                <p className="font-sans text-[12.5px] leading-[17px] text-[#5E6350] mt-[2px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. How It Works: title, then 4 equal columns with 6px gap & connector line */}
      <section className="pt-[24px] px-[12px] flex flex-col gap-[16px]">
        <h2 className="font-display font-semibold text-[20px] leading-[26px] uppercase tracking-[0.02em] text-[#1B1C16]">
          How it works
        </h2>

        <div className="grid grid-cols-4 gap-[6px] relative">
          {/* Dashed connector line behind the rings */}
          <div className="absolute top-[15px] left-[12%] right-[12%] border-t border-dashed border-[#C9CDB4] pointer-events-none z-0" />

          {howItWorksSteps.map((step, idx) => (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div className="w-[30px] h-[30px] rounded-full border-2 border-[#4A5A1E] bg-[#F4F3EA] flex items-center justify-center font-display font-semibold text-[14px] text-[#4A5A1E] shrink-0">
                {idx + 1}
              </div>
              <span className="font-sans font-bold text-[12px] leading-[16px] text-center text-[#1B1C16] mt-[8px]">
                {step}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Fundraising Card */}
      <section className="pt-[24px] px-[12px]">
        <div className="bg-[#E7ECD2] border border-[#4A5A1E] rounded-[10px] p-[16px] flex flex-col gap-[8px]">
          <h3 className="font-display font-semibold text-[18px] leading-[24px] uppercase tracking-[0.02em] text-[#1B1C16]">
            Fundraising with coins
          </h3>
          <p className="font-sans text-[13px] leading-[18px] text-[#3A3D2E]">
            Sell custom coins to supporters and raise money for your unit or cause.
          </p>
          <button
            type="button"
            onClick={() => navigate('/quote')}
            className="font-sans font-bold text-[13px] leading-[17px] text-[#3D4C11] underline underline-offset-[3px] hover:text-[#4A5A1E] transition-colors cursor-pointer text-left self-start mt-[2px]"
          >
            Start a campaign
          </button>
        </div>
      </section>

      {/* 10. Help Card */}
      <section className="pt-[24px] px-[12px]">
        <div className="bg-white border border-[#D9DCC8] rounded-[10px] p-[14px] flex flex-col gap-[12px]">
          <div className="flex flex-col">
            <h3 className="font-sans font-bold text-[16px] leading-[20px] text-[#1B1C16]">
              Need help?
            </h3>
            <p className="font-sans text-[12.5px] leading-[16px] text-[#5E6350] mt-[2px]">
              We are available 24/7.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-[8px]">
            <a
              href="tel:+14433243900"
              aria-label="Call Frontline Coins at 443-324-3900"
              className="h-[44px] bg-white border border-[#4A5A1E] rounded-[6px] text-[#4A5A1E] font-display font-semibold text-[13px] uppercase tracking-[0.08em] flex items-center justify-center hover:bg-[#E7ECD2] transition-colors select-none cursor-pointer"
            >
              Call us
            </a>
            <a
              href="mailto:info@frontlinecoinsusa.com"
              aria-label="Email Frontline Coins"
              className="h-[44px] bg-white border border-[#4A5A1E] rounded-[6px] text-[#4A5A1E] font-display font-semibold text-[13px] uppercase tracking-[0.08em] flex items-center justify-center hover:bg-[#E7ECD2] transition-colors select-none cursor-pointer"
            >
              Email us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
