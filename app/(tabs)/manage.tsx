import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { spacing, typography, touchTarget } from '@/utils/responsive';
import { Card } from '@/components/ui/Card';
import { useApp } from '@/context/AppContext';
import {
  Calendar,
  MapPin,
  X,
  Phone,
  FileText,
  Share,
  ChevronRight,
} from 'lucide-react-native';

export default function ManageScreen() {
  const router = useRouter();
  const { state } = useApp();
  const { currentBooking } = state;

  const manageOptions = [
    {
      icon: Calendar,
      title: 'Change Trip Date/Time',
      subtitle: 'Modify your travel schedule',
      onPress: () => {
        // Navigate to date picker (mock)
        console.log('Change date/time');
      },
    },
    {
      icon: MapPin,
      title: 'Modify Route',
      subtitle: 'Change departure or destination',
      onPress: () => {
        // Navigate to route selection (mock)
        console.log('Modify route');
      },
    },
    {
      icon: X,
      title: 'Cancel Booking',
      subtitle: 'Cancel your trip and get refund',
      onPress: () => {
        router.push('/cancel-trip');
      },
      destructive: true,
    },
    {
      icon: Phone,
      title: 'Contact Support',
      subtitle: 'Get help with your booking',
      onPress: () => {
        router.push('/(tabs)/support');
      },
    },
    {
      icon: FileText,
      title: 'View Receipt',
      subtitle: 'Download or share your receipt',
      onPress: () => {
        console.log('View receipt');
      },
    },
    {
      icon: Share,
      title: 'Share Booking',
      subtitle: 'Send details to family or friends',
      onPress: () => {
        console.log('Share booking');
      },
    },
  ];

  if (!currentBooking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle} numberOfLines={0} allowFontScaling={false}>
            No Booking to Manage
          </Text>
          <Text style={styles.emptyText} numberOfLines={0} allowFontScaling={false}>
            Create a booking first to manage it
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
            Manage Booking
          </Text>
          <Text style={styles.subtitle} numberOfLines={0} allowFontScaling={false}>
            Make changes to your trip
          </Text>
        </View>

        <Card style={styles.bookingInfoCard}>
          <Text style={styles.bookingRoute} numberOfLines={0} allowFontScaling={false}>
            {currentBooking.route}
          </Text>
          <Text style={styles.bookingDate} numberOfLines={0} allowFontScaling={false}>
            {currentBooking.departureDate} at {currentBooking.departureTime}
          </Text>
          <Text style={styles.bookingStatus} numberOfLines={0} allowFontScaling={false}>
            Status: {currentBooking.status.charAt(0).toUpperCase() + currentBooking.status.slice(1)}
          </Text>
        </Card>

        <View style={styles.optionsContainer}>
          {manageOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionCard,
                option.destructive && styles.destructiveOption,
              ]}
              onPress={option.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionIcon}>
                  <option.icon
                    size={24}
                    color={option.destructive ? '#DC2626' : '#FF6B35'}
                    strokeWidth={2}
                  />
                </View>
                <View style={styles.optionText}>
                  <Text
                    style={[
                      styles.optionTitle,
                      option.destructive && styles.destructiveText,
                    ]}
                    numberOfLines={0}
                    allowFontScaling={false}
                  >
                    {option.title}
                  </Text>
                  <Text style={styles.optionSubtitle} numberOfLines={0} allowFontScaling={false}>
                    {option.subtitle}
                  </Text>
                </View>
                <ChevronRight
                  size={20}
                  color="#9CA3AF"
                  strokeWidth={2}
                />
              </View>
            </TouchableOpacity>
          ))}
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
  bookingInfoCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
  },
  bookingRoute: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: '#111827',
    marginBottom: spacing.xs,
    flexWrap: 'wrap',
    lineHeight: typography.xl * 1.2,
    flexShrink: 1,
    minWidth: 0,
  },
  bookingDate: {
    fontSize: typography.lg,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: spacing.xs,
    flexWrap: 'wrap',
    lineHeight: typography.lg * 1.2,
  },
  bookingStatus: {
    fontSize: typography.md,
    color: '#059669',
    fontWeight: '600',
    flexWrap: 'wrap',
    lineHeight: typography.md * 1.2,
  },
  optionsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minHeight: touchTarget(60),
  },
  destructiveOption: {
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.lg,
    minHeight: touchTarget(60),
  },
  optionIcon: {
    width: touchTarget(40),
    height: touchTarget(40),
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: '#111827',
    marginBottom: spacing.xs,
    flexWrap: 'wrap',
    lineHeight: typography.lg * 1.2,
    flexShrink: 1,
    minWidth: 0,
  },
  destructiveText: {
    color: '#DC2626',
  },
  optionSubtitle: {
    fontSize: typography.md,
    color: '#6B7280',
    fontWeight: '400',
    flexWrap: 'wrap',
    lineHeight: typography.md * 1.2,
    flexShrink: 1,
    minWidth: 0,
  },
});