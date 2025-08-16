import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AppProvider } from '@/context/AppContext';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <SafeAreaProvider>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="booking-details" />
          <Stack.Screen name="add-assured-fee" />
          <Stack.Screen name="cancel-trip" />
          <Stack.Screen name="payment-method" />
          <Stack.Screen name="payment-processing" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light-content" />
      </AppProvider>
    </SafeAreaProvider>
  );
}