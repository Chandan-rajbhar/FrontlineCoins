---
name: Tactical Precision
colors:
  surface: '#10150c'
  surface-dim: '#10150c'
  surface-bright: '#363b30'
  surface-container-lowest: '#0b1007'
  surface-container-low: '#181d13'
  surface-container: '#1c2117'
  surface-container-high: '#262c21'
  surface-container-highest: '#31362c'
  on-surface: '#e0e4d5'
  on-surface-variant: '#d4c4ad'
  inverse-surface: '#e0e4d5'
  inverse-on-surface: '#2d3227'
  outline: '#9c8f79'
  outline-variant: '#504533'
  surface-tint: '#fbbc2b'
  primary: '#ffc64d'
  on-primary: '#412d00'
  primary-container: '#e5a910'
  on-primary-container: '#5b4100'
  inverse-primary: '#7b5900'
  secondary: '#fabc35'
  on-secondary: '#412d00'
  secondary-container: '#cf9700'
  on-secondary-container: '#4a3300'
  tertiary: '#c3d4b4'
  on-tertiary: '#26341e'
  tertiary-container: '#a7b89a'
  on-tertiary-container: '#3b4932'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea4'
  primary-fixed-dim: '#fbbc2b'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4200'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#fabc35'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5d4200'
  tertiary-fixed: '#d7e8c8'
  tertiary-fixed-dim: '#bbccad'
  on-tertiary-fixed: '#121f0b'
  on-tertiary-fixed-variant: '#3c4b33'
  background: '#10150c'
  on-background: '#e0e4d5'
  surface-variant: '#31362c'
typography:
  headline-xl:
    fontFamily: Barlow Condensed
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Barlow Condensed
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Barlow Condensed
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Barlow Condensed
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.06em
  label-md:
    fontFamily: Barlow Condensed
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Barlow Condensed
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.1em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an institutional, high-reliability mobile experience tailored for federal agencies, defense commands, law enforcement leadership, and corporate honors programs. The aesthetic moves away from weathered battlefield tropes and fatigued camo textures, embracing instead an engineering-grade, aerospace and defense contractor sensibility: calculated, pristine, and authoritative.

Key brand attributes:
- **Institutional Trust:** Imparts sovereign weight, certified quality, and rigorous protocol.
- **Architectural Precision:** Razor-sharp alignment, structured data cards, and clean division of space.
- **Tactile Prestige:** Evokes the substantial weight of die-struck metal, polished brass, and hand-enameled insignia without skeuomorphic distraction.

The interface pairs deep, disciplined dark-olive canvas layers with restrained, luminous warm-gold accents, signaling sovereign craftsmanship and executive distinction.

## Colors

The color palette reflects defense-grade materials and military dress uniformity. It operates primarily in dark mode to mirror tactical equipment consoles, ceremonial mahogany presentation cases, and burnished bronze insignia.

- **Primary (`#E5A910`):** Tactical Spec-Gold. Applied with restraint to call-to-actions, primary active indicators, verified agency crest badges, and key transaction milestones.
- **Secondary (`#D49B08`):** Burnished Brass. Used for focused states, borders on high-priority components, progress tracking, and key micro-interactions.
- **Tertiary (`#4D5C43`):** Subdued Field Drab. Provides semantic mid-tones, secondary status badges, and subtle division lines.
- **Neutral Canvas (`#1E2319`, `#2A3224`, `#121510`):** The foundational substrate. `#121510` serves as the base viewport background, `#1E2319` forms standard card and surface backgrounds, and `#2A3224` elevates interactive containers, headers, and sheet surfaces.
- **Text & Status:** Pure crisp off-white (`#F4F6F0`) for primary editorial contrast, tempered olive-tinted slate (`#9DA893`) for metadata, and high-visibility red (`#E04838`) reserved strictly for security alerts or destructive actions.

## Typography

The typographic hierarchy combines the condensed, architectural rigor of standard military stencil and identification plates (`Barlow Condensed`) with the utilitarian legibility of `Inter`.

- **Headers & Identifiers (`Barlow Condensed`):** Set in upper-case or tight title-case with disciplined letter-spacing. Gives quotation screens, specifications, and SKU headers the exactness of a military manifest.
- **Body & Data Readings (`Inter`):** Neutral, high-x-height text ensures high readability for complex manufacturing specifications (e.g., plating options, 3D die depths, edge bevel options) on mobile screens under direct field sunlight or low-light conditions.
- **Labels & Tactical Tags:** Set with distinct letter spacing (`0.06em` to `0.1em`) and condensed weight to maximize horizontal screen efficiency in dense forms and order manifests.

