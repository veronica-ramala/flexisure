import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookingCard } from '@/components/booking/BookingCard';
import { spacing, typography, getResponsiveTextStyle, getTextContainerStyle } from '@/utils/responsive';
import { useApp } from '@/context/AppContext';

export default function TestResponsiveCards() {
  const { state } = useApp();
  const { currentBooking } = state;

  const longText = "This is a very long text that should wrap properly on narrow screens like iPhone SE while remaining fully readable on wider screens like iPhone 14 Pro Max in both portrait and landscape orientations.";
  const veryLongText = "This is an extremely long booking title that might contain detailed route information, flight numbers, and additional details that need to wrap gracefully across multiple lines without breaking the card layout or becoming unreadable on any device size or orientation.";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, getResponsiveTextStyle('heading')]}>
            Responsive Text Test
          </Text>
          <Text style={[styles.subtitle, getResponsiveTextStyle('lg')]}>
            Testing text wrapping on various card components
          </Text>
        </View>

        {/* Test Basic Card with Long Text */}
        <Card style={styles.testCard}>
          <Text style={[styles.cardTitle, getResponsiveTextStyle('xl')]}>
            Basic Card Test
          </Text>
          <View style={getTextContainerStyle()}>
            <Text style={[styles.cardText, getResponsiveTextStyle('md')]}>
              {longText}
            </Text>
          </View>
        </Card>

        {/* Test Badge Component */}
        <Card style={styles.testCard}>
          <Text style={[styles.cardTitle, getResponsiveTextStyle('xl')]}>
            Badge Test
          </Text>
          <View style={styles.badgeRow}>
            <Badge text="Short" variant="success" showIcon />
            <Badge text="Medium length badge text" variant="warning" />
            <Badge text="Very long badge text that should wrap nicely" variant="info" />
          </View>
        </Card>

        {/* Test Button Component */}
        <Card style={styles.testCard}>
          <Text style={[styles.cardTitle, getResponsiveTextStyle('xl')]}>
            Button Test
          </Text>
          <View style={styles.buttonRow}>
            <Button 
              title="Short" 
              onPress={() => {}} 
              size="small"
            />
            <Button 
              title="Medium length button text" 
              onPress={() => {}} 
              size="medium"
            />
          </View>
          <Button 
            title="Very long button text that should wrap properly across multiple lines" 
            onPress={() => {}} 
            size="large"
            style={styles.fullWidthButton}
          />
        </Card>

        {/* Test Booking Card if available */}
        {currentBooking && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, getResponsiveTextStyle('xl')]}>
              Booking Card Test
            </Text>
            <BookingCard booking={currentBooking} />
          </View>
        )}

        {/* Test Complex Card Layout */}
        <Card style={styles.testCard}>
          <View style={styles.complexHeader}>
            <View style={[styles.titleContainer, getTextContainerStyle()]}>
              <Text style={[styles.complexTitle, getResponsiveTextStyle('xl')]}>
                {veryLongText}
              </Text>
            </View>
            <Badge text="Status" variant="success" />
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={[styles.detailRow, getTextContainerStyle()]}>
              <Text style={[styles.detailLabel, getResponsiveTextStyle('md')]}>
                Very Long Label Name:
              </Text>
              <Text style={[styles.detailValue, getResponsiveTextStyle('md')]}>
                Very Long Value That Should Wrap
              </Text>
            </View>
            
            <View style={[styles.detailRow, getTextContainerStyle()]}>
              <Text style={[styles.detailLabel, getResponsiveTextStyle('md')]}>
                Short:
              </Text>
              <Text style={[styles.detailValue, getResponsiveTextStyle('md')]}>
                Value
              </Text>
            </View>
          </View>

          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, getResponsiveTextStyle('lg')]}>
                Total Amount with Tax
              </Text>
              <Text style={[styles.priceValue, getResponsiveTextStyle('xl')]}>
                $1,234.56
              </Text>
            </View>
          </View>
        </Card>

        {/* Screen Size Info */}
        <Card style={styles.testCard}>
          <Text style={[styles.cardTitle, getResponsiveTextStyle('xl')]}>
            Screen Info
          </Text>
          <Text style={[styles.cardText, getResponsiveTextStyle('md')]}>
            Test this component on different devices:
          </Text>
          <Text style={[styles.cardText, getResponsiveTextStyle('sm')]}>
            • iPhone SE (narrow)
          </Text>
          <Text style={[styles.cardText, getResponsiveTextStyle('sm')]}>
            • iPhone 14 Pro Max (wide)
          </Text>
          <Text style={[styles.cardText, getResponsiveTextStyle('sm')]}>
            • Both portrait and landscape
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  title: {
    fontWeight: '800',
    color: '#111827',
    marginBottom: spacing.xs,
    ...getTextContainerStyle(),
  },
  subtitle: {
    color: '#6B7280',
    fontWeight: '500',
    ...getTextContainerStyle(),
  },
  testCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontWeight: '700',
    color: '#111827',
    marginBottom: spacing.sm,
    ...getTextContainerStyle(),
  },
  cardText: {
    color: '#6B7280',
    fontWeight: '400',
    lineHeight: typography.md * 1.5,
    ...getTextContainerStyle(),
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  fullWidthButton: {
    width: '100%',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    ...getTextContainerStyle(),
  },
  complexHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  complexTitle: {
    fontWeight: '700',
    color: '#111827',
  },
  detailsContainer: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  detailLabel: {
    color: '#6B7280',
    fontWeight: '500',
    flex: 1,
  },
  detailValue: {
    color: '#111827',
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 0,
  },
  priceSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  priceLabel: {
    color: '#111827',
    fontWeight: '700',
    flex: 1,
    ...getTextContainerStyle(),
  },
  priceValue: {
    color: '#FF6B35',
    fontWeight: '700',
    textAlign: 'right',
    flexShrink: 0,
  },
});