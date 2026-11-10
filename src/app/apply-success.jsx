import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { CustomButton } from '../components/CustomButton';

export default function ApplySuccessScreen() {
  const router = useRouter();
  const { company, role } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.circle}>
          <Ionicons name="checkmark-sharp" size={48} color={colors.white} />
        </View>

        <Text style={styles.title}>Succes</Text>
        <Text style={styles.subtitle}>
          Your applying to {company || 'Google'} as {role || 'UI UX Designer'} has been send
        </Text>
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Explore Jobs"
          onPress={() => router.replace('/(tabs)')}
          style={styles.ctaBtn}
        />

        <TouchableOpacity
          style={styles.trackLink}
          onPress={() => router.replace('/(tabs)/applications')}
        >
          <Text style={styles.trackLinkText}>View In Applications</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 120,
  },
  circle: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  ctaBtn: {
    width: '100%',
  },
  trackLink: {
    marginTop: spacing.md,
    padding: 8,
  },
  trackLinkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
