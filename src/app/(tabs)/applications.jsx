import React, { useState } from 'react';
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
import { ApplicationCard } from '../../components/ApplicationCard';
import { useJobFinder } from '../../data';

export default function ApplicationsScreen() {
  const router = useRouter();
  const { applications } = useJobFinder();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = applications.filter((app) => {
    if (activeFilter === 'Review') return app.status === 'Review';
    if (activeFilter === 'Interview') return app.status === 'Interview';
    if (activeFilter === 'Not Suitable') return app.status === 'Not Suitable';
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Your Application</Text>
        <Text style={styles.countText}>{applications.length} Total</Text>
      </View>

      {/* Filter Tabs matching artboards 5, 7, 8, 10 */}
      <View style={styles.filterTabsRow}>
        {['All', 'Review', 'Interview', 'Not Suitable'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeFilter === tab && styles.activeTabBtn]}
            onPress={() => setActiveFilter(tab)}
          >
            <Text style={[styles.tabText, activeFilter === tab && styles.activeTabText]}>
              {tab === 'Review' ? 'In Review' : tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No applications under {activeFilter}</Text>
          </View>
        ) : (
          filtered.map((app) => (
            <ApplicationCard key={app.id} application={app} />
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
  filterTabsRow: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.xs,
  },
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.full,
  },
  activeTabBtn: {
    backgroundColor: colors.primaryLight,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '700',
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});
