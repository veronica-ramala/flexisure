import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { wp, hp, rf, rs, spacing, typography, touchTarget } from '@/utils/responsive';
import * as SplashScreen from 'expo-splash-screen';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Shield, 
  CheckCircle, 
  Zap, 
  Gem, 
  Star,
  ArrowRight,
  Briefcase,
  Plane
} from 'lucide-react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

export default function PremiumSplashScreen() {
  const router = useRouter();
  const [showCustomSplash, setShowCustomSplash] = useState(false);
  
  // Enhanced Animation Values
  const backgroundOpacity = useSharedValue(0);
  const backgroundPosition = useSharedValue(0);
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const logoRotation = useSharedValue(-10);
  const brandNameOpacity = useSharedValue(0);
  const brandNameScale = useSharedValue(0.8);
  const taglineOpacity = useSharedValue(0);
  const taglineTranslateY = useSharedValue(30);
  const feature1Opacity = useSharedValue(0);
  const feature1TranslateX = useSharedValue(-50);
  const feature2Opacity = useSharedValue(0);
  const feature2TranslateX = useSharedValue(-50);
  const feature3Opacity = useSharedValue(0);
  const feature3TranslateX = useSharedValue(-50);
  const trustIndicatorOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.9);
  const buttonOpacity = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);

  // Enhanced Animated Styles
  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
    transform: [
      {
        translateX: interpolate(backgroundPosition.value, [0, 1], [0, 20])
      }
    ],
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotation.value}deg` }
    ],
  }));

  const brandNameAnimatedStyle = useAnimatedStyle(() => ({
    opacity: brandNameOpacity.value,
    transform: [{ scale: brandNameScale.value }],
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineTranslateY.value }],
  }));

  const feature1AnimatedStyle = useAnimatedStyle(() => ({
    opacity: feature1Opacity.value,
    transform: [{ translateX: feature1TranslateX.value }],
  }));

  const feature2AnimatedStyle = useAnimatedStyle(() => ({
    opacity: feature2Opacity.value,
    transform: [{ translateX: feature2TranslateX.value }],
  }));

  const feature3AnimatedStyle = useAnimatedStyle(() => ({
    opacity: feature3Opacity.value,
    transform: [{ translateX: feature3TranslateX.value }],
  }));

  const trustIndicatorAnimatedStyle = useAnimatedStyle(() => ({
    opacity: trustIndicatorOpacity.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [
      { scale: buttonScale.value * pulseAnimation.value }
    ],
  }));

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const prepare = async () => {
      try {
        // Wait for app initialization
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Hide native splash and show custom
        await SplashScreen.hideAsync();
        setShowCustomSplash(true);
        
        // Start premium animation sequence
        startPremiumAnimations();
        
        // Navigate after sequence completes
        timeoutId = setTimeout(() => {
          router.replace('/(tabs)');
        }, 4500);
        
      } catch (e) {
        console.warn('Splash error:', e);
        timeoutId = setTimeout(() => {
          router.replace('/(tabs)');
        }, 2000);
      }
    };

    const startPremiumAnimations = () => {
      // Background dynamic gradient
      backgroundOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) });
      backgroundPosition.value = withRepeat(
        withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      );

      // Logo enhancement with 3D depth
      logoOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
      logoScale.value = withDelay(400, withSpring(1, { damping: 8, stiffness: 100 }));
      logoRotation.value = withDelay(400, withSpring(0, { damping: 12, stiffness: 80 }));

      // Brand name with authority
      brandNameOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
      brandNameScale.value = withDelay(800, withSpring(1, { damping: 8, stiffness: 120 }));

      // Tagline slide up elegantly
      taglineOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));
      taglineTranslateY.value = withDelay(1200, withSpring(0, { damping: 8, stiffness: 100 }));

      // Feature cascade animation
      feature1Opacity.value = withDelay(1600, withTiming(1, { duration: 500 }));
      feature1TranslateX.value = withDelay(1600, withSpring(0, { damping: 8, stiffness: 120 }));

      feature2Opacity.value = withDelay(1900, withTiming(1, { duration: 500 }));
      feature2TranslateX.value = withDelay(1900, withSpring(0, { damping: 8, stiffness: 120 }));

      feature3Opacity.value = withDelay(2200, withTiming(1, { duration: 500 }));
      feature3TranslateX.value = withDelay(2200, withSpring(0, { damping: 8, stiffness: 120 }));

      // Trust indicators
      trustIndicatorOpacity.value = withDelay(2500, withTiming(1, { duration: 600 }));

      // CTA button with breathing effect
      buttonOpacity.value = withDelay(2800, withTiming(1, { duration: 600 }));
      buttonScale.value = withDelay(2800, withSpring(1, { damping: 8, stiffness: 100 }));
      
      // Continuous pulse for button
      pulseAnimation.value = withDelay(3200, withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        false
      ));
    };

    prepare();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [router]);

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  // Loading state
  if (!showCustomSplash) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#FF4500' }]}>
        {/* Minimal loading state */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Dynamic Background with Moving Gradient */}
      <Animated.View style={[StyleSheet.absoluteFillObject, backgroundAnimatedStyle]}>
        <LinearGradient
          colors={['#FF4500', '#FF6B35', '#FF8C42', '#FFA07A']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.3, 0.7, 1]}
        />
        {/* Geometric Pattern Overlay */}
        <View style={styles.geometricPattern}>
          <View style={[styles.geometricShape, styles.shape1]} />
          <View style={[styles.geometricShape, styles.shape2]} />
          <View style={[styles.geometricShape, styles.shape3]} />
          <Plane size={24} color="rgba(255,255,255,0.1)" style={styles.floatingIcon1} />
          <Briefcase size={20} color="rgba(255,255,255,0.08)" style={styles.floatingIcon2} />
        </View>
      </Animated.View>
      
      <View style={styles.content}>
        {/* Enhanced Logo with 3D Depth */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={styles.premiumLogoWrapper}>
            <View style={styles.logoShadow} />
            <Image
              source={require('@/assets/images/Flexisure-splash.png')}
              style={styles.premiumLogoImage}
              resizeMode="contain"
            />
            <View style={styles.logoBadge}>
              <CheckCircle size={16} color="#27AE60" />
            </View>
          </View>
        </Animated.View>
        
        {/* Premium Brand Name */}
        <Animated.View style={[styles.brandContainer, brandNameAnimatedStyle]}>
          <Text style={styles.premiumBrandName}>FlexiSure</Text>
          <View style={styles.brandAccent} />
        </Animated.View>
        
        {/* Enhanced Tagline */}
        <Animated.View style={[styles.taglineContainer, taglineAnimatedStyle]}>
          <Text style={styles.premiumTagline}>Book Boldly • Cancel Freely</Text>
        </Animated.View>
        
        {/* Professional Feature Showcase */}
        <View style={styles.featuresContainer}>
          <Animated.View style={[styles.featureRow, feature1AnimatedStyle]}>
            <View style={styles.featureIconContainer}>
              <Gem size={20} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <Text style={styles.premiumFeatureText}>Crystal-clear pricing • No surprises, ever</Text>
          </Animated.View>
          
          <Animated.View style={[styles.featureRow, feature2AnimatedStyle]}>
            <View style={styles.featureIconContainer}>
              <Zap size={20} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <Text style={styles.premiumFeatureText}>Cancel anytime • Full refund guarantee</Text>
          </Animated.View>
          
          <Animated.View style={[styles.featureRow, feature3AnimatedStyle]}>
            <View style={styles.featureIconContainer}>
              <Shield size={20} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <Text style={styles.premiumFeatureText}>Smart booking • Manage everything instantly</Text>
          </Animated.View>
        </View>
        
        {/* Trust & Credibility Indicators */}
        <Animated.View style={[styles.trustContainer, trustIndicatorAnimatedStyle]}>
          <View style={styles.trustBadge}>
            <View style={styles.trustRating}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Star size={14} color="#FFD700" fill="#FFD700" />
            </View>
            <Text style={styles.trustText}>Trusted by 50K+ travelers</Text>
          </View>
          <View style={styles.securityBadge}>
            <Shield size={16} color="#27AE60" />
            <Text style={styles.securityText}>Secure Platform</Text>
          </View>
        </Animated.View>
        
        {/* Premium Call-to-Action */}
        <Animated.View style={[styles.ctaContainer, buttonAnimatedStyle]}>
          <TouchableOpacity
            style={styles.premiumButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F8F9FA']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>Start Your Journey</Text>
              <ArrowRight size={20} color="#FF4500" strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Version with Award Badge */}
        <Animated.View style={[styles.footer, trustIndicatorAnimatedStyle]}>
          <Text style={styles.awardText}>Award-winning travel flexibility</Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4500',
  },
  
  // Enhanced Background & Pattern
  geometricPattern: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  geometricShape: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: rs(20),
  },
  shape1: {
    width: rs(80),
    height: rs(80),
    top: '15%',
    right: '10%',
    transform: [{ rotate: '45deg' }],
  },
  shape2: {
    width: rs(60),
    height: rs(60),
    top: '60%',
    left: '5%',
    transform: [{ rotate: '30deg' }],
  },
  shape3: {
    width: rs(100),
    height: rs(100),
    bottom: '20%',
    right: '15%',
    transform: [{ rotate: '15deg' }],
  },
  floatingIcon1: {
    position: 'absolute',
    top: '25%',
    left: '10%',
  },
  floatingIcon2: {
    position: 'absolute',
    bottom: '30%',
    right: '8%',
  },
  
  // Content Layout
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: hp(8),
    paddingBottom: spacing.xl,
  },
  
  // Premium Logo Styling
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  premiumLogoWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoShadow: {
    position: 'absolute',
    width: rs(180),
    height: rs(180),
    borderRadius: rs(90),
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    top: rs(8),
    left: rs(8),
    zIndex: 1,
  },
  premiumLogoImage: {
    width: rs(180),
    height: rs(180),
    borderRadius: rs(90),
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(12) },
    shadowOpacity: 0.3,
    shadowRadius: rs(20),
    elevation: 12,
  },
  logoBadge: {
    position: 'absolute',
    bottom: rs(5),
    right: rs(5),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(12),
    padding: rs(4),
    zIndex: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(2) },
    shadowOpacity: 0.2,
    shadowRadius: rs(4),
    elevation: 4,
  },
  
  // Enhanced Brand Name
  brandContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  premiumBrandName: {
    fontSize: typography.hero,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: rf(-1.5),
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: rs(3) },
    textShadowRadius: rs(6),
    marginBottom: spacing.sm,
  },
  brandAccent: {
    width: rs(60),
    height: rs(3),
    backgroundColor: '#FFFFFF',
    borderRadius: rs(2),
    opacity: 0.9,
  },
  
  // Enhanced Tagline
  taglineContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  premiumTagline: {
    fontSize: typography.xl,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: rf(1),
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: rs(2) },
    textShadowRadius: rs(4),
  },
  
  // Professional Features
  featuresContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: rs(16),
    width: '100%',
    maxWidth: wp(85),
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureIconContainer: {
    width: touchTarget(40),
    height: touchTarget(40),
    borderRadius: rs(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  premiumFeatureText: {
    flex: 1,
    fontSize: typography.lg,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: rf(0.5),
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: rs(1) },
    textShadowRadius: rs(2),
    flexWrap: 'wrap',
  },
  
  // Trust Indicators
  trustContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: rs(20),
    gap: spacing.sm,
  },
  trustRating: {
    flexDirection: 'row',
    gap: rs(2),
  },
  trustText: {
    color: '#FFFFFF',
    fontSize: typography.md,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  securityText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: typography.sm,
    fontWeight: '500',
  },
  
  // Premium CTA
  ctaContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  premiumButton: {
    borderRadius: rs(16),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: rs(6) },
    shadowOpacity: 0.3,
    shadowRadius: rs(12),
    elevation: 8,
    width: '100%',
    maxWidth: wp(75),
    minHeight: touchTarget(50),
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
    minHeight: touchTarget(50),
  },
  buttonText: {
    fontSize: typography.xl,
    fontWeight: '700',
    color: '#FF4500',
    letterSpacing: rf(0.5),
    textAlign: 'center',
  },
  
  // Footer
  footer: {
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  awardText: {
    fontSize: typography.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    letterSpacing: rf(0.5),
    textAlign: 'center',
  },
  versionText: {
    fontSize: typography.xs,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '400',
    letterSpacing: rf(0.5),
  },
});