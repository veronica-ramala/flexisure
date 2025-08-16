import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { spacing, typography, touchTarget, rs } from '@/utils/responsive';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'destructive';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: rs(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  primary: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  secondary: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#FF6B35',
  },
  text: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  destructive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  small: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: touchTarget(36),
  },
  medium: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    minHeight: touchTarget(48),
  },
  large: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    minHeight: touchTarget(56),
  },
  disabled: {
    backgroundColor: '#D1D5DB',
    borderColor: '#D1D5DB',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#374151',
  },
  outlineText: {
    color: '#FF6B35',
  },
  textText: {
    color: '#FF6B35',
  },
  destructiveText: {
    color: '#FFFFFF',
  },
  smallText: {
    fontSize: typography.md,
  },
  mediumText: {
    fontSize: typography.lg,
  },
  largeText: {
    fontSize: typography.xl,
  },
  disabledText: {
    color: '#9CA3AF',
  },
});