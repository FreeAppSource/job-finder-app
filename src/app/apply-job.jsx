import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useJobFinder } from '../data';
import { CustomButton } from '../components/CustomButton';

export default function ApplyJobScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { jobs, userProfile, applyForJob } = useJobFinder();

  const job = jobs.find((j) => j.id === id) || jobs[0];

  const [address, setAddress] = useState(userProfile.address);
  const [phone, setPhone] = useState(userProfile.phone);
  const [coverLetter, setCoverLetter] = useState(
    'Dear Hiring Team,\n\nI am thrilled to submit my application for this role. With strong skills in user interface and digital product systems, I am confident in adding high value from day one.'
  );
  const [loading, setLoading] = useState(false);

  const handleApplyNow = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      applyForJob({
        job,
        coverLetter,
        phone,
        address,
      });

      router.replace({
        pathname: '/apply-success',
        params: {
          company: job.company,
          role: job.title,
        },
      });
    }, 700);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apply Jobs</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner Announcement matching artboards 11 & 12 */}
        <View style={styles.targetBanner}>
          <Text style={styles.targetHeading}>
            You Will Applying to {job.company}{'\n'}as {job.title}
          </Text>
        </View>

        {/* Resume Card matching artboard 11 */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Resume</Text>
            <TouchableOpacity onPress={() => Alert.alert('Edit Resume', 'Choose new PDF from files')}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resumeBox}>
            <Ionicons name="document-text" size={32} color={colors.primary} />
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <Text style={styles.resumeName}>{userProfile.resumeName}</Text>
              <Text style={styles.resumeDate}>{userProfile.resumeUploadDate}</Text>
            </View>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          </View>
        </View>

        {/* Contact Address */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Address</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>

        {/* Phone */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Phone Number</Text>
          <View style={styles.phoneRow}>
            <Text style={styles.countryCode}>🇮🇩 +62</Text>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Application / Cover Letter */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Application Letter</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={coverLetter}
            onChangeText={setCoverLetter}
            multiline
            numberOfLines={5}
          />
        </View>

        <CustomButton
          title="Apply Now"
          onPress={handleApplyNow}
          loading={loading}
          style={styles.applyBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  targetBanner: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  targetHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
    lineHeight: 24,
  },
  sectionCard: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  editText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  resumeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.xs,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resumeName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  resumeDate: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xs,
    paddingHorizontal: spacing.md,
    height: 46,
    fontSize: 13,
    color: colors.text,
  },
  addressInput: {
    height: 60,
    paddingTop: 8,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 100,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  applyBtn: {
    marginTop: spacing.md,
  },
});
