import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { spacing, typography, touchTarget } from '@/utils/responsive';
import { BookingCard } from '@/components/booking/BookingCard';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { Info } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { currentBooking } = state;

  const handleViewBookingDetails = () => {
    router.push('/booking-details');
  };

  const handleAddAssuredFee = () => {
    router.push('/add-assured-fee');
  };

  const handleManageBooking = () => {
    router.push('/(tabs)/manage');
  };

  const handleCompleteBooking = () => {
    router.push('/payment-method');
  };

  if (!currentBooking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle} numberOfLines={0} allowFontScaling={false}>
            No Active Booking
          </Text>
          <Text style={styles.emptyText} numberOfLines={0} allowFontScaling={false}>
            Start by searching for your next trip
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={0} allowFontScaling={false}>
            Your Booking
          </Text>
          <Text style={styles.subtitle} numberOfLines={0} allowFontScaling={false}>
            Review your trip details and options
          </Text>
        </View>

        <BookingCard booking={currentBooking} />

        <View style={styles.quickActionsSection}>
          <Button
            title="📋 View Booking Details"
            onPress={handleViewBookingDetails}
            size="large"
            style={styles.viewDetailsButton}
          />
        </View>

        {!currentBooking.hasAssuredFee && (
          <View style={styles.assuredFeeSection}>
            <View style={styles.infoHeader}>
              <Info size={20} color="#FF6B35" strokeWidth={2} />
              <Text style={styles.infoTitle} numberOfLines={0} allowFontScaling={false}>
                Add Peace of Mind
              </Text>
            </View>
            <Text style={styles.infoText} numberOfLines={0} allowFontScaling={false}>
              Add our Assured Fee for full flexibility and priority support
            </Text>
            <Button
              title="Add Assured Fee ($25)"
              onPress={handleAddAssuredFee}
              size="large"
              style={styles.assuredFeeButton}
            />
          </View>
        )}

        <View style={styles.actionSection}>
          {currentBooking.hasAssuredFee ? (
            <>
              <Button
                title="Manage Booking"
                onPress={handleManageBooking}
                variant="outline"
                size="large"
                style={styles.actionButton}
              />
              <Button
                title="Complete Booking"
                onPress={handleCompleteBooking}
                size="large"
                style={styles.actionButton}
              />
            </>
          ) : (
            <Button
              title="Quick Book"
              onPress={handleCompleteBooking}
              variant="secondary"
              size="large"
              style={styles.actionButton}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: typography.heading,
    fontWeight: '800',
    color: '#111827',
    marginBottom: spacing.xs,
    flexWrap: 'wrap',
    lineHeight: typography.heading * 1.2,
  },
  subtitle: {
    fontSize: typography.lg,
    color: '#6B7280',
    fontWeight: '500',
    flexWrap: 'wrap',
    lineHeight: typography.lg * 1.2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.xxxl,
    fontWeight: '700',
    color: '#111827',
    marginBottom: spacing.sm,
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: typography.xxxl * 1.2,
  },
  emptyText: {
    fontSize: typography.lg,
    color: '#6B7280',
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: typography.lg * 1.2,
    flexShrink: 1,
    minWidth: 0,
  },
  quickActionsSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  viewDetailsButton: {
    backgroundColor: '#374151',
    borderColor: '#374151',
    minHeight: touchTarget(50),
  },
  assuredFeeSection: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  infoTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: '#EA580C',
    flexWrap: 'wrap',
    lineHeight: typography.lg * 1.2,
  },
  infoText: {
    fontSize: typography.md,
    color: '#9A3412',
    marginBottom: spacing.lg,
    lineHeight: typography.md * 1.5,
    flexWrap: 'wrap',
    flexShrink: 1,
    minWidth: 0,
  },
  assuredFeeButton: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
    minHeight: touchTarget(50),
  },
  actionSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  actionButton: {
    width: '100%',
    minHeight: touchTarget(50),
  },
});