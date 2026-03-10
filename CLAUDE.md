# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Grown & Sexy Movement is a modern, luxury lifestyle website featuring cutting-edge animations and interactions. Built for a community of individuals ages 30+, showcasing events, featured artist GODDE$$, and exclusive experiences.

## Development Commands

```bash
npm run dev    # Start development server at http://localhost:3000
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

## Tech Stack

**Core Framework:**
- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript (strict mode)

**Animation & Interactions:**
- Framer Motion - React animations, gestures, scroll-linked animations
- GSAP + @gsap/react - Advanced scroll animations (installed, not yet implemented)
- Lenis - Buttery smooth scrolling
- React Intersection Observer - Viewport detection

**3D & Effects:**
- @react-three/fiber - 3D elements (installed, not yet used)
- @react-three/drei - 3D helpers (installed, not yet used)

**Styling:**
- Tailwind CSS 4
- Custom luxury design system (red/black/gold palette)
- Glass morphism effects
- Custom animations (gradient shifts, glows, shimmers)

**UI Components:**
- Base UI React primitives
- Custom magnetic buttons
- 3D tilt cards
- Animated logo with SVG flourishes

**Fonts:**
- Inter (sans-serif)
- Playfair Display (serif/display - weights: 400, 700, 900)

## Architecture

### App Router Structure
```
app/
├── layout.tsx               # Root layout with SmoothScrollProvider, CustomCursor
├── page.tsx                 # Homepage with modern hero, sections
├── globals.css              # Luxury design system, animations
└── artist/
    └── goddess/
        └── page.tsx         # GODDE$$ artist showcase page
```

### Component Structure
```
components/
├── hero/
│   ├── AnimatedLogo.tsx       # SVG ornamental logo with animations
│   └── HeroVideo.tsx          # Video background with gradient overlays
├── providers/
│   └── SmoothScrollProvider.tsx  # Lenis smooth scroll wrapper
└── ui/
    ├── CustomCursor.tsx       # Custom cursor with red glow effect
    ├── MagneticButton.tsx     # Magnetic hover buttons with shimmer
    ├── TiltCard.tsx           # 3D perspective tilt cards
    ├── ScrollProgress.tsx     # Vertical scroll progress indicator
    ├── button.tsx             # Base UI button (legacy)
    └── card.tsx               # Base UI card (legacy)
```

### Utilities & Hooks
```
lib/
├── utils.ts            # cn() className merger
├── constants.ts        # Brand colors, fonts, durations, easings
└── animations.ts       # Framer Motion variants (fadeIn, scaleIn, stagger, etc)

hooks/
├── useMousePosition.ts    # Track mouse position
└── useScrollProgress.ts   # Track scroll percentage
```

## Design System

### Color Palette
**Brand Colors (Luxury Red/Black/Gold):**
- Crimson: `#DC143C` (primary)
- Ruby: `#C41E3A` (accent)
- Gold: `#DAA520` (secondary)
- Black: `#000000`
- Obsidian: `#0A0A0A`
- Cream: `#FAF9F6`

**CSS Custom Properties:**
- `--color-crimson`, `--color-gold`, `--color-obsidian` etc
- All defined in [app/globals.css](app/globals.css)

### Typography
- **Sans**: Inter (body text)
- **Display**: Playfair Display (headings, logos)
- Font classes: `.font-sans`, `.font-display`

### Utility Classes
**Gradients:**
- `.bg-luxury-gradient` - Black to crimson
- `.bg-crimson-gradient` - Crimson variations
- `.bg-gold-gradient` - Gold variations
- `.text-gradient-crimson` - Text gradient
- `.text-gradient-gold` - Gold text gradient

**Glass Morphism:**
- `.glass` - Dark glass with blur
- `.glass-crimson` - Crimson-tinted glass

**Glow Effects:**
- `.glow-crimson` - Red box shadow glow
- `.glow-gold` - Gold box shadow glow
- `.text-glow-crimson` - Red text shadow

**Animations:**
- `.animate-gradient-shift` - Moving gradient background
- `.animate-glow-pulse` - Pulsing glow effect
- `.animate-shimmer` - Shimmer effect

## Animation Patterns

### Framer Motion
**Import from [lib/animations.ts](lib/animations.ts):**
```tsx
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'

// Use with motion components
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInUp}
>
```

**Common Variants:**
- `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `scaleIn` - Scale + fade in
- `staggerContainer` - Parent for stagger children
- `letterAnimation` - Character-by-character reveal

### Scroll Animations
**Lenis Smooth Scroll:**
- Automatically applied via `SmoothScrollProvider` in layout
- Configuration: duration 1.2s, smooth wheel, touch multiplier 2

**Viewport Triggers:**
```tsx
whileInView="visible"
viewport={{ once: true, margin: "-100px" }}
```

## Component Usage

### Magnetic Buttons
```tsx
import { MagneticButton } from '@/components/ui/MagneticButton'

<MagneticButton variant="primary" size="lg">
  Join the Movement
</MagneticButton>

// Variants: 'primary' | 'secondary' | 'outline'
// Sizes: 'sm' | 'md' | 'lg'
```

### 3D Tilt Cards
```tsx
import { TiltCard } from '@/components/ui/TiltCard'

<TiltCard>
  <div className="glass rounded-2xl p-8">
    {/* Card content */}
  </div>
</TiltCard>
```

### Animated Logo
```tsx
import { AnimatedLogo } from '@/components/hero/AnimatedLogo'

<AnimatedLogo />
// Includes SVG flourishes, text gradient, pulsing glow
```

## Key Features

1. **Custom Cursor** - Red glow that follows mouse, scales on hover
2. **Smooth Scroll** - Lenis for buttery scroll feel
3. **3D Tilt Effects** - Cards tilt based on mouse position
4. **Magnetic Buttons** - Buttons attract to cursor on hover
5. **Scroll Progress** - Vertical red progress bar (right side)
6. **Video Backgrounds** - Gradient placeholders (client adds videos)
7. **Glass Morphism** - Blurred glass cards with borders
8. **Text Gradients** - Animated crimson and gold gradients

## Routes

- `/` - Homepage (hero, featured artist teaser, events, CTA)
- `/artist/goddess` - GODDE$$ gallery page (bio, image grid, connect)

## Development Notes

**Custom Cursor:**
- Hides default cursor with `cursor: none` in body
- Only shows on desktop (hidden on touch devices automatically)

**Performance:**
- Framer Motion uses GPU-accelerated transforms
- Lenis runs on RAF loop
- Images use placeholders (client will add real images)

**Accessibility:**
- ARIA labels needed (TODO)
- Keyboard navigation needed (TODO)
- Reduced motion preferences needed (TODO)
