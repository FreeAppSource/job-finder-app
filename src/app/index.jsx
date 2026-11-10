import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { CustomButton } from '../components/CustomButton';

export default function WelcomeScreen() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <View style={styles.logoBadge}>
          <Ionicons name="briefcase" size={48} color={colors.white} />
        </View>
        <Text style={styles.splashTitle}>JobFinder</Text>
        <Text style={styles.splashSubtitle}>Explore your dream jobs</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topRight}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.illustrationBox}>
          <View style={styles.illustrationCircle}>
            <Ionicons name="search" size={64} color={colors.primary} />
          </View>
          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>Fast Track Hiring</Text>
          </View>
        </View>

        <Text style={styles.title}>Welcome Job Hunter</Text>
        <Text style={styles.subtitle}>
          I’m happy to see you, let’s explore new dream jobs for your career with verified tech leaders.
        </Text>
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Start Explore Jobs"
          onPress={() => router.replace('/(tabs)')}
          style={styles.ctaBtn}
        />

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push('/auth')}
        >
          <Text style={styles.loginLinkText}>
            Have an account? <Text style={styles.loginLinkBold}>Login here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 88,
    height: 88,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  splashTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
  splashSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  topRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  skipText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  illustrationBox: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  tagBadge: {
    backgroundColor: colors.tagBg,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  tagBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  ctaBtn: {
    width: '100%',
  },
  loginLink: {
    marginTop: spacing.md,
    padding: 6,
  },
  loginLinkText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  loginLinkBold: {
    color: colors.primary,
    fontWeight: '700',
  },
});
