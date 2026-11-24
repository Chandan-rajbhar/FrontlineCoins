import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryTileProps {
  category: Category;
}

export const CategoryTile: React.FC<CategoryTileProps> = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/shop?category=${category.slug}`)}
      className="group relative aspect-[4/3] rounded-[8px] overflow-hidden bg-surface-charcoal border border-border-tactical cursor-pointer shadow-md select-none transition-all hover:border-tactical-yellow/60 hover:shadow-lg active:scale-[0.98] min-w-0"
      role="button"
      tabIndex={0}
      aria-label={`View ${category.name}`}
    >
      {/* Background Category Photo */}
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Dark Tactical Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/95 via-surface-dim/50 to-transparent pointer-events-none" />

      {/* Top Tag */}
      {category.tag && (
        <div className="absolute top-2 left-2 z-10 max-w-[80%]">
          <span className="font-display text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-background-deep text-tactical-yellow border border-border-tactical block truncate">
            {category.tag}
          </span>
        </div>
      )}

      {/* Bottom-left condensed labels */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex flex-col text-left min-w-0">
        <h3 className="font-display text-sm font-bold text-text-crisp uppercase tracking-wider leading-tight drop-shadow-md line-clamp-2 break-words">
          {category.name}
        </h3>
        <p className="font-sans text-[11px] text-text-muted mt-0.5 line-clamp-1 break-words">
          {category.subtitle}
        </p>
      </div>
    </div>
  );
};
