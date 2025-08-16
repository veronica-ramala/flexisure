import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle } from 'lucide-react-native';
import { spacing, typography, rs } from '@/utils/responsive';

interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'info' | 'error';
  showIcon?: boolean;
}

export function Badge({ text, variant = 'info', showIcon = false }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant]]}>
      {showIcon && variant === 'success' && (
        <CheckCircle size={14} color="#059669" strokeWidth={2} />
      )}
      <Text style={[styles.text, styles[`${variant}Text`]]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: rs(6),
    gap: spacing.xs,
  },
  success: {
    backgroundColor: '#D1FAE5',
  },
  warning: {
    backgroundColor: '#FEF3C7',
  },
  info: {
    backgroundColor: '#DBEAFE',
  },
  error: {
    backgroundColor: '#FEE2E2',
  },
  text: {
    fontSize: typography.sm,
    fontWeight: '600',
    flexWrap: 'wrap',
  },
  successText: {
    color: '#059669',
  },
  warningText: {
    color: '#D97706',
  },
  infoText: {
    color: '#2563EB',
  },
  errorText: {
    color: '#DC2626',
  },
});