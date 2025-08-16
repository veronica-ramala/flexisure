import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { spacing, typography, touchTarget } from '@/utils/responsive';
import { useApp } from '@/context/AppContext';
import {
  Globe,
  DollarSign,
  Calendar,
  Clock,
  Bell,
  Shield,
  FileText,
  ChevronRight,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { state, dispatch } = useApp();
  const { preferences } = state;

  const toggleNotification = (key: keyof typeof preferences.notifications) => {
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: {
        notifications: {
          ...preferences.notifications,
          [key]: !preferences.notifications[key],
        },
      },
    });
  };

  const settingsSections = [
    {
      title: 'Language & Region',
      items: [
        {
          icon: Globe,
          title: 'Language',
          value: 'English',
          onPress: () => console.log('Change language'),
        },
        {
          icon: DollarSign,
          title: 'Currency',
          value: preferences.currency,
          onPress: () => console.log('Change currency'),
        },
        {
          icon: Calendar,
          title: 'Date Format',
          value: preferences.dateFormat,
          onPress: () => console.log('Change date format'),
        },
        {
          icon: Clock,
          title: 'Time Format',
          value: preferences.timeFormat,
          onPress: () => console.log('Change time format'),
        },
      ],
    },
    {
      title: 'Privacy & Legal',
      items: [
        {
          icon: Shield,
          title: 'Privacy Policy',
          onPress: () => console.log('Open privacy policy'),
        },
        {
          icon: FileText,
          title: 'Terms of Service',
          onPress: () => console.log('Open terms'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={0} allowFontScaling={false}>
            Settings
          </Text>
          <Text style={styles.subtitle} numberOfLines={0} allowFontScaling={false}>
            Customize your app experience
          </Text>
        </View>

        <View style={styles.section}>
                      <Text style={styles.sectionTitle} numberOfLines={0} allowFontScaling={false}>
              Notifications
            </Text>
          <Card style={styles.notificationsCard}>
            <View style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Bell size={20} color="#FF6B35" strokeWidth={2} />
                <View>
                  <Text style={styles.notificationTitle} numberOfLines={0} allowFontScaling={false}>
                    Booking Confirmations
                  </Text>
                  <Text style={styles.notificationSubtitle} numberOfLines={0} allowFontScaling={false}>
                    Get notified when bookings are confirmed
                  </Text>
                </View>
              </View>
              <Switch
                value={preferences.notifications.bookingConfirmations}
                onValueChange={() => toggleNotification('bookingConfirmations')}
                trackColor={{ false: '#D1D5DB', true: '#FF6B35' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={[styles.notificationItem, styles.notificationBorder]}>
              <View style={styles.notificationInfo}>
                <Bell size={20} color="#FF6B35" strokeWidth={2} />
                <View>
                  <Text style={styles.notificationTitle} numberOfLines={0} allowFontScaling={false}>
                    Trip Reminders
                  </Text>
                  <Text style={styles.notificationSubtitle} numberOfLines={0} allowFontScaling={false}>
                    Reminders before your trip
                  </Text>
                </View>
              </View>
              <Switch
                value={preferences.notifications.tripReminders}
                onValueChange={() => toggleNotification('tripReminders')}
                trackColor={{ false: '#D1D5DB', true: '#FF6B35' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={[styles.notificationItem, styles.notificationBorder]}>
              <View style={styles.notificationInfo}>
                <Bell size={20} color="#FF6B35" strokeWidth={2} />
                <View>
                  <Text style={styles.notificationTitle} numberOfLines={0} allowFontScaling={false}>
                    Price Alerts
                  </Text>
                  <Text style={styles.notificationSubtitle} numberOfLines={0} allowFontScaling={false}>
                    Notifications about price changes
                  </Text>
                </View>
              </View>
              <Switch
                value={preferences.notifications.priceAlerts}
                onValueChange={() => toggleNotification('priceAlerts')}
                trackColor={{ false: '#D1D5DB', true: '#FF6B35' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </Card>
        </View>

        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle} numberOfLines={0} allowFontScaling={false}>
              {section.title}
            </Text>
            <Card style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex !== section.items.length - 1 && styles.settingBorder,
                  ]}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingInfo}>
                    <item.icon size={20} color="#FF6B35" strokeWidth={2} />
                    <Text style={styles.settingTitle} numberOfLines={0} allowFontScaling={false}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.settingRight}>
                    {item.value && (
                      <Text style={styles.settingValue} numberOfLines={1} allowFontScaling={false}>
                        {item.value}
                      </Text>
                    )}
                    <ChevronRight size={16} color="#9CA3AF" strokeWidth={2} />
                  </View>
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        ))}

        <View style={styles.appInfo}>
          <Text style={styles.appInfoText} numberOfLines={1} allowFontScaling={false}>
            FlexiSure v1.0.0
          </Text>
          <Text style={styles.appInfoSubtext} numberOfLines={0} allowFontScaling={false}>
            Made with ❤️ for travelers
          </Text>
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
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    flexWrap: 'wrap',
    lineHeight: typography.xl * 1.2,
  },
  notificationsCard: {
    marginHorizontal: spacing.lg,
    padding: 0,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    minHeight: touchTarget(60),
  },
  notificationBorder: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    paddingRight: spacing.sm,
  },
  notificationTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: '#111827',
    marginBottom: spacing.xs,
    flexWrap: 'wrap',
    lineHeight: typography.lg * 1.2,
    flexShrink: 1,
    minWidth: 0,
  },
  notificationSubtitle: {
    fontSize: typography.md,
    color: '#6B7280',
    fontWeight: '400',
    flexWrap: 'wrap',
    lineHeight: typography.md * 1.2,
    flexShrink: 1,
    minWidth: 0,
  },
  settingsCard: {
    marginHorizontal: spacing.lg,
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    minHeight: touchTarget(60),
  },
  settingBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  settingTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: '#111827',
    flexWrap: 'wrap',
    lineHeight: typography.lg * 1.2,
    flexShrink: 1,
    minWidth: 0,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingValue: {
    fontSize: typography.md,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'right',
    flexWrap: 'wrap',
    lineHeight: typography.md * 1.2,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.xs,
  },
  appInfoText: {
    fontSize: typography.md,
    color: '#9CA3AF',
    fontWeight: '600',
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: typography.md * 1.2,
  },
  appInfoSubtext: {
    fontSize: typography.sm,
    color: '#D1D5DB',
    fontWeight: '400',
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: typography.sm * 1.2,
  },
});