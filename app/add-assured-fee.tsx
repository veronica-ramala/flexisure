import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Pressable,
  Dimensions,
  Alert
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
  X, 
  Shield, 
  CheckCircle, 
  DollarSign, 
  RefreshCw, 
  Zap, 
  Clock, 
  ChevronDown,
  Star,
  Users,
  Award,
  TrendingUp,
  Heart
} from 'lucide-react-native';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { wp, hp, spacing, typography, touchTarget, rs } from '@/utils/responsive';

const { width, height } = Dimensions.get('window');

export default function AddAssuredFeeScreen() {
  const router = useRouter();
  const { state, dispatch, formatCurrency } = useApp();
  const { currentBooking } = state;
  
  const [isLoading, setIsLoading] = useState(false);
  const [showImportantDetails, setShowImportantDetails] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Animation values
  const screenOpacity = useSharedValue(0);
  const heroScale = useSharedValue(0.95);
  const heroOpacity = useSharedValue(0);
  const benefit1Opacity = useSharedValue(0);
  const benefit1TranslateX = useSharedValue(-30);
  const benefit2Opacity = useSharedValue(0);
  const benefit2TranslateX = useSharedValue(-30);
  const benefit3Opacity = useSharedValue(0);
  const benefit3TranslateX = useSharedValue(-30);
  const benefit4Opacity = useSharedValue(0);
  const benefit4TranslateX = useSharedValue(-30);
  const pricingOpacity = useSharedValue(0);
  const pricingTranslateY = useSharedValue(30);
  const socialProofOpacity = useSharedValue(0);
  const ctaButtonScale = useSharedValue(0.95);
  const ctaButtonOpacity = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);

  // Animated styles
  const screenAnimatedStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const heroAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ scale: heroScale.value }],
  }));

  const benefit1AnimatedStyle = useAnimatedStyle(() => ({
    opacity: benefit1Opacity.value,
    transform: [{ translateX: benefit1TranslateX.value }],
  }));

  const benefit2AnimatedStyle = useAnimatedStyle(() => ({
    opacity: benefit2Opacity.value,
    transform: [{ translateX: benefit2TranslateX.value }],
  }));

  const benefit3AnimatedStyle = useAnimatedStyle(() => ({
    opacity: benefit3Opacity.value,
    transform: [{ translateX: benefit3TranslateX.value }],
  }));

  const benefit4AnimatedStyle = useAnimatedStyle(() => ({
    opacity: benefit4Opacity.value,
    transform: [{ translateX: benefit4TranslateX.value }],
  }));

  const pricingAnimatedStyle = useAnimatedStyle(() => ({
    opacity: pricingOpacity.value,
    transform: [{ translateY: pricingTranslateY.value }],
  }));

  const socialProofAnimatedStyle = useAnimatedStyle(() => ({
    opacity: socialProofOpacity.value,
  }));

  const ctaAnimatedStyle = useAnimatedStyle(() => ({
    opacity: ctaButtonOpacity.value,
    transform: [{ scale: ctaButtonScale.value * pulseAnimation.value }],
  }));

  useEffect(() => {
    // Entry animation sequence
    const startAnimations = () => {
      // Screen fade in
      screenOpacity.value = withTiming(1, { duration: 600 });

      // Hero section
      heroOpacity.value = withDelay(200, withTiming(1, { duration: 800 }));
      heroScale.value = withDelay(200, withSpring(1, { damping: 8, stiffness: 100 }));

      // Benefits staggered animation
      benefit1Opacity.value = withDelay(600, withTiming(1, { duration: 500 }));
      benefit1TranslateX.value = withDelay(600, withSpring(0, { damping: 8, stiffness: 120 }));

      benefit2Opacity.value = withDelay(700, withTiming(1, { duration: 500 }));
      benefit2TranslateX.value = withDelay(700, withSpring(0, { damping: 8, stiffness: 120 }));

      benefit3Opacity.value = withDelay(800, withTiming(1, { duration: 500 }));
      benefit3TranslateX.value = withDelay(800, withSpring(0, { damping: 8, stiffness: 120 }));

      benefit4Opacity.value = withDelay(900, withTiming(1, { duration: 500 }));
      benefit4TranslateX.value = withDelay(900, withSpring(0, { damping: 8, stiffness: 120 }));

      // Pricing section
      pricingOpacity.value = withDelay(1100, withTiming(1, { duration: 600 }));
      pricingTranslateY.value = withDelay(1100, withSpring(0, { damping: 8, stiffness: 100 }));

      // Social proof
      socialProofOpacity.value = withDelay(1300, withTiming(1, { duration: 600 }));

      // CTA button
      ctaButtonOpacity.value = withDelay(1500, withTiming(1, { duration: 600 }));
      ctaButtonScale.value = withDelay(1500, withSpring(1, { damping: 8, stiffness: 100 }));

      // Continuous pulse for CTA
      pulseAnimation.value = withDelay(2000, withRepeat(
        withSequence(
          withTiming(1.02, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        false
      ));
    };

    startAnimations();
  }, []);

  const handleConfirm = async () => {
    setIsLoading(true);
    setHasError(false);
    
    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dispatch the action
      dispatch({ type: 'ADD_ASSURED_FEE' });
      
      // Success feedback
      runOnJS(() => {
        // Could add haptic feedback here
        Alert.alert(
          'Success!',
          'Assured Fee added ✅\nYour trip is now fully protected.',
          [{ text: 'Continue', onPress: () => router.push('/booking-details') }]
        );
      })();
      
    } catch (error) {
      setHasError(true);
      runOnJS(() => {
        Alert.alert(
          'Something went wrong',
          'Please try again or contact support if the problem persists.',
          [
            { text: 'Retry', onPress: handleConfirm },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
      })();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleMaybeLater = () => {
    // Track analytics for conversion optimization
    router.back();
  };

  if (!currentBooking) {
    router.replace('/(tabs)');
    return null;
  }

  const totalWithoutFee = currentBooking.baseFare + currentBooking.taxes;
  const totalWithFee = totalWithoutFee + currentBooking.assuredFee;

  return (
    <Animated.View style={[styles.container, screenAnimatedStyle]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Enhanced Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={handleCancel}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={24} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Secure Your Trip</Text>
            <Text style={styles.headerSubtitle}>Add peace of mind for just $25</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.maybeLaterButton}
            onPress={handleMaybeLater}
          >
            <Text style={styles.maybeLaterText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Hero Value Proposition Card */}
          <Animated.View style={[styles.heroSection, heroAnimatedStyle]}>
            <LinearGradient
              colors={['rgba(255, 107, 53, 0.1)', 'rgba(255, 138, 101, 0.05)']}
              style={styles.heroCard}
            >
              <View style={styles.heroIconContainer}>
                <LinearGradient
                  colors={['#FF6B35', '#FF8A65']}
                  style={styles.heroIconBackground}
                >
                  <Shield size={32} color="#FFFFFF" strokeWidth={2.5} />
                  <View style={styles.checkmarkBadge}>
                    <CheckCircle size={14} color="#10B981" fill="#10B981" />
                  </View>
                </LinearGradient>
              </View>
              
              <Text style={styles.heroTitle}>Travel with Complete Confidence</Text>
              <Text style={styles.heroSubtitle}>
                Cancel anytime before departure with zero penalties
              </Text>
              
              <View style={styles.heroHighlight}>
                <Text style={styles.heroHighlightText}>
                  💝 Don't lose your ${formatCurrency(totalWithoutFee).replace('$', '')} investment
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Enhanced Benefits Section */}
          <View style={styles.benefitsSection}>
            <Text style={styles.benefitsSectionTitle}>What's Included</Text>
            
            {/* Benefit 1: Full Refund Guarantee */}
            <Animated.View style={[styles.benefitCard, benefit1AnimatedStyle]}>
              <View style={styles.benefitIconContainer}>
                <DollarSign size={20} color="#10B981" strokeWidth={2.5} />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>💰 Full Refund Guarantee</Text>
                <Text style={styles.benefitDescription}>
                  Get 100% of your fare + taxes back
                </Text>
                <Text style={styles.benefitSubtext}>
                  No cancellation fees or penalties
                </Text>
              </View>
            </Animated.View>

            {/* Benefit 2: One Free Change */}
            <Animated.View style={[styles.benefitCard, benefit2AnimatedStyle]}>
              <View style={styles.benefitIconContainer}>
                <RefreshCw size={20} color="#10B981" strokeWidth={2.5} />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>🔄 One Free Change</Text>
                <Text style={styles.benefitDescription}>
                  Modify your date or time once at no cost
                </Text>
                <Text style={styles.benefitSubtext}>
                  Perfect for uncertain schedules
                </Text>
              </View>
            </Animated.View>

            {/* Benefit 3: Priority Support */}
            <Animated.View style={[styles.benefitCard, benefit3AnimatedStyle]}>
              <View style={styles.benefitIconContainer}>
                <Zap size={20} color="#10B981" strokeWidth={2.5} />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>⚡ Priority Support</Text>
                <Text style={styles.benefitDescription}>
                  Skip the queue with dedicated assistance
                </Text>
                <Text style={styles.benefitSubtext}>
                  Available 24/7 for urgent needs
                </Text>
              </View>
            </Animated.View>

            {/* Benefit 4: Flexible Until Departure */}
            <Animated.View style={[styles.benefitCard, benefit4AnimatedStyle]}>
              <View style={styles.benefitIconContainer}>
                <Clock size={20} color="#10B981" strokeWidth={2.5} />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>⏰ Flexible Until Departure</Text>
                <Text style={styles.benefitDescription}>
                  Cancel up to departure time
                </Text>
                <Text style={styles.benefitSubtext}>
                  No advance notice required
                </Text>
              </View>
            </Animated.View>
          </View>

          {/* Enhanced Cost Breakdown */}
          <Animated.View style={[styles.pricingSection, pricingAnimatedStyle]}>
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingSectionTitle}>Transparent Pricing</Text>
            </View>
            
            <View style={styles.pricingCard}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Original fare</Text>
                <Text style={styles.priceValue}>{formatCurrency(currentBooking.baseFare)}</Text>
              </View>
              
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Taxes & fees</Text>
                <Text style={styles.priceValue}>{formatCurrency(currentBooking.taxes)}</Text>
              </View>
              
              <View style={[styles.priceRow, styles.assuredFeeRow]}>
                <View style={styles.assuredFeeLabel}>
                  <Shield size={16} color="#FF6B35" />
                  <Text style={styles.assuredFeeLabelText}>Assured fee</Text>
                </View>
                <Text style={styles.assuredFeeValue}>
                  +{formatCurrency(currentBooking.assuredFee)}
                </Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={[styles.priceRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatCurrency(totalWithFee)}</Text>
              </View>
            </View>
          </Animated.View>

          {/* Social Proof Section */}
          <Animated.View style={[styles.socialProofSection, socialProofAnimatedStyle]}>
            <View style={styles.socialProofCard}>
              <View style={styles.socialProofItem}>
                <TrendingUp size={16} color="#10B981" />
                <Text style={styles.socialProofText}>Chosen by 89% of travelers</Text>
              </View>
              
              <View style={styles.socialProofItem}>
                <Users size={16} color="#FF6B35" />
                <Text style={styles.socialProofText}>Trusted by 50,000+ customers</Text>
              </View>
              
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} color="#FFD700" fill="#FFD700" />
                  ))}
                </View>
                <Text style={styles.ratingText}>4.9/5 customer satisfaction</Text>
              </View>
            </View>
          </Animated.View>

          {/* Important Details (Expandable) */}
          <View style={styles.importantDetailsSection}>
            <TouchableOpacity 
              style={styles.importantDetailsHeader}
              onPress={() => setShowImportantDetails(!showImportantDetails)}
            >
              <Text style={styles.importantDetailsTitle}>Important Details</Text>
              <ChevronDown 
                size={20} 
                color="#6B7280" 
                style={{
                  transform: [{ rotate: showImportantDetails ? '180deg' : '0deg' }]
                }}
              />
            </TouchableOpacity>
            
            {showImportantDetails && (
              <View style={styles.importantDetailsContent}>
                <Text style={styles.detailItem}>• Non-refundable after departure</Text>
                <Text style={styles.detailItem}>• One change policy: Date or time modification</Text>
                <Text style={styles.detailItem}>• Full terms and conditions apply</Text>
                <TouchableOpacity style={styles.faqLink}>
                  <Text style={styles.faqText}>📋 View FAQ for common questions</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Bottom Padding for Fixed CTA */}
          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* Fixed CTA Button */}
        <Animated.View style={[styles.ctaContainer, ctaAnimatedStyle]}>
          <TouchableOpacity 
            style={[
              styles.primaryCTA,
              isLoading && styles.loadingCTA
            ]}
            onPress={handleConfirm}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isLoading ? ['#9CA3AF', '#9CA3AF'] : ['#FF6B35', '#FF8A65']}
              style={styles.ctaGradient}
            >
              {isLoading ? (
                <Text style={styles.ctaTextLoading}>Adding Assured Fee...</Text>
              ) : (
                <>
                  <Shield size={20} color="#FFFFFF" strokeWidth={2.5} />
                  <Text style={styles.ctaText}>Add Assured Fee - $25</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.ctaSubtext}>
            <Heart size={14} color="#10B981" />
            <Text style={styles.ctaSubtextText}>
              Join thousands of smart travelers who choose peace of mind
            </Text>
          </View>
        </Animated.View>
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
  
  // Enhanced Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  maybeLaterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  maybeLaterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  
  // Scroll View
  scrollView: {
    flex: 1,
  },
  
  // Hero Section
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  heroCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  heroIconContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  heroIconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  checkmarkBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  heroHighlight: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  heroHighlightText: {
    fontSize: 14,
    color: '#D97706',
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Benefits Section
  benefitsSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  benefitsSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  benefitCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  benefitIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 2,
  },
  benefitSubtext: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  
  // Pricing Section
  pricingSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pricingHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pricingSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  pricingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  assuredFeeRow: {
    backgroundColor: '#FFF7ED',
    marginHorizontal: -12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  assuredFeeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  assuredFeeLabelText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
  },
  assuredFeeValue: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalRow: {
    paddingTop: 4,
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
  },
  totalLabel: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 20,
    color: '#FF6B35',
    fontWeight: '800',
  },
  
  // Social Proof Section
  socialProofSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  socialProofCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  socialProofItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  socialProofText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  
  // Important Details Section
  importantDetailsSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  importantDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  importantDetailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  importantDetailsContent: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  detailItem: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  faqLink: {
    marginTop: 8,
    alignItems: 'center',
  },
  faqText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  
  // Bottom Padding
  bottomPadding: {
    height: 120,
  },
  
  // Fixed CTA Section
  ctaContainer: {
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
  },
  primaryCTA: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loadingCTA: {
    shadowOpacity: 0.1,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 8,
    minHeight: 56,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  ctaTextLoading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ctaSubtext: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  ctaSubtextText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
});