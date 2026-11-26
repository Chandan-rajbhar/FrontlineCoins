import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Shield,
  UploadCloud,
  Check,
  CheckCircle2,
  FileText,
  Layers,
  Award,
  CircleDot,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { Segmented } from '../../components/ui/Segmented';
import { Chip } from '../../components/ui/Chip';

// ---------------------------------------------------------------------------
// DATA OPTIONS
// ---------------------------------------------------------------------------

interface ProductOption {
  id: string;
  name: string;
  headline: string;
  tag?: string;
  icon: React.ElementType;
}

const productOptions: ProductOption[] = [
  {
    id: 'challenge-coin',
    name: 'Challenge Coins',
    headline: '2D & 3D minted coins with custom edges & plating',
    tag: 'MOST POPULAR',
    icon: Shield,
  },
  {
    id: 'lapel-pin',
    name: 'Lapel Pins',
    headline: 'Hard or soft enamel pins with clutch backing',
    icon: Award,
  },
  {
    id: 'badge',
    name: 'Duty Badges',
    headline: 'Solid metal shields, stars & miniature replicas',
    icon: Shield,
  },
  {
    id: 'medal',
    name: 'Medals & Ribbons',
    headline: 'Commemorative service medals with neck drape',
    icon: Award,
  },
  {
    id: 'bottle-opener',
    name: 'Bottle Openers',
    headline: 'Heavyweight tactical coins with cutout opener',
    icon: CircleDot,
  },
  {
    id: 'vehicle-badge',
    name: 'Vehicle Badges',
    headline: 'Heavy metal automotive emblems with 3M adhesive',
    icon: Layers,
  },
];

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

const artworkOptions = [
  {
    id: 'upload',
    title: 'I have artwork / logo',
    desc: 'Upload vectors, badge sketches, or crest photos',
  },
  {
    id: 'design-service',
    title: 'Design it for me (Free)',
    desc: 'Our in-house artists design from scratch with unlimited revisions',
  },
  {
    id: 'reorder',
    title: 'Reorder previous design',
    desc: 'Use existing mold dies already on file in your account',
  },
];

const edgeOptions = [
  { value: 'rope', label: 'Rope edge' },
  { value: 'flat', label: 'Standard flat edge' },
  { value: 'diamond', label: 'Diamond cross-cut' },
  { value: 'reeded', label: 'Reeded edge' },
];

const addonOptions = [
  { id: 'numbering', label: 'Sequential serial numbering (e.g. 001/100)' },
  { id: 'epoxy', label: 'Epoxy protective dome coating' },
  { id: 'glow', label: 'Glow-in-the-dark enamel accents' },
  { id: 'edge-text', label: 'Laser engraved edge lettering' },
];

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

