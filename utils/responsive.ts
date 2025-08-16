import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11)
const BASE_WIDTH = 414;
const BASE_HEIGHT = 896;

// Responsive width
export const wp = (percentage: number): number => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive height
export const hp = (percentage: number): number => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive font size
export const rf = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Responsive spacing
export const rs = (size: number): number => {
  const scale = Math.min(SCREEN_WIDTH / BASE_WIDTH, SCREEN_HEIGHT / BASE_HEIGHT);
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Device type detection
export const isSmallDevice = (): boolean => SCREEN_WIDTH < 375;
export const isMediumDevice = (): boolean => SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = (): boolean => SCREEN_WIDTH >= 414;

// Safe minimum touch target size (44dp)
export const MIN_TOUCH_TARGET = 44;

// Ensure minimum touch target size
export const touchTarget = (size: number): number => Math.max(size, MIN_TOUCH_TARGET);

// Dynamic spacing based on device size
export const spacing = {
  xs: rs(4),
  sm: rs(8),
  md: rs(16),
  lg: rs(24),
  xl: rs(32),
  xxl: rs(40),
};

// Dynamic typography
export const typography = {
  xs: rf(10),
  sm: rf(12),
  md: rf(14),
  lg: rf(16),
  xl: rf(18),
  xxl: rf(20),
  xxxl: rf(24),
  heading: rf(28),
  title: rf(32),
  hero: rf(36),
};

// Screen breakpoints
export const breakpoints = {
  small: 375,
  medium: 414,
  large: 480,
};

export const getScreenSize = (): 'small' | 'medium' | 'large' => {
  if (SCREEN_WIDTH < breakpoints.small) return 'small';
  if (SCREEN_WIDTH < breakpoints.medium) return 'medium';
  return 'large';
};

export { SCREEN_WIDTH, SCREEN_HEIGHT };