import React from 'react';
import { Tabs } from 'expo-router';
import { Chrome as Home, Settings, Calendar, CircleHelp as HelpCircle } from 'lucide-react-native';
import { spacing, typography, touchTarget, hp } from '@/utils/responsive';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: spacing.sm + 4, // Extra padding for safe area
          paddingTop: spacing.sm,
          height: Math.max(touchTarget(60), hp(8)),
          paddingHorizontal: spacing.xs,
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: typography.sm,
          fontWeight: '600',
          marginTop: spacing.xs,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          title: 'Manage',
          tabBarIcon: ({ size, color }) => (
            <Calendar size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: 'Support',
          tabBarIcon: ({ size, color }) => (
            <HelpCircle size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}