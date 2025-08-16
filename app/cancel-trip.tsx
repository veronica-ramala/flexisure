import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  TouchableOpacity,
  Pressable,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  DollarSign, 
  Clock, 
  RefreshCw, 
  Phone, 
  Shield,
  Heart,
  TrendingUp,
  Calendar,
  Users,
  Plane
} from 'lucide-react-native';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useApp } from '@/context/AppContext';
import { wp, hp, spacing, typography, touchTarget, rs } from '@/utils/responsive';

const { width, height } = Dimensions.get('window');

interface RefundCalculation {
  originalFare: number;
  taxes: number;
  cancellationFee: number;
  assuredFee: number;
  totalRefund: number;
  processingDays: string;
  savedAmount?: number;
}

export default function CancelTripScreen() {
  const router = useRouter();
  const { state, dispatch, formatCurrency, calculateRefund } = useApp();
  const { currentBooking, isLoading } = state;
  
  const [isCancelling, setIsCancelling] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState<'initial' | 'alternatives' | 'final'>('initial');
  const [cancelButtonEnabled, setCancelButtonEnabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3);
  const [hasError, setHasError] = useState(false);

  // Animation values
  const screenOpacity = useSharedValue(0);
  const warningPulse = useSharedValue(1);
  const refundDetailsOpacity = useSharedValue(0);
  const refundDetailsTranslateY = useSharedValue(30);
  const alternativesOpacity = useSharedValue(0);
  const alternativesScale = useSharedValue(0.95);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(20);

  // Animated styles
  const screenAnimatedStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const warningAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: warningPulse.value }],
  }));

  const refundDetailsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: refundDetailsOpacity.value,
    transform: [{ translateY: refundDetailsTranslateY.value }],
  }));

  const alternativesAnimatedStyle = useAnimatedStyle(() => ({
    opacity: alternativesOpacity.value,
    transform: [{ scale: alternativesScale.value }],
  }));

  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  useEffect(() => {
    // Entry animations
    const startAnimations = () => {
      screenOpacity.value = withTiming(1, { duration: 600 });
      
      // Warning card gentle pulse
      warningPulse.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        false
      );

      // Refund details animate in
      refundDetailsOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
      refundDetailsTranslateY.value = withDelay(400, withSpring(0, { damping: 8, stiffness: 100 }));

      // Alternatives section
      alternativesOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
      alternativesScale.value = withDelay(800, withSpring(1, { damping: 8, stiffness: 100 }));

      // Action buttons
      buttonsOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));
      buttonsTranslateY.value = withDelay(1200, withSpring(0, { damping: 8, stiffness: 100 }));
    };

    startAnimations();
  }, []);

  useEffect(() => {
    // 3-second delay before enabling cancel button
    if (confirmationStep === 'final') {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setCancelButtonEnabled(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [confirmationStep]);

  const calculateDetailedRefund = (): RefundCalculation => {
    if (!currentBooking) {
      return {
        originalFare: 0,
        taxes: 0,
        cancellationFee: 0,
        assuredFee: 0,
        totalRefund: 0,
        processingDays: '5-7 business days'
      };
    }

    const { baseFare, taxes, assuredFee, hasAssuredFee } = currentBooking;

    if (hasAssuredFee) {
      // With Assured Fee - Full protection
      return {
        originalFare: baseFare,
        taxes: taxes,
        cancellationFee: 0,
        assuredFee: assuredFee,
        totalRefund: baseFare + taxes,
        processingDays: '3-5 business days',
        savedAmount: 30 // Standard cancellation fee + faster processing
      };
    } else {
      // Without Assured Fee - Standard policy
      const cancellationFee = 15;
      return {
        originalFare: baseFare,
        taxes: taxes,
        cancellationFee: cancellationFee,
        assuredFee: 0,
        totalRefund: baseFare - cancellationFee,
        processingDays: '5-7 business days'
      };
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleChangeTrip = () => {
    Alert.alert(
      'Change Your Trip',
      'Let us help you find a better time or date that works for you.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Find New Flight', onPress: () => router.push('/(tabs)') }
      ]
    );
  };

  const handleCancelLater = () => {
    Alert.alert(
      'Cancel Later',
      'You can cancel your trip anytime before departure. Would you like us to remind you?',
      [
        { text: 'No Thanks', style: 'cancel' },
        { text: 'Set Reminder', onPress: () => router.back() }
      ]
    );
  };

  const handleTalkToSupport = () => {
    Alert.alert(
      'Talk to Support',
      'Our team is here to help. We might be able to find a solution that works better for you.',
      [
        { text: 'Maybe Later', style: 'cancel' },
        { text: 'Call Now', onPress: () => console.log('Calling support...') },
        { text: 'Start Chat', onPress: () => console.log('Opening chat...') }
      ]
    );
  };

  const handleInitialCancel = () => {
    // Show alternatives first
    setConfirmationStep('alternatives');
  };

  const handleProceedToFinalCancel = () => {
    setConfirmationStep('final');
    setTimeRemaining(3);
    setCancelButtonEnabled(false);
  };

  const handleFinalCancellation = async () => {
    setIsCancelling(true);
    setHasError(false);
    
    try {
      // Simulate API call with potential failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // 90% success rate
            resolve(true);
          } else {
            reject(new Error('Network error'));
          }
        }, 2500);
      });
      
      dispatch({ type: 'CANCEL_BOOKING' });
      
      const refundInfo = calculateDetailedRefund();
      Alert.alert(
        'Trip Cancelled Successfully',
        `Your booking has been cancelled.\n\nRefund: ${formatCurrency(refundInfo.totalRefund)}\nProcessing: ${refundInfo.processingDays}\n\nConfirmation sent to your email.`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error) {
      setHasError(true);
      Alert.alert(
        'Cancellation Failed',
        'We encountered an issue processing your cancellation. Please try again or contact support.',
        [
          { text: 'Retry', onPress: handleFinalCancellation },
          { text: 'Contact Support', onPress: handleTalkToSupport },
          { text: 'Go Back', style: 'cancel', onPress: () => setConfirmationStep('initial') }
        ]
      );
    } finally {
      setIsCancelling(false);
    }
  };

  if (!currentBooking) {
    router.replace('/(tabs)');
    return null;
  }

  const refundInfo = calculateDetailedRefund();

  return (
    <Animated.View style={[styles.container, screenAnimatedStyle]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Enhanced Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#111827" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.title}>Cancel Trip</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Warning Card with Pulse Animation */}
          <Animated.View style={[styles.warningSection, warningAnimatedStyle]}>
            <LinearGradient
              colors={['#FFFBEB', '#FEF3C7']}
              style={styles.warningCard}
            >
              <View style={styles.warningContent}>
                <View style={styles.warningIconContainer}>
                  <AlertTriangle size={28} color="#F59E0B" strokeWidth={2.5} />
                </View>
                <View style={styles.warningTextContainer}>
                  <Text style={styles.warningTitle}>You're about to cancel your trip</Text>
                  <Text style={styles.warningSubtitle}>Let's make sure this is what you want</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Trip Details Card */}
          <View style={styles.tripDetailsSection}>
            <View style={styles.tripDetailsCard}>
              <View style={styles.tripHeader}>
                <Plane size={20} color="#FF6B35" strokeWidth={2} />
                <Text style={styles.tripDetailsTitle}>Trip Details</Text>
              </View>
              
              <View style={styles.tripInfoGrid}>
                <View style={styles.tripInfoItem}>
                  <Text style={styles.tripRoute}>{currentBooking.route || 'New York → Boston'}</Text>
                </View>
                
                <View style={styles.tripInfoRow}>
                  <View style={styles.tripInfoItem}>
                    <Calendar size={16} color="#6B7280" />
                    <Text style={styles.tripInfoText}>
                      {currentBooking.departureDate || 'Thu, May 20'}
                    </Text>
                  </View>
                  
                  <View style={styles.tripInfoItem}>
                    <Clock size={16} color="#6B7280" />
                    <Text style={styles.tripInfoText}>
                      {currentBooking.departureTime || '10:00 AM'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.tripInfoItem}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.tripInfoText}>1 Passenger</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Refund Breakdown - Conditional Display */}
          <Animated.View style={[styles.refundSection, refundDetailsAnimatedStyle]}>
            {currentBooking.hasAssuredFee ? (
              // WITH Assured Fee
              <LinearGradient
                colors={['#F0FDF4', '#DCFCE7']}
                style={styles.refundCard}
              >
                <View style={styles.refundHeader}>
                  <Shield size={24} color="#10B981" strokeWidth={2.5} />
                  <Text style={styles.refundHeaderText}>💚 Good News! You have Assured Fee Protection</Text>
                </View>

                <View style={styles.refundBreakdown}>
                  <View style={styles.refundRow}>
                    <View style={styles.refundRowLeft}>
                      <CheckCircle size={16} color="#10B981" />
                      <Text style={styles.refundLabel}>Fare + taxes refund:</Text>
                    </View>
                    <Text style={styles.refundValuePositive}>
                      {formatCurrency(refundInfo.originalFare + refundInfo.taxes)}
                    </Text>
                  </View>

                  <View style={styles.refundRow}>
                    <View style={styles.refundRowLeft}>
                      <X size={16} color="#EF4444" />
                      <Text style={styles.refundLabel}>Assured fee:</Text>
                    </View>
                    <Text style={styles.refundValueNegative}>
                      {formatCurrency(refundInfo.assuredFee)} (non-refundable)
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={[styles.refundRow, styles.totalRefundRow]}>
                    <Text style={styles.refundTotalLabel}>💰 Your refund:</Text>
                    <Text style={styles.refundTotalValue}>
                      {formatCurrency(refundInfo.totalRefund)}
                    </Text>
                  </View>

                  <View style={styles.refundTimelineRow}>
                    <Clock size={16} color="#10B981" />
                    <Text style={styles.refundTimeline}>
                      ⏱️ Processing: {refundInfo.processingDays}
                    </Text>
                  </View>
                </View>

                {refundInfo.savedAmount && (
                  <View style={styles.savingsHighlight}>
                    <TrendingUp size={16} color="#10B981" />
                    <Text style={styles.savingsText}>
                      Your Assured Fee just saved you ${refundInfo.savedAmount}! 🎉
                    </Text>
                  </View>
                )}
              </LinearGradient>
            ) : (
              // WITHOUT Assured Fee
              <LinearGradient
                colors={['#FFF7ED', '#FFEDD5']}
                style={styles.refundCard}
              >
                <View style={styles.refundHeader}>
                  <AlertTriangle size={24} color="#F59E0B" strokeWidth={2.5} />
                  <Text style={styles.refundHeaderText}>⚠️ Standard Cancellation Policy</Text>
                </View>

                <View style={styles.refundBreakdown}>
                  <View style={styles.refundRow}>
                    <View style={styles.refundRowLeft}>
                      <CheckCircle size={16} color="#10B981" />
                      <Text style={styles.refundLabel}>Original fare:</Text>
                    </View>
                    <Text style={styles.refundValuePositive}>
                      {formatCurrency(refundInfo.originalFare)}
                    </Text>
                  </View>

                  <View style={styles.refundRow}>
                    <View style={styles.refundRowLeft}>
                      <X size={16} color="#EF4444" />
                      <Text style={styles.refundLabel}>Cancellation fee:</Text>
                    </View>
                    <Text style={styles.refundValueNegative}>
                      -{formatCurrency(refundInfo.cancellationFee)}
                    </Text>
                  </View>

                  <View style={styles.refundRow}>
                    <View style={styles.refundRowLeft}>
                      <X size={16} color="#EF4444" />
                      <Text style={styles.refundLabel}>Non-refundable taxes:</Text>
                    </View>
                    <Text style={styles.refundValueNegative}>
                      -{formatCurrency(refundInfo.taxes)}
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={[styles.refundRow, styles.totalRefundRow]}>
                    <Text style={styles.refundTotalLabel}>💰 Your refund:</Text>
                    <Text style={styles.refundTotalValue}>
                      {formatCurrency(refundInfo.totalRefund)}
                    </Text>
                  </View>

                  <View style={styles.refundTimelineRow}>
                    <Clock size={16} color="#F59E0B" />
                    <Text style={styles.refundTimeline}>
                      ⏱️ Processing: {refundInfo.processingDays}
                    </Text>
                  </View>
                </View>

                <View style={styles.assuredFeePromo}>
                  <Shield size={16} color="#FF6B35" />
                  <Text style={styles.assuredFeePromoText}>
                    💡 Next time, add Assured Fee for full refund + faster processing
                  </Text>
                </View>
              </LinearGradient>
            )}
          </Animated.View>

          {/* Alternative Options Card */}
          {confirmationStep === 'initial' && (
            <Animated.View style={[styles.alternativesSection, alternativesAnimatedStyle]}>
              <View style={styles.alternativesCard}>
                <Text style={styles.alternativesTitle}>🤔 Consider These Options Instead</Text>
                
                <TouchableOpacity style={styles.alternativeOption} onPress={handleChangeTrip}>
                  <View style={styles.alternativeIconContainer}>
                    <RefreshCw size={20} color="#FF6B35" strokeWidth={2} />
                  </View>
                  <View style={styles.alternativeContent}>
                    <Text style={styles.alternativeTitle}>🔄 Change trip instead?</Text>
                    <Text style={styles.alternativeDescription}>
                      Find a better date or time that works for you
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.alternativeOption} onPress={handleCancelLater}>
                  <View style={styles.alternativeIconContainer}>
                    <Clock size={20} color="#10B981" strokeWidth={2} />
                  </View>
                  <View style={styles.alternativeContent}>
                    <Text style={styles.alternativeTitle}>⏱️ Cancel later (before departure)</Text>
                    <Text style={styles.alternativeDescription}>
                      You have time to decide - cancel anytime before your flight
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.alternativeOption} onPress={handleTalkToSupport}>
                  <View style={styles.alternativeIconContainer}>
                    <Phone size={20} color="#6366F1" strokeWidth={2} />
                  </View>
                  <View style={styles.alternativeContent}>
                    <Text style={styles.alternativeTitle}>📞 Talk to support first</Text>
                    <Text style={styles.alternativeDescription}>
                      We might have a solution that works better for you
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          {/* Confirmation Steps */}
          {confirmationStep === 'alternatives' && (
            <View style={styles.confirmationSection}>
              <Text style={styles.confirmationTitle}>
                Are you sure you want to cancel your trip?
              </Text>
              <Text style={styles.confirmationSubtitle}>
                This will process your refund according to the breakdown above.
              </Text>
            </View>
          )}

          {confirmationStep === 'final' && (
            <View style={styles.finalConfirmationSection}>
              <Text style={styles.finalConfirmationTitle}>
                ⚠️ Final Confirmation Required
              </Text>
              <Text style={styles.finalConfirmationSubtitle}>
                This action cannot be undone. Your trip will be permanently cancelled.
              </Text>
              {timeRemaining > 0 && (
                <Text style={styles.countdownText}>
                  Button available in {timeRemaining} seconds...
                </Text>
              )}
            </View>
          )}

          {/* Bottom Padding for Fixed Buttons */}
          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* Action Buttons */}
        <Animated.View style={[styles.actionSection, buttonsAnimatedStyle]}>
          {confirmationStep === 'initial' && (
            <>
              <TouchableOpacity 
                style={styles.keepTripButton}
                onPress={handleBack}
                activeOpacity={0.8}
              >
                <Heart size={20} color="#FF6B35" strokeWidth={2} />
                <Text style={styles.keepTripText}>Keep My Trip</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleInitialCancel}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Review Cancellation</Text>
              </TouchableOpacity>
            </>
          )}

          {confirmationStep === 'alternatives' && (
            <>
              <TouchableOpacity 
                style={styles.keepTripButton}
                onPress={() => setConfirmationStep('initial')}
                activeOpacity={0.8}
              >
                <Text style={styles.keepTripText}>Go Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleProceedToFinalCancel}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Proceed to Cancel</Text>
              </TouchableOpacity>
            </>
          )}

          {confirmationStep === 'final' && (
            <>
              <TouchableOpacity 
                style={styles.keepTripButton}
                onPress={() => setConfirmationStep('alternatives')}
                activeOpacity={0.8}
              >
                <Text style={styles.keepTripText}>Go Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.finalCancelButton,
                  (!cancelButtonEnabled || isCancelling) && styles.disabledButton
                ]}
                onPress={handleFinalCancellation}
                disabled={!cancelButtonEnabled || isCancelling}
                activeOpacity={0.8}
              >
                {isCancelling ? (
                  <LoadingSpinner size={20} color="#FFFFFF" />
                ) : (
                  <X size={20} color="#FFFFFF" strokeWidth={2.5} />
                )}
                <Text style={styles.finalCancelText}>
                  {isCancelling ? 'Processing...' : 'Confirm Cancellation'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>

        {/* Loading Overlay for Processing */}
        {isCancelling && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContent}>
              <LoadingSpinner size={40} color="#FFFFFF" />
              <Text style={styles.loadingTitle}>Cancelling Your Trip</Text>
              <Text style={styles.loadingSubtitle}>
                Processing refund and sending confirmation...
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  safeArea: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  placeholder: {
    width: 44,
  },
  
  // Scroll View
  scrollView: {
    flex: 1,
  },
  
  // Warning Section
  warningSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  warningCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  warningContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  warningIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningTextContainer: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  warningSubtitle: {
    fontSize: 14,
    color: '#A16207',
    fontWeight: '500',
  },
  
  // Trip Details Section
  tripDetailsSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tripDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  tripDetailsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  tripInfoGrid: {
    gap: 12,
  },
  tripInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  tripRoute: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  tripInfoText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  
  // Refund Section
  refundSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  refundCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  refundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  refundHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  refundBreakdown: {
    gap: 12,
  },
  refundRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  refundRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  refundLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  refundValuePositive: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '700',
  },
  refundValueNegative: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalRefundRow: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    marginHorizontal: -12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  refundTotalLabel: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '700',
  },
  refundTotalValue: {
    fontSize: 24,
    color: '#10B981',
    fontWeight: '800',
  },
  refundTimelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  refundTimeline: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  savingsHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  savingsText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '700',
    flex: 1,
  },
  assuredFeePromo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  assuredFeePromoText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
    flex: 1,
  },
  
  // Alternatives Section
  alternativesSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  alternativesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 16,
  },
  alternativesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  alternativeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  alternativeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  alternativeContent: {
    flex: 1,
  },
  alternativeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  alternativeDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    lineHeight: 20,
  },
  
  // Confirmation Sections
  confirmationSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  confirmationSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  finalConfirmationSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  finalConfirmationTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 8,
  },
  finalConfirmationSubtitle: {
    fontSize: 16,
    color: '#991B1B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  countdownText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Bottom Padding
  bottomPadding: {
    height: 120,
  },
  
  // Action Section
  actionSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    gap: 12,
  },
  keepTripButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 16,
    gap: 8,
    minHeight: 56,
  },
  keepTripText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#6B7280',
    borderRadius: 16,
    minHeight: 56,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  finalCancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#DC2626',
    borderRadius: 16,
    gap: 8,
    minHeight: 56,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0.1,
  },
  finalCancelText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  // Loading Overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    gap: 16,
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});