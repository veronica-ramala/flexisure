import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, typography, touchTarget } from '@/utils/responsive';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: '#F9FAFB',
  },
  text: {
    fontSize: typography.xl,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  link: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    minHeight: touchTarget(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
