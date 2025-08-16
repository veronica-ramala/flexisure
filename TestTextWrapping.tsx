import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, typography, getWrapTextStyle, getResponsiveTextStyle } from '@/utils/responsive';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookingCard } from '@/components/booking/BookingCard';

// Test data with long text
const longBookingRoute = "New York - John F. Kennedy International Airport → Los Angeles International Airport - California";
const longButtonText = "Add Complete Protection Package with Full Flexibility and Priority Customer Support ($25)";
const longBadgeText = "Assured Fee Added with Complete Protection Coverage";

const testBooking = {
  id: '1',
  route: longBookingRoute,
  departureDate: '2024-12-15',
  departureTime: '10:00 AM',
  baseFare: 89,
  taxes: 15,
  assuredFee: 25,
  hasAssuredFee: true,
  status: 'draft' as const,
};

export default function TestTextWrapping() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title} numberOfLines={0} allowFontScaling={false}>
          Text Wrapping Test Screen
        </Text>
        <Text style={styles.subtitle} numberOfLines={0} allowFontScaling={false}>
          Testing that all text elements wrap properly without being cut off
        </Text>

        {/* Long Title Test */}
        <Card style={styles.testCard}>
          <Text style={styles.testHeader} numberOfLines={0} allowFontScaling={false}>
            Long Title Test
          </Text>
          <Text style={[styles.longTitle, getWrapTextStyle()]} numberOfLines={0} allowFontScaling={false}>
            This is an extremely long title that should wrap properly on multiple lines without being cut off at any screen size
          </Text>
        </Card>

        {/* Button Tests */}
        <Card style={styles.testCard}>
          <Text style={styles.testHeader} numberOfLines={0} allowFontScaling={false}>
            Button Text Wrapping
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title={longButtonText}
              onPress={() => console.log('Long button pressed')}
              size="large"
            />
            <Button
              title="Short Button"
              onPress={() => console.log('Short button pressed')}
              variant="outline"
            />
          </View>
        </Card>

        {/* Badge Tests */}
        <Card style={styles.testCard}>
          <Text style={styles.testHeader} numberOfLines={0} allowFontScaling={false}>
            Badge Text Wrapping
          </Text>
          <View style={styles.badgeContainer}>
            <Badge text={longBadgeText} variant="success" showIcon />
            <Badge text="Short Badge" variant="info" />
          </View>
        </Card>

        {/* BookingCard Test */}
        <View style={styles.testSection}>
          <Text style={styles.testHeader} numberOfLines={0} allowFontScaling={false}>
            BookingCard Test with Long Route
          </Text>
          <BookingCard booking={testBooking} />
        </View>

        {/* Multiple Column Layout Test */}
        <Card style={styles.testCard}>
          <Text style={styles.testHeader} numberOfLines={0} allowFontScaling={false}>
            Flex Layout Test
          </Text>
          <View style={styles.flexContainer}>
            <View style={styles.flexColumn}>
              <Text style={styles.flexLabel} numberOfLines={0} allowFontScaling={false}>
                Long Label That Should Wrap:
              </Text>
            </View>
            <View style={styles.flexColumn}>
              <Text style={styles.flexValue} numberOfLines={0} allowFontScaling={false}>
                Very Long Value That Should Also Wrap Properly
              </Text>
            </View>
          </View>
        </Card>

        {/* Typography Sizes Test */}
        <Card style={styles.testCard}>
          <Text style={styles.testHeader} numberOfLines={0} allowFontScaling={false}>
            Typography Sizes with Wrapping
          </Text>
          <Text style={[getResponsiveTextStyle('xs')]} numberOfLines={0} allowFontScaling={false}>
            Extra Small: This text should wrap properly at all screen sizes without being cut off
          </Text>
          <Text style={[getResponsiveTextStyle('sm')]} numberOfLines={0} allowFontScaling={false}>
            Small: This text should wrap properly at all screen sizes without being cut off
          </Text>
          <Text style={[getResponsiveTextStyle('md')]} numberOfLines={0} allowFontScaling={false}>
            Medium: This text should wrap properly at all screen sizes without being cut off
          </Text>
          <Text style={[getResponsiveTextStyle('lg')]} numberOfLines={0} allowFontScaling={false}>
            Large: This text should wrap properly at all screen sizes without being cut off
          </Text>
          <Text style={[getResponsiveTextStyle('xl')]} numberOfLines={0} allowFontScaling={false}>
            Extra Large: This text should wrap properly at all screen sizes
          </Text>
          <Text style={[getResponsiveTextStyle('heading')]} numberOfLines={0} allowFontScaling={false}>
            Heading: This text should wrap properly
          </Text>
        </Card>

        {/* Price Breakdown Test */}
        <Card style={styles.testCard}>
          <Text style={styles.testHeader} numberOfLines={0} allowFontScaling={false}>
            Price Row Test (Common Failure Point)
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel} numberOfLines={0} allowFontScaling={false}>
              Very Long Service Description Fee
            </Text>
            <Text style={styles.priceValue} numberOfLines={1} allowFontScaling={false}>
              $12,345.67
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel} numberOfLines={0} allowFontScaling={false}>
              Short Fee
            </Text>
            <Text style={styles.priceValue} numberOfLines={1} allowFontScaling={false}>
              $25.00
            </Text>
          </View>
        </Card>

        <Text style={styles.instructions} numberOfLines={0} allowFontScaling={false}>
          Test Instructions: Rotate device, change system font size, and test on different screen sizes. 
          All text should remain visible and properly wrapped.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
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
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
    lineHeight: typography.lg * 1.2,
  },
  testCard: {
    gap: spacing.md,
  },
  testSection: {
    gap: spacing.md,
  },
  testHeader: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: '#FF6B35',
    flexWrap: 'wrap',
    lineHeight: typography.xl * 1.2,
  },
  longTitle: {
    fontSize: typography.xxl,
    fontWeight: '700',
    color: '#111827',
    lineHeight: typography.xxl * 1.2,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  badgeContainer: {
    gap: spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  flexColumn: {
    flex: 1,
    minWidth: 0,
  },
  flexLabel: {
    fontSize: typography.md,
    color: '#6B7280',
    fontWeight: '500',
    flexWrap: 'wrap',
    lineHeight: typography.md * 1.2,
    flexShrink: 1,
    minWidth: 0,
  },
  flexValue: {
    fontSize: typography.md,
    color: '#111827',
    fontWeight: '600',
    textAlign: 'right',
    flexWrap: 'wrap',
    lineHeight: typography.md * 1.2,
    flexShrink: 1,
    minWidth: 0,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  priceLabel: {
    fontSize: typography.md,
    color: '#6B7280',
    fontWeight: '500',
    flexWrap: 'wrap',
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    lineHeight: typography.md * 1.2,
  },
  priceValue: {
    fontSize: typography.md,
    color: '#111827',
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 0,
    lineHeight: typography.md * 1.2,
  },
  instructions: {
    fontSize: typography.sm,
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.xl,
    flexWrap: 'wrap',
    lineHeight: typography.sm * 1.3,
    flexShrink: 1,
    minWidth: 0,
  },
});
