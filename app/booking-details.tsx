import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
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
  MoreVertical,
  Plane,
  Calendar,
  Clock,
  Users,
  Timer,
  MapPin,
  Shield,
  Check,
  X,
  Star,
  TrendingUp,
  MessageCircle,
  Phone,
  Info,
  ChevronDown,
  CheckCircle,
  Zap,
  Award,
  DollarSign,
} from 'lucide-react-native';

import { useApp } from '@/context/AppContext';
import { wp, hp, spacing, typography, touchTarget, rs } from '@/utils/responsive';

const { width, height } = Dimensions.get('window');

export default function BookingDetailsScreen() {
  const router = useRouter();
  const { state, dispatch, formatCurrency, formatDate } = useApp();
  const { currentBooking } = state;
  
  const [showProtectionModal, setShowProtectionModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Animation values
  const headerOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);
  const heroCardScale = useSharedValue(0.95);
  const heroCardOpacity = useSharedValue(0);
  const pricingOpacity = useSharedValue(0);
  const pricingTranslateY = useSharedValue(30);
  const benefitsOpacity = useSharedValue(0);
  const benefitsTranslateX = useSharedValue(-50);
  const buttonScale = useSharedValue(0.95);
  const buttonOpacity = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);
  const priceCountAnimation = useSharedValue(0);

  // Animated styles
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const heroCardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heroCardOpacity.value,
    transform: [{ scale: heroCardScale.value }],
  }));

  const pricingAnimatedStyle = useAnimatedStyle(() => ({
    opacity: pricingOpacity.value,
    transform: [{ translateY: pricingTranslateY.value }],
  }));

  const benefitsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: benefitsOpacity.value,
    transform: [{ translateX: benefitsTranslateX.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value * pulseAnimation.value }],
  }));

  const priceAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(priceCountAnimation.value),
  }));

  useEffect(() => {
    // Page load animation sequence
    const startAnimations = () => {
      // Header and progress
      headerOpacity.value = withTiming(1, { duration: 600 });
      progressWidth.value = withDelay(200, withTiming(60, { duration: 1000, easing: Easing.out(Easing.quad) }));

      // Hero card
      heroCardOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
      heroCardScale.value = withDelay(400, withSpring(1, { damping: 8, stiffness: 100 }));

      // Pricing section
      pricingOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
      pricingTranslateY.value = withDelay(800, withSpring(0, { damping: 8, stiffness: 120 }));

      // Benefits section
      benefitsOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));
      benefitsTranslateX.value = withDelay(1200, withSpring(0, { damping: 8, stiffness: 120 }));

      // Buttons
      buttonOpacity.value = withDelay(1600, withTiming(1, { duration: 600 }));
      buttonScale.value = withDelay(1600, withSpring(1, { damping: 8, stiffness: 100 }));

      // Continuous pulse for primary button
      pulseAnimation.value = withDelay(2000, withRepeat(
        withSequence(
          withTiming(1.02, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
          withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        false
      ));
    };

    startAnimations();
  }, []);

  const handleAddAssuredFee = () => {
    // Animate price changes
    priceCountAnimation.value = withSequence(
      withTiming(0.5, { duration: 200 }),
      withTiming(1, { duration: 400 })
    );
    
    dispatch({ type: 'ADD_ASSURED_FEE' });
    
    // Success feedback
    runOnJS(() => {
      // Could add haptic feedback here
    })();
  };

  const handleRemoveAssuredFee = () => {
    dispatch({ type: 'REMOVE_ASSURED_FEE' });
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  if (!currentBooking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No Booking Found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const totalWithoutFee = currentBooking.baseFare + currentBooking.taxes;
  const totalWithFee = totalWithoutFee + currentBooking.assuredFee;
  const currentTotal = currentBooking.hasAssuredFee ? totalWithFee : totalWithoutFee;

  return (
    <SafeAreaView style={styles.container}>
      {/* Enhanced Header with Progress */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <LinearGradient
          colors={['#FF6B35', '#FFA07A', '#FFFFFF']}
          style={styles.headerGradient}
          locations={[0, 0.7, 1]}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
            
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Booking Details</Text>
              <Text style={styles.headerSubtitle}>New York → Boston</Text>
            </View>
            
            <TouchableOpacity style={styles.menuButton}>
              <MoreVertical size={24} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Step 3 of 5</Text>
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressBar, progressAnimatedStyle]} />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Enhanced Trip Summary Card */}
        <Animated.View style={[styles.heroSection, heroCardAnimatedStyle]}>
          <LinearGradient
            colors={['#FF6B35', '#FF8C42']}
            style={styles.heroCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* City Route with Animation */}
            <View style={styles.routeHeader}>
              <View style={styles.cityContainer}>
                <MapPin size={16} color="#FFFFFF" />
                <Text style={styles.cityText}>NEW YORK</Text>
              </View>
              
              <View style={styles.flightPath}>
                <Plane size={20} color="#FFFFFF" strokeWidth={2} />
                <View style={styles.pathDots}>
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>
              </View>
              
              <View style={styles.cityContainer}>
                <Text style={styles.cityText}>BOSTON</Text>
                <MapPin size={16} color="#FFFFFF" />
              </View>
            </View>

            {/* Flight Details Grid */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Calendar size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.detailLabel}>Thu, May 20</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.detailLabel}>10:00 AM</Text>
              </View>
              <View style={styles.detailItem}>
                <Plane size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.detailLabel}>Flight AA1234</Text>
              </View>
              <View style={styles.detailItem}>
                <Users size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.detailLabel}>1 Passenger</Text>
              </View>
            </View>

            {/* Status and Duration */}
            <View style={styles.statusRow}>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>On Time</Text>
              </View>
              <View style={styles.durationBadge}>
                <Timer size={14} color="rgba(255,255,255,0.9)" />
                <Text style={styles.durationText}>1h 30min</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Enhanced Pricing Breakdown */}
        <Animated.View style={[styles.pricingSection, pricingAnimatedStyle]}>
          <View style={styles.sectionHeader}>
            <DollarSign size={20} color="#FF6B35" strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>PRICING BREAKDOWN</Text>
          </View>

          <View style={styles.pricingCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Base Fare</Text>
              <Text style={styles.priceValue}>{formatCurrency(currentBooking.baseFare)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Taxes & Fees</Text>
              <Text style={styles.priceValue}>{formatCurrency(currentBooking.taxes)}</Text>
            </View>
            
            {/* Assured Fee Row with State */}
            <View style={[styles.priceRow, styles.assuredFeeRow]}>
              <View style={styles.assuredFeeLabel}>
                <Shield size={16} color={currentBooking.hasAssuredFee ? "#27AE60" : "#EF4444"} />
                <Text style={styles.priceLabel}>Assured Fee</Text>
                {currentBooking.hasAssuredFee ? (
                  <CheckCircle size={16} color="#27AE60" />
                ) : (
                  <X size={16} color="#EF4444" />
                )}
              </View>
              <Text style={[
                styles.priceValue,
                currentBooking.hasAssuredFee ? styles.includedPrice : styles.excludedPrice
              ]}>
                {currentBooking.hasAssuredFee ? formatCurrency(currentBooking.assuredFee) : `+ ${formatCurrency(currentBooking.assuredFee)}`}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* Total with Animation */}
            <Animated.View style={[styles.totalRow, priceAnimatedStyle]}>
              <Text style={styles.totalLabel}>
                {currentBooking.hasAssuredFee ? 'Total' : 'Subtotal'}
              </Text>
              <Text style={styles.totalValue}>{formatCurrency(currentTotal)}</Text>
            </Animated.View>

            {/* Protection Status */}
            <View style={[styles.protectionStatus, currentBooking.hasAssuredFee && styles.protectedStatus]}>
              {currentBooking.hasAssuredFee ? (
                <>
                  <CheckCircle size={20} color="#27AE60" />
                  <Text style={styles.protectedText}>✅ FULLY PROTECTED</Text>
                </>
              ) : (
                <>
                  <Shield size={20} color="#FF6B35" />
                  <Text style={styles.unprotectedText}>🛡️ PROTECTION AVAILABLE</Text>
                </>
              )}
            </View>

            <TouchableOpacity 
              style={styles.protectionInfo}
              onPress={() => setShowProtectionModal(true)}
            >
              <Info size={16} color="#6B7280" />
              <Text style={styles.protectionInfoText}>
                {currentBooking.hasAssuredFee ? 'View protection details' : 'See what\'s covered'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Assured Fee Value Proposition (Only when not added) */}
        {!currentBooking.hasAssuredFee && (
          <Animated.View style={[styles.benefitsSection, benefitsAnimatedStyle]}>
            <LinearGradient
              colors={['#E8F5E8', '#F0F9FF']}
              style={styles.benefitsCard}
            >
              <View style={styles.benefitsHeader}>
                <Shield size={24} color="#27AE60" strokeWidth={2.5} />
                <Text style={styles.benefitsTitle}>TRAVEL WITH CONFIDENCE</Text>
              </View>

              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <CheckCircle size={20} color="#27AE60" />
                  <Text style={styles.benefitText}>Full refund if plans change</Text>
                </View>
                <View style={styles.benefitItem}>
                  <CheckCircle size={20} color="#27AE60" />
                  <Text style={styles.benefitText}>One free date/time change</Text>
                </View>
                <View style={styles.benefitItem}>
                  <CheckCircle size={20} color="#27AE60" />
                  <Text style={styles.benefitText}>Priority customer support</Text>
                </View>
                <View style={styles.benefitItem}>
                  <CheckCircle size={20} color="#27AE60" />
                  <Text style={styles.benefitText}>Peace of mind guarantee</Text>
                </View>
              </View>

              {/* Social Proof */}
              <View style={styles.socialProof}>
                <View style={styles.proofItem}>
                  <Zap size={16} color="#FF6B35" />
                  <Text style={styles.proofText}>94% of travelers recommend</Text>
                </View>
                <View style={styles.proofItem}>
                  <TrendingUp size={16} color="#27AE60" />
                  <Text style={styles.proofText}>Only $25 for complete freedom</Text>
                </View>
              </View>

              <View style={styles.urgencyIndicator}>
                <Text style={styles.urgencyText}>💡 Save $15 vs adding later</Text>
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Trust Indicators */}
        <View style={styles.trustSection}>
          <View style={styles.trustBadges}>
            <View style={styles.trustBadge}>
              <View style={styles.starRating}>
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={12} color="#FFD700" fill="#FFD700" />
                ))}
              </View>
              <Text style={styles.trustText}>4.8/5 from 12K+ bookings</Text>
            </View>
            <View style={styles.trustBadge}>
              <Shield size={14} color="#27AE60" />
              <Text style={styles.trustText}>Secure payment protected</Text>
            </View>
          </View>
          
          <View style={styles.recentActivity}>
            <TrendingUp size={14} color="#FF6B35" />
            <Text style={styles.activityText}>3 people booked this route today</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <Animated.View style={[styles.actionSection, buttonAnimatedStyle]}>
          {!currentBooking.hasAssuredFee ? (
            <>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={handleAddAssuredFee}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FF6B35', '#FF8C42']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Shield size={20} color="#FFFFFF" strokeWidth={2.5} />
                  <Text style={styles.primaryButtonText}>Add Assured Fee - $25</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => router.push('/payment-method')}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>📋 Book Without Protection</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => router.push('/payment-method')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#27AE60', '#2ECC71']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <CheckCircle size={20} color="#FFFFFF" strokeWidth={2.5} />
                  <Text style={styles.primaryButtonText}>Complete Booking - {formatCurrency(currentTotal)}</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => router.push('/(tabs)/manage')}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>✏️ Manage Booking</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.tertiaryButton}
                onPress={handleRemoveAssuredFee}
                activeOpacity={0.8}
              >
                <Text style={styles.tertiaryButtonText}>Remove Assured Fee</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Support Options */}
          <View style={styles.supportSection}>
            <Text style={styles.supportHeader}>Need help?</Text>
            <View style={styles.supportButtons}>
              <TouchableOpacity style={styles.supportButton}>
                <MessageCircle size={16} color="#FF6B35" />
                <Text style={styles.supportButtonText}>💬 Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.supportButton}>
                <Phone size={16} color="#FF6B35" />
                <Text style={styles.supportButtonText}>📞 Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Expandable Information Sections */}
        <View style={styles.expandableSections}>
          <TouchableOpacity 
            style={styles.expandableHeader}
            onPress={() => toggleSection('tripDetails')}
          >
            <Text style={styles.expandableTitle}>▼ Trip Details</Text>
            <ChevronDown 
              size={20} 
              color="#6B7280" 
              style={{
                transform: [{ 
                  rotate: expandedSections.includes('tripDetails') ? '180deg' : '0deg' 
                }]
              }}
            />
          </TouchableOpacity>
          
          {expandedSections.includes('tripDetails') && (
            <View style={styles.expandableContent}>
              <Text style={styles.expandableText}>• Baggage allowance: 1 carry-on included</Text>
              <Text style={styles.expandableText}>• Seat selection available at checkout</Text>
              <Text style={styles.expandableText}>• Meal service: Snacks available for purchase</Text>
            </View>
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
  
  // Header Styles
  header: {
    zIndex: 10,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  
  // Content Styles
  scrollView: {
    flex: 1,
  },
  
  // Hero Section
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  heroCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cityText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  flightPath: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    paddingHorizontal: 16,
  },
  pathDots: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: '45%',
  },
  detailLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(39, 174, 96, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#27AE60',
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  
  // Pricing Section
  pricingSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    letterSpacing: 0.5,
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
  assuredFeeRow: {
    backgroundColor: '#F9FAFB',
    marginHorizontal: -12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  assuredFeeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  includedPrice: {
    color: '#27AE60',
  },
  excludedPrice: {
    color: '#EF4444',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
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
  protectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  protectedStatus: {
    backgroundColor: '#F0FDF4',
    borderColor: '#D1FAE5',
  },
  protectedText: {
    fontSize: 14,
    color: '#27AE60',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  unprotectedText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  protectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    paddingTop: 12,
  },
  protectionInfoText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  
  // Benefits Section
  benefitsSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  benefitsCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  benefitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27AE60',
    letterSpacing: 0.5,
  },
  benefitsList: {
    gap: 12,
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  socialProof: {
    gap: 8,
    marginBottom: 12,
  },
  proofItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  proofText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  urgencyIndicator: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  urgencyText: {
    fontSize: 14,
    color: '#D97706',
    fontWeight: '600',
  },
  
  // Trust Section
  trustSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  trustBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8,
  },
  trustBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  starRating: {
    flexDirection: 'row',
    gap: 1,
  },
  trustText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    flex: 1,
  },
  recentActivity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activityText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
  },
  
  // Action Buttons
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  tertiaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  
  // Support Section
  supportSection: {
    marginTop: 20,
    alignItems: 'center',
    gap: 12,
  },
  supportHeader: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  supportButtons: {
    flexDirection: 'row',
    gap: 24,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  supportButtonText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  
  // Expandable Sections
  expandableSections: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  expandableTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  expandableContent: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  expandableText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
});