import { Platform } from 'react-native';

export const Colors = {
  light: {
    primary: '#D97706',
    primaryElement: '#FEF3C7',
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    textMuted: '#8C919D',
    border: '#E2E4E9',
    card: '#F8F9FA',
    tint: '#D97706',
    tabIconDefault: '#8C919D',
    tabIconSelected: '#D97706',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  dark: {
    primary: '#F59E0B',
    primaryElement: '#78350F',
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    textMuted: '#888888',
    border: '#2E3135',
    card: '#212225',
    tint: '#F59E0B',
    tabIconDefault: '#60646C',
    tabIconSelected: '#F59E0B',
    overlay: 'rgba(0, 0, 0, 0.75)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BorderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;