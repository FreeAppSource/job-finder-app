import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing } from '../../theme';
import { JobCard } from '../../components/JobCard';
import { CustomButton } from '../../components/CustomButton';
import { useJobFinder } from '../../data';

export default function BookmarksScreen() {
  const router = useRouter();
  const { bookmarks, jobs } = useJobFinder();

  const bookmarkedJobs = jobs.filter((j) => bookmarks.includes(j.id));

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Bookmarks</Text>
        <Text style={styles.countText}>{bookmarkedJobs.length} Saved Jobs</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {bookmarkedJobs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyCircle}>
              <Ionicons name="bookmark-outline" size={48} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Activities Yet</Text>
            <Text style={styles.emptySub}>
              You have not bookmarked any job position yet. Explore jobs and save them for later!
            </Text>
            <CustomButton
              title="Explore Jobs"
              onPress={() => router.push('/(tabs)')}
              style={{ marginTop: spacing.lg }}
            />
          </View>
        ) : (
          bookmarkedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    paddingTop: 50,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  countText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  emptyCircle: {
    width: 90,
    height: 90,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
});
