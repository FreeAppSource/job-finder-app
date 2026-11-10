import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useJobFinder } from '../data';
import { CustomButton } from '../components/CustomButton';

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

export default function JobDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { jobs, isBookmarked, toggleBookmark } = useJobFinder();

  const [activeTab, setActiveTab] = useState('desc'); // 'desc' | 'req' | 'resp'

  const job = jobs.find((j) => j.id === id) || jobs[0];
  const bookmarked = isBookmarked(job.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{job.company}</Text>
        <TouchableOpacity onPress={() => toggleBookmark(job.id)} style={styles.navBtn}>
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={bookmarked ? colors.primary : colors.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Company & Role Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.logoBox}>
            <Image
              source={getCompanyLogo(job.logoKey)}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyLoc}>{job.company} - {job.location}</Text>

          <View style={styles.badgesRow}>
            <View style={styles.badge}><Text style={styles.badgeText}>{job.level}</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>{job.category}</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>{job.type}</Text></View>
          </View>

          <Text style={styles.salary}>{job.salary}</Text>
        </View>

        {/* Skills Needed */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Skill Needed</Text>
          <View style={styles.skillsGrid}>
            {job.skills.map((skill) => (
              <View key={skill} style={styles.skillPill}>
                <Text style={styles.skillPillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tabs Row matching artboard 19 */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'desc' && styles.activeTabBtn]}
            onPress={() => setActiveTab('desc')}
          >
            <Text style={[styles.tabLabel, activeTab === 'desc' && styles.activeTabLabel]}>Description</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'req' && styles.activeTabBtn]}
            onPress={() => setActiveTab('req')}
          >
            <Text style={[styles.tabLabel, activeTab === 'req' && styles.activeTabLabel]}>Requirements</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'resp' && styles.activeTabBtn]}
            onPress={() => setActiveTab('resp')}
          >
            <Text style={[styles.tabLabel, activeTab === 'resp' && styles.activeTabLabel]}>Responsibilities</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content Card */}
        <View style={styles.tabContentCard}>
          {activeTab === 'desc' && (
            <Text style={styles.bodyText}>{job.description}</Text>
          )}

          {activeTab === 'req' && (
            <View style={styles.bulletList}>
              {job.requirements.map((req, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
                  <Text style={styles.bulletText}>{req}</Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'resp' && (
            <View style={styles.bulletList}>
              {job.responsibilities.map((resp, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Ionicons name="radio-button-on" size={14} color={colors.primary} />
                  <Text style={styles.bulletText}>{resp}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Bottom Apply CTA Bar */}
      <View style={styles.bottomBar}>
        <CustomButton
          title="Apply"
          onPress={() => router.push({ pathname: '/apply-job', params: { id: job.id } })}
          style={styles.applyBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  navBtn: {
    padding: 6,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 90,
  },
  headerCard: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: radius.sm,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginBottom: spacing.sm,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  companyLoc: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: spacing.sm,
  },
  badge: {
    backgroundColor: colors.tagBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.xs,
  },
  badgeText: {
    color: colors.tagText,
    fontSize: 11,
    fontWeight: '700',
  },
  salary: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  sectionCard: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillPill: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.xs,
  },
  skillPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginTop: spacing.md,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabBtn: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: '700',
  },
  tabContentCard: {
    paddingVertical: spacing.md,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  bulletList: {
    gap: spacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletText: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  applyBtn: {
    width: '100%',
  },
});
