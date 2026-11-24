import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { mockProducts } from '../../data/products';
import { ProductCard } from '../../components/domain/ProductCard';
import { Chip } from '../../components/ui/Chip';

const shopCategories = [
  { label: 'All', value: 'all' },
  { label: 'Coins', value: 'challenge-coins' },
  { label: 'Pins', value: 'lapel-pins' },
  { label: 'Badges', value: 'badges' },
  { label: 'Medals', value: 'medals' },
];

export const ShopScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const activeCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (val: string) => {
    const nextParams = new URLSearchParams(location.search);
    if (val === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', val);
    }
    const q = nextParams.toString();
    navigate(q ? `/shop?${q}` : '/shop', { replace: true });
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      if (activeCategory !== 'all' && p.categorySlug !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.specs.plating.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="px-[12px] pt-[16px] pb-[24px] flex flex-col gap-[12px] w-full bg-[#F4F3EA]">
      {/* Title */}
      <h1 className="font-display font-bold text-[28px] leading-[32px] uppercase tracking-[0.02em] text-[#1B1C16]">
        Shop
      </h1>

      {/* Search field: 44px high, white, 1px #D9DCC8, radius 6, padding 0 12px */}
      <div className="w-full h-[44px] bg-white border border-[#D9DCC8] rounded-[6px] px-[12px] flex items-center gap-[8px]">
        <Search className="w-[18px] h-[18px] text-[#5E6350] shrink-0" />
        <input
          type="text"
          placeholder="Search coins, pins, badges"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-full bg-transparent font-sans text-[14px] text-[#1B1C16] placeholder-[#5E6350] focus:outline-none"
        />
      </div>

      {/* Chip row: 8px gap, no wrapping, horizontal scroll */}
      <div className="flex gap-[8px] overflow-x-auto no-scrollbar -mx-[12px] px-[12px] py-0.5">
        {shopCategories.map((cat) => {
          const isSelected = activeCategory === cat.value;
          return (
            <Chip
              key={cat.value}
              active={isSelected}
              onClick={() => handleCategorySelect(cat.value)}
            >
              {cat.label}
            </Chip>
          );
        })}
      </div>

      {/* Product grid: 2 columns, 10px gap */}
      <div className="grid grid-cols-2 gap-[10px] w-full mt-1">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
