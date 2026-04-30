/**
 * SUG Grappling — Centralized Theme System
 *
 * Premium combat sports broadcast aesthetic.
 * Dark backgrounds, metallic gold accents, clean typography.
 */

export const colors = {
  background: '#0B0B0B',
  surface: '#151515',
  surfaceAlt: '#1C1C1C',
  gold: '#D4AF37',
  goldDark: '#B8901F',
  textPrimary: '#FFFFFF',
  textSecondary: '#B3B3B3',
  muted: '#7A7A7A',
  border: '#2A2A2A',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
} as const;

export const typography = {
  hero: 34,
  h1: 28,
  h2: 22,
  h3: 18,
  body: 16,
  bodySmall: 14,
  caption: 12,
  micro: 10,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

const theme = { colors, spacing, typography, radius, fontWeight };
export default theme;