export const QuoteBuilderScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initial step: If URL specifies a step or product, respect it; otherwise default to Step 2 if product is set, or Step 1
  const initialStep = searchParams.get('step')
    ? parseInt(searchParams.get('step')!, 10)
    : searchParams.get('product')
    ? 2
    : 1;

  const [step, setStep] = useState<number>(initialStep >= 1 && initialStep <= 4 ? initialStep : 1);
  const [selectedProduct, setSelectedProduct] = useState<string>('challenge-coin');

  // Step 2 selections
  const [selectedDiameter, setSelectedDiameter] = useState('1.75');
  const [selectedQuantity, setSelectedQuantity] = useState(100);
  const [selectedFinish, setSelectedFinish] = useState('antique-brass');

  // Step 3 selections
  const [artworkStatus, setArtworkStatus] = useState('upload');
  const [relief, setRelief] = useState<'2d' | '3d'>('3d');
  const [edgeStyle, setEdgeStyle] = useState('rope');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['numbering']);
  const [hasUploadedFile, setHasUploadedFile] = useState(true);

  // Step 4 form
  const [unitName, setUnitName] = useState("Hillsborough County Sheriff's Office");
  const [contactName, setContactName] = useState('Sgt. J. Miller');
  const [email, setEmail] = useState('jmiller@teamhcso.gov');
  const [phone, setPhone] = useState('(813) 247-8200');
  const [deadline, setDeadline] = useState('Annual Awards Banquet (October 12)');
  const [notes, setNotes] = useState('Please ensure high relief on star and seal.');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic names & calculations
  const currentProduct = productOptions.find((p) => p.id === selectedProduct) || productOptions[0];

  const stepName =
    step === 1
      ? 'Product type'
      : step === 2
      ? 'Size and quantity'
      : step === 3
      ? 'Artwork & plating'
      : 'Review & submit';

  const progressPercent = (step / 4) * 100;

  // Calculate pricing
  const baseRate =
    selectedQuantity === 50
      ? 6.2
      : selectedQuantity === 100
      ? 4.85
      : selectedQuantity === 250
      ? 3.95
      : 3.25;

  const sizeAdd = selectedDiameter === '2.00' ? 0.45 : selectedDiameter === '2.25' ? 0.85 : 0;
  const finishAdd = selectedFinish === 'dual-plated' ? 0.4 : 0;
  const unitPrice = (baseRate + sizeAdd + finishAdd).toFixed(2);
  const estimatedTotal = (parseFloat(unitPrice) * selectedQuantity).toFixed(2);

  // Navigation handlers
  const handleNext = () => {
    if (step < 4) {
      setStep((s) => s + 1);
      // Scroll to top when moving to next step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(-1);
    }
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // -------------------------------------------------------------------------
  // SUCCESS STATE (AFTER SUBMISSION)
  // -------------------------------------------------------------------------
  if (isSubmitted) {
    return (
      <div className="flex flex-col flex-1 min-h-full justify-between bg-[#F4F3EA]">
        <div className="px-[12px] pt-[24px] pb-[20px] flex flex-col gap-[20px] w-full text-center items-center">
          <div className="w-[64px] h-[64px] rounded-full bg-[#E7ECD2] border-2 border-[#4A5A1E] flex items-center justify-center text-[#4A5A1E] mt-4">
            <Check className="w-[32px] h-[32px] stroke-[2.5]" />
          </div>

          <div className="flex flex-col gap-[6px]">
            <span className="font-sans text-[12px] font-semibold tracking-wider text-[#4A5A1E] uppercase">
              Quote Request Submitted
            </span>
            <h1 className="font-display font-bold text-[28px] leading-[32px] uppercase tracking-[0.02em] text-[#1B1C16]">
              Request Received!
            </h1>
            <p className="font-sans text-[13px] leading-[18px] text-[#5E6350] max-w-[340px] mx-auto">
              Reference: <strong className="text-[#1B1C16]">FC-2026-9042</strong>. Our art department will review your specifications and email your 3D digital proof to{' '}
              <span className="text-[#1B1C16] font-medium">{email}</span> within 24 hours.
            </p>
          </div>

          {/* Quick summary card */}
          <div className="w-full bg-white border border-[#D9DCC8] rounded-[10px] p-[16px] text-left flex flex-col gap-[12px]">
            <div className="flex items-center justify-between border-b border-[#D9DCC8] pb-[10px]">
              <div>
                <div className="font-display font-semibold text-[16px] text-[#1B1C16] uppercase">
                  {selectedQuantity}x {currentProduct.name}
                </div>
                <div className="font-sans text-[12px] text-[#5E6350]">
                  {selectedDiameter} in · {finishOptions.find((f) => f.value === selectedFinish)?.label}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display font-bold text-[18px] text-[#4A5A1E]">
                  ${estimatedTotal}
                </div>
                <div className="font-sans text-[11px] text-[#5E6350]">
                  ${unitPrice} / piece
                </div>
              </div>
            </div>

            <div className="flex items-center gap-[8px] text-[12px] text-[#4A5A1E] bg-[#E7ECD2] p-[10px] rounded-[6px]">
              <Clock className="w-[16px] h-[16px] shrink-0" />
              <span>Standard delivery: 12–15 business days following proof approval.</span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-[10px] pt-2">
            <button
              type="button"
              onClick={() => navigate('/orders')}
              className="w-full h-[48px] bg-[#FFCC00] text-[#1B1C16] font-display font-bold text-[14px] uppercase tracking-[0.1em] rounded-[6px] border-b-2 border-b-[#B38F00] hover:bg-[#E6B800] active:translate-y-[1px] transition-all flex items-center justify-center gap-2"
            >
              <span>Track in Orders</span>
              <ArrowRight className="w-[18px] h-[18px]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
              }}
              className="w-full h-[44px] bg-white border border-[#D9DCC8] text-[#1B1C16] font-sans text-[13px] font-semibold rounded-[6px] hover:bg-[#F4F3EA] transition-all"
            >
              Start Another Quote
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // MAIN QUOTE BUILDER MULTI-STEP RENDER
  // -------------------------------------------------------------------------
  return (
    <div className="flex flex-col flex-1 min-h-full justify-between bg-[#F4F3EA]">
      {/* Content area: Padding 16px 12px 0, 16px gap */}
      <div className="px-[12px] pt-[16px] pb-[20px] flex flex-col gap-[16px] w-full">
        {/* Progress block */}
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between text-[12px] text-[#5E6350] font-sans">
            <span className="font-medium">Step {step} of 4</span>
            <span className="text-[#3A3D2E] font-semibold">{stepName}</span>
          </div>
          {/* 6px track #D9DCC8 radius 3 with an olive fill */}
          <div className="w-full h-[6px] bg-[#D9DCC8] rounded-[3px] overflow-hidden mt-[6px]">
            <div
              className="h-full bg-[#4A5A1E] rounded-[3px] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ================================================================= */}
        {/* STEP 1: PRODUCT TYPE */}
        {/* ================================================================= */}
        {step === 1 && (
          <div className="flex flex-col gap-[16px] animate-fadeIn">
            <div>
              <h1 className="font-display font-bold text-[28px] leading-[32px] uppercase tracking-[0.02em] text-[#1B1C16]">
                Choose Product
              </h1>
              <p className="font-sans text-[13px] leading-[18px] text-[#5E6350] mt-1">
                Select the tactical or commemorative item to build and quote.
              </p>
            </div>

            {/* 2-column Product Grid */}
            <div className="grid grid-cols-2 gap-[10px]">
              {productOptions.map((prod) => {
                const isSelected = selectedProduct === prod.id;
                const IconComponent = prod.icon;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => setSelectedProduct(prod.id)}
                    className={`relative p-[12px] rounded-[10px] text-left flex flex-col justify-between min-h-[110px] transition-all select-none ${
                      isSelected
                        ? 'bg-[#E7ECD2] border-2 border-[#4A5A1E]'
                        : 'bg-white border border-[#D9DCC8] hover:border-[#4A5A1E]/50'
                    }`}
                  >
                    {prod.tag && (
                      <span className="absolute top-[8px] right-[8px] px-[6px] py-[2px] bg-[#FFF3BF] text-[#1B1C16] font-display font-bold text-[9px] uppercase tracking-wider rounded-[3px]">
                        {prod.tag}
                      </span>
                    )}

                    <div className="flex items-center gap-[8px] mb-[6px]">
                      <div
                        className={`w-[28px] h-[28px] rounded-[6px] flex items-center justify-center ${
                          isSelected ? 'bg-[#4A5A1E] text-white' : 'bg-[#F4F3EA] text-[#4A5A1E]'
                        }`}
                      >
                        <IconComponent className="w-[16px] h-[16px]" />
                      </div>
                    </div>

                    <div>
                      <div className="font-display font-semibold text-[16px] leading-[20px] text-[#1B1C16] uppercase">
                        {prod.name}
                      </div>
                      <div className="font-sans text-[11px] leading-[15px] text-[#5E6350] mt-1 line-clamp-2">
                        {prod.headline}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Guarantee Note */}
            <div className="flex items-center gap-[10px] p-[12px] rounded-[8px] bg-white border border-[#D9DCC8]">
              <Shield className="w-[20px] h-[20px] text-[#4A5A1E] shrink-0" />
              <div className="font-sans text-[12px] leading-[16px] text-[#5E6350]">
                <strong className="text-[#1B1C16]">Law enforcement & military vendor:</strong> Free design services and zero mold charges across all custom product categories.
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 2: SIZE AND QUANTITY (Exact Prototype UI) */}
        {/* ================================================================= */}
        {step === 2 && (
          <div className="flex flex-col gap-[16px] animate-fadeIn">
            {/* Title: Dynamic based on product */}
            <h1 className="font-display font-bold text-[28px] leading-[32px] uppercase tracking-[0.02em] text-[#1B1C16]">
              {currentProduct.id === 'challenge-coin' ? 'Challenge coin' : currentProduct.name}
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
              {/* Segmented control: white, 1px #D9DCC8, radius 8, padding 4px, 4px gap, 4 equal 40px segments */}
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
        )}

        {/* ================================================================= */}
        {/* STEP 3: ARTWORK & PLATING */}
        {/* ================================================================= */}
        {step === 3 && (
          <div className="flex flex-col gap-[16px] animate-fadeIn">
            <div>
              <h1 className="font-display font-bold text-[28px] leading-[32px] uppercase tracking-[0.02em] text-[#1B1C16]">
                Artwork & Details
              </h1>
              <p className="font-sans text-[13px] leading-[18px] text-[#5E6350] mt-1">
                Configure your artwork source, relief depth, and specialty coin edges.
              </p>
            </div>

            {/* ARTWORK STATUS */}
            <div className="flex flex-col gap-[8px]">
              <span className="font-display font-semibold text-[14px] uppercase tracking-[0.08em] text-[#3A3D2E]">
                Artwork Status
              </span>
              <div className="flex flex-col gap-[8px]">
                {artworkOptions.map((opt) => {
                  const isSelected = artworkStatus === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setArtworkStatus(opt.id)}
                      className={`p-[12px] rounded-[8px] text-left transition-all ${
                        isSelected
                          ? 'bg-[#E7ECD2] border-2 border-[#4A5A1E]'
                          : 'bg-white border border-[#D9DCC8] hover:border-[#4A5A1E]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-semibold text-[15px] uppercase text-[#1B1C16]">
                          {opt.title}
                        </span>
                        <div
                          className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#4A5A1E] bg-[#4A5A1E]'
                              : 'border-[#C9CDB4] bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="font-sans text-[12px] leading-[16px] text-[#5E6350] mt-1">
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Upload Dropzone if "upload" selected */}
              {artworkStatus === 'upload' && (
                <div className="mt-1 border-2 border-dashed border-[#C9CDB4] rounded-[8px] bg-white p-[14px] flex flex-col items-center justify-center text-center gap-[6px]">
                  <UploadCloud className="w-[28px] h-[28px] text-[#4A5A1E]" />
                  <div className="font-sans text-[13px] font-semibold text-[#1B1C16]">
                    Upload logos, patch graphics, or sketches
                  </div>
                  <div className="font-sans text-[11px] text-[#5E6350]">
                    PNG, SVG, AI, EPS, JPG, PDF · Max 25MB
                  </div>
                  {hasUploadedFile ? (
                    <div className="flex items-center justify-between w-full max-w-[280px] bg-[#E7ECD2] border border-[#C9CDB4] px-[10px] py-[6px] rounded-[6px] mt-2">
                      <div className="flex items-center gap-[8px] truncate">
                        <FileText className="w-[14px] h-[14px] text-[#4A5A1E] shrink-0" />
                        <span className="font-sans text-[12px] font-medium text-[#1B1C16] truncate">
                          hcso_crest_patch_v2.ai
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setHasUploadedFile(false)}
                        className="font-sans text-[11px] text-[#5E6350] hover:text-[#B3262E] ml-2 shrink-0 underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setHasUploadedFile(true)}
                      className="mt-2 px-3 py-1 bg-[#4A5A1E] text-white rounded-[4px] font-sans text-[11px] font-medium"
                    >
                      Attach Sample Vector File
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* RELIEF / DIMENSION */}
            <div className="flex flex-col gap-[8px]">
              <span className="font-display font-semibold text-[14px] uppercase tracking-[0.08em] text-[#3A3D2E]">
                Relief & Sculpting
              </span>
              <div className="grid grid-cols-2 gap-[8px]">
                <button
                  type="button"
                  onClick={() => setRelief('2d')}
                  className={`p-[10px] rounded-[8px] text-left transition-all ${
                    relief === '2d'
                      ? 'bg-[#E7ECD2] border-2 border-[#4A5A1E]'
                      : 'bg-white border border-[#D9DCC8]'
                  }`}
                >
                  <div className="font-display font-semibold text-[15px] uppercase text-[#1B1C16]">
                    2D Classic
                  </div>
                  <div className="font-sans text-[11px] text-[#5E6350] mt-1">
                    Flat multi-level metal with sharp color fills
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRelief('3d')}
                  className={`p-[10px] rounded-[8px] text-left relative transition-all ${
                    relief === '3d'
                      ? 'bg-[#E7ECD2] border-2 border-[#4A5A1E]'
                      : 'bg-white border border-[#D9DCC8]'
                  }`}
                >
                  <span className="absolute top-[6px] right-[6px] px-[5px] py-[1px] bg-[#FFF3BF] text-[#1B1C16] font-display font-bold text-[9px] uppercase rounded-[3px]">
                    POPULAR
                  </span>
                  <div className="font-display font-semibold text-[15px] uppercase text-[#1B1C16]">
                    3D Sculpted
                  </div>
                  <div className="font-sans text-[11px] text-[#5E6350] mt-1">
                    Dynamic sculpted curves for faces, seals & badges
                  </div>
                </button>
              </div>
            </div>

            {/* EDGE PROFILE */}
            <div className="flex flex-col gap-[8px]">
              <span className="font-display font-semibold text-[14px] uppercase tracking-[0.08em] text-[#3A3D2E]">
                Edge Style
              </span>
              <div className="flex flex-wrap gap-[8px]">
                {edgeOptions.map((e) => {
                  const isSelected = edgeStyle === e.value;
                  return (
                    <Chip
                      key={e.value}
                      active={isSelected}
                      onClick={() => setEdgeStyle(e.value)}
                    >
                      {e.label}
                    </Chip>
                  );
                })}
              </div>
            </div>

            {/* OPTIONAL ADD-ONS */}
            <div className="flex flex-col gap-[8px]">
              <span className="font-display font-semibold text-[14px] uppercase tracking-[0.08em] text-[#3A3D2E]">
                Optional Add-ons
              </span>
              <div className="flex flex-col gap-[6px]">
                {addonOptions.map((a) => {
                  const isSelected = selectedAddons.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleAddon(a.id)}
                      className={`px-[12px] py-[8px] rounded-[6px] text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#E7ECD2] border border-[#4A5A1E]'
                          : 'bg-white border border-[#D9DCC8]'
                      }`}
                    >
                      <span className="font-sans text-[12px] font-medium text-[#1B1C16]">
                        {a.label}
                      </span>
                      <div
                        className={`w-[16px] h-[16px] rounded-[4px] border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#4A5A1E] border-[#4A5A1E] text-white'
                            : 'border-[#C9CDB4] bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-[12px] h-[12px] stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 4: REVIEW & SUBMIT */}
        {/* ================================================================= */}
        {step === 4 && (
          <div className="flex flex-col gap-[16px] animate-fadeIn">
            <div>
              <h1 className="font-display font-bold text-[28px] leading-[32px] uppercase tracking-[0.02em] text-[#1B1C16]">
                Review Quote
              </h1>
              <p className="font-sans text-[13px] leading-[18px] text-[#5E6350] mt-1">
                Confirm your coin specs and enter delivery details to receive your formal estimate.
              </p>
            </div>

            {/* Summary Card */}
            <div className="bg-white border border-[#D9DCC8] rounded-[10px] p-[14px] flex flex-col gap-[12px]">
              <div className="flex items-center justify-between border-b border-[#D9DCC8] pb-[10px]">
                <div>
                  <div className="font-display font-semibold text-[17px] text-[#1B1C16] uppercase">
                    {selectedQuantity}x {currentProduct.name}
                  </div>
                  <div className="font-sans text-[12px] text-[#5E6350]">
                    {selectedDiameter} in · {finishOptions.find((f) => f.value === selectedFinish)?.label}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-[18px] text-[#4A5A1E]">
                    ${estimatedTotal}
                  </div>
                  <div className="font-sans text-[11px] text-[#5E6350]">
                    ${unitPrice} / piece
                  </div>
                </div>
              </div>

              {/* Spec Rows */}
              <div className="grid grid-cols-2 gap-x-[12px] gap-y-[6px] text-[12px]">
                <div>
                  <span className="text-[#5E6350]">Product:</span>{' '}
                  <strong className="text-[#1B1C16] font-medium">{currentProduct.name}</strong>
                </div>
                <div>
                  <span className="text-[#5E6350]">Diameter:</span>{' '}
                  <strong className="text-[#1B1C16] font-medium">{selectedDiameter} in</strong>
                </div>
                <div>
                  <span className="text-[#5E6350]">Quantity:</span>{' '}
                  <strong className="text-[#1B1C16] font-medium">{selectedQuantity} pcs</strong>
                </div>
                <div>
                  <span className="text-[#5E6350]">Plating:</span>{' '}
                  <strong className="text-[#1B1C16] font-medium">
                    {finishOptions.find((f) => f.value === selectedFinish)?.label}
                  </strong>
                </div>
                <div>
                  <span className="text-[#5E6350]">Relief:</span>{' '}
                  <strong className="text-[#1B1C16] font-medium">
                    {relief === '3d' ? '3D Sculpted' : '2D Classic'}
                  </strong>
                </div>
                <div>
                  <span className="text-[#5E6350]">Edge:</span>{' '}
                  <strong className="text-[#1B1C16] font-medium">
                    {edgeOptions.find((e) => e.value === edgeStyle)?.label}
                  </strong>
                </div>
                <div>
                  <span className="text-[#5E6350]">Mold fee:</span>{' '}
                  <strong className="text-[#4A5A1E] font-medium">$0.00 (FREE)</strong>
                </div>
                <div>
                  <span className="text-[#5E6350]">Design proof:</span>{' '}
                  <strong className="text-[#4A5A1E] font-medium">$0.00 (FREE)</strong>
                </div>
              </div>

              <div className="border-t border-[#D9DCC8] pt-[8px] flex items-center justify-between text-[11px] text-[#5E6350]">
                <span>Shipping: Free to all US / APO / FPO bases</span>
                <span>Turnaround: 12–15 Days</span>
              </div>
            </div>

            {/* Contact Information Form */}
            <div className="bg-white border border-[#D9DCC8] rounded-[10px] p-[14px] flex flex-col gap-[10px]">
              <span className="font-display font-semibold text-[14px] uppercase tracking-[0.08em] text-[#3A3D2E]">
                Contact & Delivery Info
              </span>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-[11px] font-semibold text-[#5E6350] uppercase tracking-wider">
                  Agency / Unit / Department Name
                </label>
                <input
                  type="text"
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  className="h-[40px] px-3 bg-white border border-[#D9DCC8] rounded-[6px] text-[#1B1C16] text-[13px] font-sans focus:outline-none focus:border-[#4A5A1E]"
                  placeholder="e.g. Hillsborough County Sheriff's Office"
                />
              </div>

              <div className="grid grid-cols-2 gap-[8px]">
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] font-semibold text-[#5E6350] uppercase tracking-wider">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="h-[40px] px-3 bg-white border border-[#D9DCC8] rounded-[6px] text-[#1B1C16] text-[13px] font-sans focus:outline-none focus:border-[#4A5A1E]"
                    placeholder="Sgt. J. Miller"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] font-semibold text-[#5E6350] uppercase tracking-wider">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-[40px] px-3 bg-white border border-[#D9DCC8] rounded-[6px] text-[#1B1C16] text-[13px] font-sans focus:outline-none focus:border-[#4A5A1E]"
                    placeholder="officer@agency.gov"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[8px]">
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] font-semibold text-[#5E6350] uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-[40px] px-3 bg-white border border-[#D9DCC8] rounded-[6px] text-[#1B1C16] text-[13px] font-sans focus:outline-none focus:border-[#4A5A1E]"
                    placeholder="(813) 247-8200"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans text-[11px] font-semibold text-[#5E6350] uppercase tracking-wider">
                    Event / Deadline
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="h-[40px] px-3 bg-white border border-[#D9DCC8] rounded-[6px] text-[#1B1C16] text-[13px] font-sans focus:outline-none focus:border-[#4A5A1E]"
                    placeholder="Oct 12"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-sans text-[11px] font-semibold text-[#5E6350] uppercase tracking-wider">
                  Special Notes or Inscription
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#D9DCC8] rounded-[6px] text-[#1B1C16] text-[13px] font-sans focus:outline-none focus:border-[#4A5A1E] resize-none"
                  placeholder="Need sharp 3D relief on the star and cross..."
                />
              </div>
            </div>

            {/* Zero-Risk Reassurance Card */}
            <div className="bg-[#E7ECD2] border border-[#C9CDB4] rounded-[8px] p-[12px] flex items-start gap-[10px]">
              <CheckCircle2 className="w-[18px] h-[18px] text-[#4A5A1E] shrink-0 mt-[1px]" />
              <div className="font-sans text-[12px] leading-[16px] text-[#3A3D2E]">
                <strong className="text-[#1B1C16]">No payment required now.</strong> Submitting this request sends your specifications directly to our design team. You'll receive a detailed proof and price guarantee to approve before any production begins.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom action bar: 72px high, white, 1px top border #D9DCC8, padding 0 12px, space-between */}
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
          {step === 4 ? 'Submit Quote' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
