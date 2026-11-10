import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { JobCard } from '../../components/JobCard';
import { useJobFinder } from '../../data';

export default function HomeScreen() {
  const router = useRouter();
  const { jobs, userProfile } = useJobFinder();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterModal, setFilterModal] = useState(false);
  const [selectedType, setSelectedType] = useState('All');

  const filteredJobs = jobs.filter((j) => {
    if (selectedCategory !== 'All' && j.category !== selectedCategory) return false;
    if (selectedType !== 'All' && j.type !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = j.title.toLowerCase().includes(q);
      const matchComp = j.company.toLowerCase().includes(q);
      if (!matchTitle && !matchComp) return false;
    }
    return true;
  });

  const featuredJobs = jobs.filter((j) => j.featured);

  return (
    <View style={styles.container}>
      {/* Top Greeting & User Bar matching artboard 23 */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingTitle}>Let’s Find</Text>
            <Text style={styles.greetingSub}>Your Dream Jobs</Text>
          </View>
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Image
              source={require('../../assets/images/avatar_fadli.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* Search Input Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search a job or position"
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setFilterModal(true)}
          >
            <Ionicons name="options-outline" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {['All', 'Design', 'Engineering', 'Marketing'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selectedCategory === cat && styles.activeChip]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.activeChipText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Jobs For You Carousel */}
        {!searchQuery && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Jobs For You</Text>
              <TouchableOpacity onPress={() => setSelectedCategory('All')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
              {featuredJobs.map((j) => (
                <JobCard key={j.id} job={j} horizontal />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recently Posted Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? `Results (${filteredJobs.length})` : 'Recently Posted'}
            </Text>
            {searchQuery && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.seeAll}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          {filteredJobs.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="briefcase-outline" size={48} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>No matching jobs found</Text>
              <Text style={styles.emptySub}>Try searching with different keywords.</Text>
            </View>
          ) : (
            filteredJobs.map((j) => (
              <JobCard key={j.id} job={j} />
            ))
          )}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={filterModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Jobs</Text>

            <Text style={styles.filterGroupTitle}>Job Type</Text>
            <View style={styles.pillsRow}>
              {['All', 'Fulltime', 'Internship'].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.pill, selectedType === t && styles.activePill]}
                  onPress={() => setSelectedType(t)}
                >
                  <Text style={[styles.pillText, selectedType === t && styles.activePillText]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.applyFilterBtn}
              onPress={() => setFilterModal(false)}
            >
              <Text style={styles.applyFilterText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 26,
  },
  greetingSub: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: 26,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  searchRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.xs,
    paddingHorizontal: spacing.md,
    height: 46,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  filterBtn: {
    width: 46,
    height: 46,
    backgroundColor: colors.primary,
    borderRadius: radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  chipsRow: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeChipText: {
    color: colors.white,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  horizontalList: {
    paddingVertical: 2,
  },
  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.sm,
  },
  emptySub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  filterGroupTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activePill: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activePillText: {
    color: colors.white,
  },
  applyFilterBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.xs,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyFilterText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
