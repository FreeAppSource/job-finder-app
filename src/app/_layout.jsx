import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '../theme';
import { JobFinderProvider } from '../data';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <JobFinderProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="job-detail" options={{ headerShown: false }} />
          <Stack.Screen name="apply-job" options={{ headerShown: false }} />
          <Stack.Screen name="apply-success" options={{ headerShown: false }} />
          <Stack.Screen name="notifications" options={{ headerShown: false }} />
        </Stack>
      </JobFinderProvider>
    </ThemeProvider>
  );
}
