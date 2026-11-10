import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme';
import { useJobFinder } from '../../data';
import { CustomButton } from '../../components/CustomButton';

export default function ProfileScreen() {
  const router = useRouter();
  const { userProfile, updateProfile } = useJobFinder();

  const [nameModal, setNameModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  const [newName, setNewName] = useState(userProfile.name);
  const [newEmail, setNewEmail] = useState(userProfile.email);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleSaveName = () => {
    updateProfile({ name: newName });
    setNameModal(false);
    Alert.alert('Updated', 'Name updated successfully.');
  };

  const handleSaveEmail = () => {
    updateProfile({ email: newEmail });
    setEmailModal(false);
    Alert.alert('Updated', 'Email updated successfully.');
  };

  const handleSavePassword = () => {
    setPasswordModal(false);
    setOldPass('');
    setNewPass('');
    Alert.alert('Updated', 'Password updated successfully.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of JobFinder?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/auth') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>My Account</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card matching artboard 28 */}
        <View style={styles.profileCard}>
          <Image
            source={require('../../assets/images/avatar_fadli.png')}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userEmail}>{userProfile.email}</Text>
        </View>

        {/* Account Details List matching artboard 28 */}
        <View style={styles.infoCard}>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => setNameModal(true)}
          >
            <View>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoVal}>{userProfile.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => setEmailModal(true)}
          >
            <View>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoVal}>{userProfile.email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoLabel}>Tanggal Lahir (Date of Birth)</Text>
              <Text style={styles.infoVal}>{userProfile.dob}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => setPasswordModal(true)}
          >
            <View>
              <Text style={styles.infoLabel}>Ubah Password (Change Password)</Text>
              <Text style={styles.infoVal}>{userProfile.passwordMasked}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Resume Card */}
        <View style={styles.resumeCard}>
          <View style={styles.resumeHeader}>
            <Ionicons name="document-attach" size={24} color={colors.primary} />
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <Text style={styles.resumeTitle}>{userProfile.resumeName}</Text>
              <Text style={styles.resumeSub}>{userProfile.resumeUploadDate}</Text>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Resume', 'Viewing CV Muhamad Fadli.pdf')}>
              <Text style={styles.viewResumeText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Change Name Modal matching artboards 15 & 16 */}
      <Modal visible={nameModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Change Name</Text>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput style={styles.input} value={newName} onChangeText={setNewName} />
            <CustomButton title="Save Changes" onPress={handleSaveName} style={{ marginTop: spacing.md }} />
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setNameModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Change Email Modal matching artboards 20 & 21 */}
      <Modal visible={emailModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Change Email</Text>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput style={styles.input} value={newEmail} onChangeText={setNewEmail} keyboardType="email-address" />
            <CustomButton title="Save Email" onPress={handleSaveEmail} style={{ marginTop: spacing.md }} />
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setEmailModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Change Password Modal matching artboards 17 & 18 */}
      <Modal visible={passwordModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Change Password</Text>
            <Text style={styles.inputLabel}>Current Password</Text>
            <TextInput style={styles.input} secureTextEntry value={oldPass} onChangeText={setOldPass} placeholder="••••••••" />
            <Text style={styles.inputLabel}>New Password</Text>
            <TextInput style={styles.input} secureTextEntry value={newPass} onChangeText={setNewPass} placeholder="••••••••" />
            <CustomButton title="Update Password" onPress={handleSavePassword} style={{ marginTop: spacing.md }} />
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setPasswordModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
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
  topBar: {
    paddingTop: 50,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    marginBottom: spacing.sm,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  userEmail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  infoVal: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  resumeCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  resumeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resumeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  resumeSub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  viewResumeText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.dangerLight,
    paddingVertical: 14,
    borderRadius: radius.xs,
  },
  logoutText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '700',
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
  modalHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
    marginTop: 6,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xs,
    paddingHorizontal: spacing.md,
    height: 44,
    fontSize: 14,
    color: colors.text,
  },
  cancelBtn: {
    marginTop: spacing.md,
    alignItems: 'center',
    padding: 8,
  },
  cancelText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
});
