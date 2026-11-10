import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { CustomButton } from '../components/CustomButton';

export default function AuthScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('Muhamad Fadli');
  const [email, setEmail] = useState('Fadly00@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
        <Text style={styles.subtitle}>
          {isLogin
            ? 'Sign in to access your applied jobs and saved roles'
            : 'Join JobFinder to discover and apply to top tech positions'}
        </Text>

        {!isLogin && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={18} color={colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Muhamad Fadli"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color={colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="Fadly00@gmail.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isLogin && (
          <TouchableOpacity
            style={styles.forgotBtn}
            onPress={() => Alert.alert('Forgot Password', 'Password reset instructions sent to ' + email)}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        <CustomButton
          title={isLogin ? 'Login' : 'Register'}
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitBtn}
        />

        <TouchableOpacity
          style={styles.switchMode}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchText}>
            {isLogin ? "Don’t have account? " : 'Already a member? '}
            <Text style={styles.switchTextBold}>
              {isLogin ? 'Register here.' : 'Login here.'}
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topNav: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  backBtn: {
    padding: 6,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xs,
    paddingHorizontal: spacing.md,
    height: 48,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
    padding: 4,
  },
  forgotText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  submitBtn: {
    marginTop: spacing.md,
  },
  switchMode: {
    alignItems: 'center',
    marginTop: spacing.xl,
    padding: 6,
  },
  switchText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  switchTextBold: {
    color: colors.primary,
    fontWeight: '700',
  },
});
