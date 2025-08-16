import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { spacing, typography, touchTarget } from '@/utils/responsive';
import { MessageCircle, Phone, Mail, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';

export default function SupportScreen() {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      available: '24/7',
      onPress: () => {
        console.log('Open live chat');
      },
    },
    {
      icon: Phone,
      title: 'Call Support',
      subtitle: '+1 (555) 123-4567',
      available: '9 AM - 9 PM EST',
      onPress: () => {
        console.log('Call support');
      },
    },
    {
      icon: Mail,
      title: 'Email Support',
      subtitle: 'support@flexisure.com',
      available: 'Response in 2-4 hours',
      onPress: () => {
        console.log('Email support');
      },
    },
    {
      icon: HelpCircle,
      title: 'FAQ',
      subtitle: 'Find answers to common questions',
      available: 'Self-service',
      onPress: () => {
        console.log('Open FAQ');
      },
    },
  ];

  const faqCategories = [
    'Booking & Payment',
    'Cancellations & Refunds',
    'Changes & Modifications',
    'Assured Fee Details',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Support Center</Text>
          <Text style={styles.subtitle}>We're here to help you</Text>
        </View>

        <Card style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Phone size={24} color="#DC2626" strokeWidth={2} />
            <View>
              <Text style={styles.emergencyTitle}>Emergency Support</Text>
              <Text style={styles.emergencySubtitle}>For urgent travel issues</Text>
            </View>
          </View>
          <Text style={styles.emergencyNumber}>+1 (555) 911-HELP</Text>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Options</Text>
          <View style={styles.optionsContainer}>
            {supportOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionCard}
                onPress={option.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionIcon}>
                    <option.icon size={24} color="#FF6B35" strokeWidth={2} />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                    <Text style={styles.optionAvailable}>{option.available}</Text>
                  </View>
                  <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Topics</Text>
          <Card style={styles.faqCard}>
            {faqCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.faqItem,
                  index !== faqCategories.length - 1 && styles.faqItemBorder,
                ]}
                onPress={() => console.log(`Open FAQ: ${category}`)}
                activeOpacity={0.7}
              >
                <Text style={styles.faqTitle}>{category}</Text>
                <ChevronRight size={16} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
            ))}
          </Card>
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
  },
  subtitle: {
    fontSize: typography.lg,
    color: '#6B7280',
    fontWeight: '500',
  },
  emergencyCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.sm,
  },
  emergencyTitle: {
    fontSize: typography.lg,
    fontWeight: '700',
    color: '#991B1B',
    flexWrap: 'wrap',
  },
  emergencySubtitle: {
    fontSize: typography.md,
    color: '#B91C1C',
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  emergencyNumber: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: '#DC2626',
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
  },
  optionsContainer: {
    paddingHorizontal: spacing.lg,
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
    minHeight: touchTarget(80),
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.lg,
    minHeight: touchTarget(80),
  },
  optionIcon: {
    width: touchTarget(40),
    height: touchTarget(40),
    borderRadius: 20,
    backgroundColor: '#FFF7ED',
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
  },
  optionSubtitle: {
    fontSize: typography.md,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: spacing.xs,
    flexWrap: 'wrap',
  },
  optionAvailable: {
    fontSize: typography.sm,
    color: '#059669',
    fontWeight: '600',
  },
  faqCard: {
    marginHorizontal: spacing.lg,
    padding: 0,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    minHeight: touchTarget(60),
  },
  faqItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  faqTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: '#111827',
    flexWrap: 'wrap',
    flex: 1,
  },
});