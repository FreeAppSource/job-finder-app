import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing } from '../theme';
import { useJobFinder } from '../data';

const getCompanyLogo = (key) => {
  switch (key) {
    case 'logo_google.png':
      return require('../assets/images/logo_google.png');
    case 'logo_dribbble.png':
      return require('../assets/images/logo_dribbble.png');
    case 'logo_gojek.png':
      return require('../assets/images/logo_gojek.png');
    case 'logo_bukalapak.png':
      return require('../assets/images/logo_bukalapak.png');
    case 'logo_tokopedia.png':
      return require('../assets/images/logo_tokopedia.png');
    case 'logo_traveloka.png':
      return require('../assets/images/logo_traveloka.png');
    case 'logo_linkedin.png':
      return require('../assets/images/logo_linkedin.png');
    default:
      return require('../assets/images/logo_google.png');
  }
};

export const JobCard = ({ job, horizontal = false }) => {
  const router = useRouter();
  const { isBookmarked, toggleBookmark } = useJobFinder();
  const bookmarked = isBookmarked(job.id);

  const handlePress = () => {
    router.push({
      pathname: '/job-detail',
      params: { id: job.id },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={handlePress}
      style={[styles.card, horizontal ? styles.horizontalCard : styles.fullCard]}
    >
      <View style={styles.topRow}>
        <View style={styles.logoWrapper}>
          <Image
            source={getCompanyLogo(job.logoKey)}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity
          style={styles.bookmarkBtn}
          onPress={() => toggleBookmark(job.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={bookmarked ? colors.primary : colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title} numberOfLines={1}>{job.title}</Text>
      <Text style={styles.companyLoc} numberOfLines={1}>
        {job.company} • {job.location}
      </Text>

      {/* Badges */}
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{job.type}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{job.level}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{job.category}</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.salary}>{job.salary}</Text>
        <Ionicons name="arrow-forward" size={16} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    marginBottom: spacing.md,
  },
  horizontalCard: {
    width: 250,
    marginRight: spacing.md,
  },
  fullCard: {
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  logoWrapper: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  bookmarkBtn: {
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  companyLoc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.md,
  },
  badge: {
    backgroundColor: colors.tagBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
  },
  badgeText: {
    color: colors.tagText,
    fontSize: 11,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.xs,
  },
  salary: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
});