## Layout & Spacing

Designed strictly around a mobile-first 4px/8px layout grid. Mobile interfaces use a fluid single-column model with compact 16px (`1rem`) outer canvas margins to maximize screen utility on handheld devices.

- **Grid & Alignment:** Elements snap to precise 8px intervals. Internal card content maintains a standard 16px (`space-md`) inset, while nested metadata points compress to 8px (`space-sm`).
- **Vertical Rhythm:** Dense, utilitarian, and predictable. Section titles lead content groups by 8px, while distinct manufacturing category sections detach by 24px (`space-lg`) to prevent visual crowding.
- **Safe Areas & Interaction Zones:** Touch targets conform strictly to a 48px minimum vertical plane, ensuring field usability when users operate devices with single hands or while wearing gloves.

## Elevation & Depth

Visual depth is achieved through **tonal layering** and **low-contrast precision borders** rather than standard diffuse drop shadows. This preserves an industrial instrument feel:

- **Level 0 (Canvas Base):** Deepest black-olive (`#121510`). Provides foundational contrast for scroll views and drawer overlays.
- **Level 1 (Card & Content Blocks):** Dark olive (`#1E2319`) bounded by a subtle 1px border (`#2F3827` or `rgba(229, 169, 16, 0.12)` for selected states).
- **Level 2 (Active Modules & Overlays):** Elevated olive (`#2A3224`) with an ultra-fine 1px interior highlight stroke (`rgba(255, 255, 255, 0.05)`).
- **Tactical Glow (Ambient Accent):** For primary actions, floating review triggers, or verification stamps, an ambient 12px blur with 15% opacity matching Tactical Gold (`#E5A910`) creates restrained radiance without softness.

## Shapes

The design system embraces a **Soft / Precision Clipped** shape profile (`roundedness: 1`). Radii are kept minimal (4px base, 8px large) to convey the cut-steel solidity of minting presses, die-cast molds, and military equipment.

- Base buttons, input boxes, and card modules utilize 4px corners (`0.25rem`), eliminating organic softness in favor of deliberate engineering.
- Sheet modals, modal dialogs, and parent viewports utilize 8px corners (`0.5rem`).
- Strict circle geometry (100% border radius) is reserved exclusively for circular preview mockups of challenge coins, round medals, and seal insignias.

## Components

### Buttons
- **Primary Action (Tactical Dispatch):** Background filled with `#E5A910`, text set in `#121510` (weight 700, `Barlow Condensed`), 4px corner radius, 48px height. Active states shift to `#D49B08`.
- **Secondary Action (Subdued Spec):** Transparent background, 1px solid `#4D5C43` outline, `#F4F6F0` text. Pressed state darkens with 10% `#E5A910` fill.
- **Ghost/Tertiary:** No outline; gold text with arrow or chevron glyphs for inline spec adjustments.

### Input Fields & Selectors
- **Input Base:** Background `#161A13`, border 1px solid `#2F3827`, height 48px, text `#F4F6F0`.
- **Focus State:** Border shifts crisply to `#E5A910` with zero blur spread, accompanied by a small floating uppercase label in `Barlow Condensed`.
- **Coin Dimension Pickers:** Segmented mechanical pill-switches showing standard gauge thickness and diameters (1.75", 2.0", 2.25", Custom).

### Cards & Spec Sheets
- **Product & Configurator Cards:** Dark olive surface (`#1E2319`), bounded by 1px hairline border (`#2A3224`).
- **Badge Indicators:** Small corner flags in upper-right containing production phase (e.g., "MOLD APPROVED", "IN PRODUCTION", "DOD VERIFIED") using `label-sm` in gold/amber.

### Chips & Badges
- Compact rectangular geometry (4px radius). Inactive chips feature dark olive fill with slate text. Active chips snap to `#E5A910` border and gold text.

### Checkboxes & Radios
- Square 20px inputs with 2px corner radius. Unchecked state: 1.5px solid border `#4D5C43`. Checked state: solid `#E5A910` fill with a deep olive checkmark icon (`#121510`).

### Specialized Mobile Modules
- **Coin Visualizer Inspector:** Circular frame display with low-angle directional light simulations highlighting dual-plated edges (Antiqued Brass vs. Polished Nickel).
- **Proof Approval Bar:** Fixed mobile bottom docking unit housing dual primary/reject controls for expedited executive sign-off.