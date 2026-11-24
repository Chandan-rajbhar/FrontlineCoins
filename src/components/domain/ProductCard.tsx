import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="rounded-[10px] bg-white border border-[#D9DCC8] overflow-hidden min-w-0 cursor-pointer select-none flex flex-col justify-between"
      role="button"
      tabIndex={0}
    >
      <div className="w-full">
        {/* 100px high image, full width, object-fit cover */}
        <div className="w-full h-[100px] overflow-hidden bg-[#F4F3EA]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Body padding 10px, 4px gap */}
        <div className="p-[10px] flex flex-col gap-[4px]">
          {/* Name 14px/18px weight 700 in a fixed 36px block (two lines reserved, overflow hidden) */}
          <h4 className="font-sans font-bold text-[14px] leading-[18px] text-[#1B1C16] h-[36px] overflow-hidden line-clamp-2">
            {product.name}
          </h4>

          {/* Spec 12px/16px #5E6350 (e.g. "2.0 in · Antique brass") */}
          <p className="font-sans text-[12px] leading-[16px] text-[#5E6350] truncate">
            {product.specs.size.replace(/"/g, ' in')} · {product.specs.plating}
          </p>

          {/* Secondary button: 36px high, white, 1px #4A5A1E, radius 6, text #4A5A1E, Oswald 600 12px uppercase tracking .1em */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/quote?product=${product.id}`);
            }}
            className="mt-[6px] h-[36px] w-full bg-white border border-[#4A5A1E] rounded-[6px] text-[#4A5A1E] font-display font-semibold text-[12px] uppercase tracking-[0.1em] hover:bg-[#E7ECD2]/40 transition-colors flex items-center justify-center shrink-0"
          >
            Get quote
          </button>
        </div>
      </div>
    </div>
  );
};
