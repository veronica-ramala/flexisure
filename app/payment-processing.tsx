import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { spacing, typography, touchTarget } from '@/utils/responsive';
import { CircleCheck as CheckCircle, CreditCard } from 'lucide-react-native';

export default function PaymentProcessingScreen() {
  const router = useRouter();
  const { state, formatCurrency } = useApp();
  const { currentBooking } = state;
  const [paymentStep, setPaymentStep] = useState<'processing' | 'success' | 'error'>('processing');

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      // 90% success rate simulation
      const success = Math.random() > 0.1;
      setPaymentStep(success ? 'success' : 'error');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
    }, 2000);
  };

  const handleComplete = () => {
    router.replace('/(tabs)');
  };

  if (!currentBooking) {
    router.replace('/(tabs)');
    return null;
  }

  const total = currentBooking.baseFare + 
                currentBooking.taxes + 
                (currentBooking.hasAssuredFee ? currentBooking.assuredFee : 0);

  if (paymentStep === 'processing') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.processingContainer}>
          <LoadingSpinner size={64} color="#FF6B35" />
          <Text style={styles.processingTitle}>Processing Payment</Text>
          <Text style={styles.processingSubtitle}>
            Please wait while we process your payment of {formatCurrency(total)}
          </Text>
          <View style={styles.securityNotice}>
            <CreditCard size={16} color="#6B7280" strokeWidth={2} />
            <Text style={styles.securityText}>Secure payment processing</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (paymentStep === 'success') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <CheckCircle size={64} color="#059669" strokeWidth={2} />
          </View>
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successSubtitle}>
            Your booking for {currentBooking.route} has been confirmed
          </Text>
          
          <View style={styles.confirmationDetails}>
            <Text style={styles.confirmationLabel}>Confirmation Number</Text>
            <Text style={styles.confirmationNumber}>FL-{currentBooking.id.slice(-6).toUpperCase()}</Text>
            <Text style={styles.confirmationNote}>
              You'll receive an email confirmation shortly
            </Text>
          </View>

          <Button
            title="View Booking"
            onPress={handleComplete}
            size="large"
            style={styles.completeButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>❌</Text>
        <Text style={styles.errorTitle}>Payment Failed</Text>
        <Text style={styles.errorSubtitle}>
          We couldn't process your payment. Please try again or use a different payment method.
        </Text>
        
        <View style={styles.errorActions}>
          <Button
            title="Try Again"
            onPress={handleRetry}
            size="large"
            style={styles.retryButton}
          />
          <Button
            title="Change Payment Method"
            onPress={() => router.back()}
            variant="outline"
            size="large"
            style={styles.retryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 24,
  },
  processingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  processingSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  securityText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 20,
  },
  successIcon: {
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#059669',
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  confirmationDetails: {
    alignItems: 'center',
    gap: 8,
    marginVertical: 24,
  },
  confirmationLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  confirmationNumber: {
    fontSize: 20,
    color: '#111827',
    fontWeight: '700',
    letterSpacing: 1,
  },
  confirmationNote: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
    textAlign: 'center',
  },
  completeButton: {
    width: '100%',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 20,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#DC2626',
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  errorActions: {
    width: '100%',
    gap: 12,
    marginTop: 24,
  },
  retryButton: {
    width: '100%',
  },
});