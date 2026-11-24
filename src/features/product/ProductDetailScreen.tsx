import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Maximize2,
  ChevronRight,
} from 'lucide-react';
import { mockProducts } from '../../data/products';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useBreakpoint } from '../../hooks/useBreakpoint';

export const ProductDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();

  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTier, setSelectedTier] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const activeTier = product.quantityTiers[selectedTier] || product.quantityTiers[0];
  const totalTierPrice = (activeTier.pricePerUnit * activeTier.quantity).toFixed(2);

  return (
    <div className="flex flex-col w-full text-on-surface relative">
      {/* Scrollable Product Details Content */}
      <div className="flex flex-col w-full pb-[104px]">
        {/* Product Image Gallery with Zoom */}
        <div className="relative w-full aspect-square max-h-[360px] bg-surface-charcoal border-b border-border-tactical overflow-hidden select-none">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 via-transparent to-transparent pointer-events-none" />

          {/* Zoom trigger icon */}
          <button
            onClick={() => setIsZoomOpen(true)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-dim/80 border border-border-tactical text-text-muted hover:text-tactical-yellow flex items-center justify-center shadow-lg transition-colors"
            aria-label="Enlarge product image"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Category & Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            <Badge variant="yellow" size="sm">
              {product.category}
            </Badge>
            <Badge variant="olive" size="sm">
              No Mold Fees
            </Badge>
          </div>

          {/* Thumbnail Selector Strip */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-12 h-12 rounded-[6px] overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx
                      ? 'border-tactical-yellow shadow-tactical-sm scale-105'
                      : 'border-border-tactical opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Info Header */}
        <div className="px-4 pt-4 flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-tactical-yellow text-xs font-display uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Law Enforcement Specification Grade</span>
            </div>
            <h1 className="font-display text-2xl uppercase tracking-wider font-bold text-text-crisp leading-tight">
              {product.name}
            </h1>
            <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Specs Card */}
          <div className="rounded-[8px] bg-surface-elevated border border-border-tactical p-3 flex flex-col gap-2">
            <span className="font-display text-xs uppercase font-bold text-text-crisp tracking-wider border-b border-border-tactical pb-1.5">
              Key Specifications
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-surface-charcoal p-2 rounded border border-border-tactical/60">
                <span className="font-display text-[10px] text-text-muted uppercase block">Size</span>
                <span className="font-display text-xs text-text-crisp font-bold">{product.specs.size}</span>
              </div>
              <div className="bg-surface-charcoal p-2 rounded border border-border-tactical/60">
                <span className="font-display text-[10px] text-text-muted uppercase block">Metal Core</span>
                <span className="font-display text-xs text-text-crisp font-bold">{product.specs.metal}</span>
              </div>
              <div className="bg-surface-charcoal p-2 rounded border border-border-tactical/60">
                <span className="font-display text-[10px] text-text-muted uppercase block">Plating Finish</span>
                <span className="font-display text-xs text-text-crisp font-bold">{product.specs.plating}</span>
              </div>
              <div className="bg-surface-charcoal p-2 rounded border border-border-tactical/60">
                <span className="font-display text-[10px] text-text-muted uppercase block">Edge Treatment</span>
                <span className="font-display text-xs text-text-crisp font-bold">{product.specs.edge}</span>
              </div>
            </div>
          </div>

          {/* Quantity Tiers Selector */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-display text-xs uppercase tracking-wider text-text-crisp font-bold">
                Quantity Tiers
              </label>
              <span className="font-sans text-xs text-tactical-yellow">
                No Mold Fees Included
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {product.quantityTiers.map((tier, idx) => {
                const isSelected = selectedTier === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedTier(idx)}
                    className={`p-3 rounded-[6px] border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-primary-container border-tactical-yellow shadow-tactical-sm'
                        : 'bg-surface-elevated border-border-tactical hover:border-tactical-yellow/50'
                    }`}
                  >
                    {tier.badge && (
                      <div className="absolute top-0 right-0 bg-tactical-yellow text-surface-charcoal font-display text-[9px] font-bold px-1.5 py-0.5 rounded-bl uppercase">
                        ★ {tier.badge}
                      </div>
                    )}
                    <span className="font-display text-sm uppercase font-bold text-text-crisp">
                      {tier.quantity} Pieces
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="font-display text-base font-bold text-tactical-yellow">
                        ${tier.pricePerUnit.toFixed(2)}
                        <span className="font-sans text-[11px] text-text-muted font-normal">/ea</span>
                      </span>
                      {tier.savingsPercent && (
                        <span className="font-display text-[11px] text-primary font-bold uppercase">
                          Save {tier.savingsPercent}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Footer: Pinned directly above the bottom tab bar */}
      <div
        className="fixed left-0 right-0 z-30 pointer-events-none"
        style={{
          bottom: isDesktop
            ? '88px'
            : 'calc(64px + env(safe-area-inset-bottom, 0px))',
        }}
        role="region"
        aria-label="Price estimate and quote request"
      >
        <div className="w-full max-w-[640px] mx-auto pointer-events-auto">
          <div className="bg-surface-charcoal/95 backdrop-blur-md border-t border-border-tactical px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.6)] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-display text-[10px] text-text-muted uppercase tracking-wider">
                Estimate ({activeTier.quantity} pcs)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-xl font-bold text-tactical-yellow">
                  ${totalTierPrice}
                </span>
                <span className="font-sans text-xs text-text-muted">
                  (${activeTier.pricePerUnit.toFixed(2)}/ea)
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(`/quote?product=${product.id}&qty=${activeTier.quantity}`)}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Request Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Full-screen Image Modal */}
      <Modal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        title={product.name}
        maxWidth="lg"
      >
        <div className="w-full aspect-square rounded-[8px] overflow-hidden bg-surface-charcoal border border-border-tactical flex items-center justify-center">
          <img
            src={product.images[selectedImage]}
            alt="Full size view"
            className="w-full h-full object-contain"
          />
        </div>
      </Modal>
    </div>
  );
};
