---
name: Luminous Obsidian
colors:
  surface: '#131317'
  surface-dim: '#131317'
  surface-bright: '#39393d'
  surface-container-lowest: '#0e0e12'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#2a292e'
  surface-container-highest: '#353439'
  on-surface: '#e4e1e7'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e4e1e7'
  inverse-on-surface: '#303034'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#ffffff'
  on-tertiary: '#690005'
  tertiary-container: '#ffdad6'
  on-tertiary-container: '#c8131a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ab'
  on-tertiary-fixed: '#410002'
  on-tertiary-fixed-variant: '#93000b'
  background: '#131317'
  on-background: '#e4e1e7'
  surface-variant: '#353439'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
  data-metric:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers a luxury numismatic and asset valuation experience. Built around a deep, nocturnal canvas charged with rich molten amber and fiery carnelian illumination, it frames physical coin discovery as an elite, high-precision ritual. The aesthetic blends modern dark-mode minimalism, atmospheric volumetric lighting, and subtle frosted glass textures to produce an interface that feels both technologically cutting-edge and timelessly precious.

### Target Audience & Emotional Intent
- **Audience:** Passionate numismatists, heritage collectors, luxury appraisal enthusiasts, and everyday treasure seekers identifying pocket currency.
- **Atmosphere:** Exclusive, high-fidelity, authoritative, and tactile. Surfaces simulate obsidian slate kissed by studio rim-lights reflecting off 24k bullion.
- **Core Aesthetic Pillars:**
  - *Nocturnal Depth:* Ultra-dark backgrounds (#0D0D11 to pure pitch) ensure luminous assets command absolute focus.
  - *Molten Volumetric Glow:* Warm amber-to-crimson directional atmospheric gradients suggest wealth, heat, and intrinsic value.
  - *Optic Glass & Pill Geometry:* Smooth, heavily rounded surfaces with soft translucent fills and micro-strokes provide an intuitive, modern, tactile touch experience.
  - *High-Contrast Precision:* Crisp stark white interactive triggers set against deep shadows create unmistakable affordance and clarity.

## Colors

The color architecture is calibrated around high dynamic range luminescence against an ultra-dark field. 

### Palette Definition
- **Base Canvas (`neutral`):** `#0D0D11` to `#000000`. A velvet midnight base that prevents eye strain and acts as a photographic lightbox.
- **Primary Interactive (`primary`):** Pure `#FFFFFF`. High-contrast, radiant white reserved for primary buttons, core typography accents, and affirmative actions.
- **Molten Glow & Accents (`secondary`):** `#F59E0B` (Vibrant Amber / Gold) bridging into `#EAB308` (Metallic Sheen). Utilized for valuation pricing metrics, active state markers, and atmospheric highlights.
- **Volumetric Flame (`tertiary`):** `#DC2626` bridging into `#B91C1C` (Deep Crimson / Burnt Sienna). Creates radial warmth and atmospheric vignetting behind focal coin subjects.
- **Glass Surfaces:**
  - *Card Base:* `rgba(255, 255, 255, 0.06)` over deep background.
  - *Floating Container:* `rgba(28, 28, 35, 0.75)` with 24px backdrop blur.
  - *Subtle Rim Stroke:* `rgba(255, 255, 255, 0.12)` grading down to `rgba(255, 255, 255, 0.02)`.
- **Text & Content Levels:**
  - *Title / High Importance:* `#FFFFFF`
  - *Secondary / Supporting:* `rgba(255, 255, 255, 0.65)`
  - *Muted / Captions / Disclaimers:* `rgba(255, 255, 255, 0.40)`

## Typography

The typographic system utilizes **Plus Jakarta Sans** across all hierarchies to achieve contemporary geometric precision, human warmth, and crisp legibility under low ambient screen lighting.

### Editorial Hierarchy & Rhythm
- **Weight Contrasts in Headings:** Apply high-contrast phrasing in main display headers—render descriptive base text in `fontWeight: 400` and pivot focal nouns (e.g., "**Coin's Value**", "**Everything**") into `fontWeight: 700` in pure white to guide gaze hierarchy.
- **Data & Metric Display:** Valuation figures, currency ranges, and coin dimensions employ bold, non-condensed glyphs paired with warm golden tinting (`#F59E0B`) to establish immediate focal value.
- **Micro-Copy Balance:** Metadata tags (country, denomination, krause standard numbers) sit in muted neutral tones (`rgba(255, 255, 255, 0.45)`) paired with semi-bold values to maximize scan efficiency without crowding the canvas.

## Layout & Spacing

The layout is engineered around an immersive, single-column mobile-first viewport architecture utilizing safe padding regions and strict vertical cadence.

### Grid & Compositional Rules
- **Canvas Shell:** 16px to 20px horizontal page margin ensures generous tap clearance on edge sweeps while maintaining expansive display areas for rich card media.
- **Section Stack Rhythm:** Vertical spacing adheres to an 8pt modular rhythm:
  - Header to search/hero cluster: `space-lg` (24px)
  - Card modules and feature panels: `space-md` (16px) to `space-lg` (24px)
  - Inter-component row spacing: `space-sm` (8px) to `space-md` (16px)
- **Viewport Anchors:** Bottom navigation dock and primary floating conversion actions float fixed over content with a 16px clearance from safe area bottom, accompanied by a soft background scrim.

## Elevation & Depth

Visual depth is achieved through translucent optical layering, dark glass refraction, and radial incandescent glows rather than traditional drop shadows.

### Atmospheric Radiance & Layering Model
1. **Atmospheric Bed (Level 0):** The deep `#0D0D11` canvas is painted with selective radial backdrops—typically an intense `radial-gradient(circle at 85% 35%, rgba(220, 38, 38, 0.45) 0%, rgba(245, 158, 11, 0.25) 45%, transparent 70%)`.
2. **Glass Container Surface (Level 1):** Neutral panels, card backings, and metric trays are constructed with `background: rgba(255, 255, 255, 0.05)`, softened with `backdrop-filter: blur(20px)`, and defined by a continuous 1px micro-border `rgba(255, 255, 255, 0.08)`.
3. **Elevated Floating Controls (Level 2):** Quick action pills, floating bottom bars, and camera buttons float with `background: rgba(22, 22, 28, 0.85)`, `backdrop-filter: blur(32px)`, and an ambient edge shadow: `0 12px 32px -4px rgba(0, 0, 0, 0.60)`.
4. **Primary Interactive (Level 3):** Solid white surface triggers (`#FFFFFF`) with zero blur or deep soft drop shadow (`0 8px 24px rgba(0, 0, 0, 0.45)`), popping distinctly off the dark canvas.

## Shapes

The design system embraces an ultra-smooth, continuous pill and stadium geometry (`roundedness: 3`).

### Form Philosophy
- **Pill Primitives:** Primary CTA buttons, text fields, filter chips, navigation shells, and badge tags employ maximum border radii (`border-radius: 9999px` or standard 2rem to 3rem pill scaling).
- **Cards & Displays:** Feature heroes and analytical cards use generous squircle corners (`border-radius: 28px` to `32px`) echoing handheld premium hardware.
- **Circular Touchpoints:** Floating accessories, camera triggers, notification badges, and back navigations use 1:1 circular containers (`rounded-full`).

## Components

### Buttons
- **Primary Pill CTA:** Solid `#FFFFFF` fill with high-contrast `#0D0D11` semibold text. Full-width or auto-scaled with pill radius (`border-radius: 9999px`), 52px height for mobile ergonomics. Micro-animations feature gentle scale damping (`scale(0.97)`) on press.
- **Secondary / Action Pill:** Glass surface (`rgba(255, 255, 255, 0.08)`), white text, 1px border `rgba(255, 255, 255, 0.12)`.
- **Floating Accent Button:** Circular action button (56px × 56px) in solid `#FFFFFF` with dark iconography, or dark glass with warm glowing gold rim highlight.

### Search & Input Fields
- **Search Bar Pill:** 48px to 52px height, full stadium pill radius. Fill: `rgba(255, 255, 255, 0.07)` with frosted glass blur. Inner icon left-aligned in muted white, subtle right-aligned accessory trigger (such as camera or voice icon). Placeholder text styled in `rgba(255, 255, 255, 0.40)`.

### Cards & Analytical Modules
- **Hero Scanner Card:** Prominent rounded card (32px radius) framing an internal warm amber-crimson gradient burst behind three-dimensional metallic coin renders. Inner CTA: high-contrast white pill.
- **Specification Matrix Card:** Dark glassy container (`rgba(255, 255, 255, 0.04)`) with embedded horizontal metric grids (`Country`, `Denomination`, `Minting Period`, `Shape`). 
- **Coin Dimension Callout:** Interactive viewport highlighting physical coin diameter and thickness with delicate glowing dashed callout calipers (`#F59E0B`).

### Floating Bottom Navigation Bar
- **Dock Container:** Pill-shaped floating island resting 16px above the device home indicator. Deep darkened obsidian glass background (`rgba(20, 20, 26, 0.88)`), blur filter 28px, wrapped in a 1px border of `rgba(255, 255, 255, 0.10)`.
- **Navigation Items:** Clean, unadorned minimal monochrome icons. The active state is encased in an illuminated white or glass pill tab with a high-contrast dark glyph. Flanked by a standalone circular trigger button for scanning.

### Chips & Badges
- **Reference Price Pill:** Translucent dark container displaying coin value ranges highlighted in energetic gold (`#F59E0B` to `#FBBF24`).
- **Metadata Tags:** Ultra-compact rounded pill capsules displaying catalogue codes and grades with subtle neutral background tints.