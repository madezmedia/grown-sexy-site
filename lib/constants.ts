// Brand Colors - Luxury Red/Black/Gold Palette
export const colors = {
  // Primary Palette
  crimson: {
    50: '#FFF5F5',
    100: '#FFE3E3',
    200: '#FFC9C9',
    300: '#FFA8A8',
    400: '#FF8787',
    500: '#FF6B6B',
    600: '#DC143C', // Primary Crimson
    700: '#C41E3A',
    800: '#A01729',
    900: '#7D1220',
  },
  ruby: {
    500: '#E0115F',
    600: '#C41E3A',
    700: '#9B111E',
  },
  gold: {
    400: '#FFD700',
    500: '#DAA520',
    600: '#B8860B',
  },
  // Neutrals
  black: '#000000',
  obsidian: '#0A0A0A',
  charcoal: '#1A1A1A',
  slate: '#2A2A2A',
  white: '#FFFFFF',
  cream: '#FAF9F6',
}

// Typography
export const fonts = {
  sans: 'var(--font-inter)',
  display: 'var(--font-playfair)',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
}

// Animation Durations
export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 1.0,
}

// Easing Functions
export const easings = {
  easeInOut: [0.645, 0.045, 0.355, 1],
  easeOut: [0.16, 1, 0.3, 1],
  easeIn: [0.87, 0, 0.13, 1],
  spring: { type: "spring", stiffness: 300, damping: 30 },
}

// Breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}
