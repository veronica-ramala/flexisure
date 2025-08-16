import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { spacing, typography, touchTarget } from '@/utils/responsive';
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building,
  Check,
} from 'lucide-react-native';

export default function PaymentMethodScreen() {
  const router = useRouter();
  const { state, formatCurrency } = useApp();
  const { currentBooking } = state;
  const [selectedMethod, setSelectedMethod] = useState<string>('card');

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    router.push('/payment-processing');
  };

  if (!currentBooking) {
    router.replace('/(tabs)');
    return null;
  }

  const total = currentBooking.baseFare + 
                currentBooking.taxes + 
                (currentBooking.hasAssuredFee ? currentBooking.assuredFee : 0);

  const paymentMethods = [
    {
      id: 'card',
      icon: CreditCard,
      title: 'Credit or Debit Card',
      subtitle: 'Visa, Mastercard, American Express',
      popular: true,
    },
    {
      id: 'apple-pay',
      icon: Smartphone,
      title: 'Apple Pay',
      subtitle: 'Touch ID or Face ID',
      available: true,
    },
    {
      id: 'google-pay',
      icon: Smartphone,
      title: 'Google Pay',
      subtitle: 'Quick and secure',
      available: true,
    },
    {
      id: 'bank',
      icon: Building,
      title: 'Bank Transfer',
      subtitle: 'Direct from your bank account',
      available: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#111827" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.title}>Payment Method</Text>
          <View style={styles.placeholder} />
        </View>

        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Trip: {currentBooking.route}</Text>
            <Text style={styles.summaryValue}>{formatCurrency(total)}</Text>
          </View>
          <Text style={styles.summaryNote}>
            {currentBooking.hasAssuredFee 
              ? 'Includes Assured Fee for full flexibility'
              : 'Standard booking terms apply'
            }
          </Text>
        </Card>

        <View style={styles.methodsSection}>
          <Text style={styles.methodsTitle}>Select Payment Method</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.selectedMethod,
              ]}
              onPress={() => setSelectedMethod(method.id)}
              activeOpacity={0.7}
            >
              <View style={styles.methodContent}>
                <View style={styles.methodIcon}>
                  <method.icon 
                    size={24} 
                    color={selectedMethod === method.id ? '#FF6B35' : '#6B7280'} 
                    strokeWidth={2} 
                  />
                </View>
                <View style={styles.methodText}>
                  <View style={styles.methodHeader}>
                    <Text style={styles.methodTitle}>{method.title}</Text>
                    {method.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>Popular</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
                </View>
                {selectedMethod === method.id && (
                  <Check size={20} color="#FF6B35" strokeWidth={2.5} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionSection}>
          <Button
            title="Cancel"
            onPress={handleBack}
            variant="outline"
            size="large"
            style={styles.actionButton}
          />
          <Button
            title="Continue to Payment"
            onPress={handleContinue}
            size="large"
            style={styles.actionButton}
          />
        </View>

        <View style={styles.securityNotice}>
          <Text style={styles.securityText}>
            🔒 Your payment information is encrypted and secure
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  summaryCard: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 18,
    color: '#FF6B35',
    fontWeight: '700',
  },
  summaryNote: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  methodsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  methodsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  methodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedMethod: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF7ED',
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodText: {
    flex: 1,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  popularBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  popularText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  methodSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  actionSection: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  actionButton: {
    flex: 1,
  },
  securityNotice: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  securityText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
});