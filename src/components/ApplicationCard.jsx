import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, spacing } from '../theme';

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
    default:
      return require('../assets/images/logo_google.png');
  }
};

export const ApplicationCard = ({ application }) => {
  const router = useRouter();

  const isInterview = application.status === 'Interview';
  const isReview = application.status === 'Review';
  const isNotSuitable = application.status === 'Not Suitable';

  const statusBg = isInterview
    ? colors.warningLight
    : isReview
    ? colors.successLight
    : colors.dangerLight;

  const statusColor = isInterview
    ? '#D99B00'
    : isReview
    ? colors.success
    : colors.danger;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.companyRow}>
          <View style={styles.logoBox}>
            <Image
              source={getCompanyLogo(application.logoKey)}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.titleCol}>
            <Text style={styles.jobTitle}>{application.jobTitle}</Text>
            <Text style={styles.companyName}>
              {application.company} • {application.appliedDate}
            </Text>
          </View>
        </View>

        <View style={[styles.statusPill, { backgroundColor: statusBg }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {isReview ? 'In review' : application.status}
          </Text>
        </View>
      </View>

      <View style={styles.detailsBox}>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Salary:</Text>
          <Text style={styles.metaVal}>{application.salary}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Resume Attached:</Text>
          <Text style={styles.metaVal}>{application.resumeName}</Text>
        </View>
        {application.interviewNote && (
          <View style={styles.interviewNoteBox}>
            <Ionicons name="calendar" size={14} color="#D99B00" />
            <Text style={styles.interviewNoteText}>{application.interviewNote}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.detailBtn}
        onPress={() => router.push({ pathname: '/job-detail', params: { id: application.jobId } })}
      >
        <Text style={styles.detailBtnText}>Detail Jobs</Text>
        <Ionicons name="chevron-forward" size={14} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: radius.xs,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  titleCol: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  companyName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  detailsBox: {
    backgroundColor: colors.background,
    borderRadius: radius.xs,
    padding: spacing.sm,
    marginVertical: spacing.xs,
    gap: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  metaVal: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  interviewNoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warningLight,
    padding: 6,
    borderRadius: radius.xs,
    marginTop: 4,
  },
  interviewNoteText: {
    fontSize: 11,
    color: '#D99B00',
    fontWeight: '600',
    flex: 1,
  },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: spacing.sm,
  },
  detailBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
});
