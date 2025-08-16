import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing, rs } from '@/utils/responsive';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  padding?: number;
}

export function Card({ children, style, padding = spacing.lg }: CardProps) {
  return (
    <View style={[styles.card, { padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: rs(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: rs(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: rs(8),
    elevation: 4,
    marginHorizontal: spacing.xs,
  },
});