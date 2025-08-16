import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useApp, BookingData } from '@/context/AppContext';
import { Plane, Clock, Calendar } from 'lucide-react-native';
import { spacing, typography, rs } from '@/utils/responsive';

interface BookingCardProps {
  booking: BookingData;
}

export function BookingCard({ booking }: BookingCardProps) {
  const { formatCurrency, formatDate } = useApp();

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.routeContainer}>
          <Plane size={20} color="#FF6B35" strokeWidth={2} />
          <Text style={styles.route} numberOfLines={0} allowFontScaling={false}>
            {booking.route}
          </Text>
        </View>
        {booking.hasAssuredFee && (
          <Badge text="Assured Fee Added" variant="success" showIcon />
        )}
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Calendar size={16} color="#6B7280" strokeWidth={2} />
          <Text style={styles.detailText} numberOfLines={0} allowFontScaling={false}>
            {formatDate(booking.departureDate)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color="#6B7280" strokeWidth={2} />
          <Text style={styles.detailText} numberOfLines={0} allowFontScaling={false}>
            {booking.departureTime}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.pricing}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel} numberOfLines={0} allowFontScaling={false}>
            Base Fare
          </Text>
          <Text style={styles.priceValue} numberOfLines={1} allowFontScaling={false}>
            {formatCurrency(booking.baseFare)}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel} numberOfLines={0} allowFontScaling={false}>
            Taxes & Fees
          </Text>
          <Text style={styles.priceValue} numberOfLines={1} allowFontScaling={false}>
            {formatCurrency(booking.taxes)}
          </Text>
        </View>
        {booking.hasAssuredFee && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel} numberOfLines={0} allowFontScaling={false}>
              Assured Fee
            </Text>
            <Text style={styles.priceValue} numberOfLines={1} allowFontScaling={false}>
              {formatCurrency(booking.assuredFee)}
            </Text>
          </View>
        )}
        <View style={[styles.priceRow, styles.totalRow]}>
          <Text style={styles.totalLabel} numberOfLines={0} allowFontScaling={false}>
            Total
          </Text>
          <Text style={styles.totalValue} numberOfLines={1} allowFontScaling={false}>
            {formatCurrency(
              booking.baseFare + 
              booking.taxes + 
              (booking.hasAssuredFee ? booking.assuredFee : 0)
            )}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  route: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: '#111827',
    flexWrap: 'wrap',
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    lineHeight: typography.xl * 1.2,
  },
  details: {
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailText: {
    fontSize: typography.md,
    color: '#6B7280',
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  divider: {
    height: rs(1),
    backgroundColor: '#E5E7EB',
    marginVertical: spacing.lg,
  },
  pricing: {
    gap: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  priceLabel: {
    fontSize: typography.md,
    color: '#6B7280',
    fontWeight: '500',
    flexWrap: 'wrap',
    flex: 1,
  },
  priceValue: {
    fontSize: typography.md,
    color: '#111827',
    fontWeight: '600',
    textAlign: 'right',
  },
  totalRow: {
    paddingTop: spacing.sm,
    borderTopWidth: rs(1),
    borderTopColor: '#E5E7EB',
    marginTop: spacing.sm,
  },
  totalLabel: {
    fontSize: typography.lg,
    color: '#111827',
    fontWeight: '700',
    flexWrap: 'wrap',
    flex: 1,
  },
  totalValue: {
    fontSize: typography.lg,
    color: '#FF6B35',
    fontWeight: '700',
    textAlign: 'right',
  },
});