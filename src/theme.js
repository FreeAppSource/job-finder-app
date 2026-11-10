import React, { createContext, useContext, useState } from 'react';

export const colors = {
  primary: '#475BD8',
  primaryDark: '#3949AD',
  primaryLight: '#EBF0FF',
  secondary: '#223263',
  background: '#F6F7FA',
  card: '#FFFFFF',
  text: '#242323',
  textSecondary: '#6B7A99',
  textMuted: '#9CA5BF',
  border: '#E9EDF5',
  borderLight: '#F0F3F8',
  success: '#53D1B6',
  successLight: '#E9FFEB',
  warning: '#FFC833',
  warningLight: '#FFF9E6',
  danger: '#C94F59',
  dangerLight: '#FFE2EB',
  white: '#FFFFFF',
  black: '#000000',
  tagBg: '#EBF0FF',
  tagText: '#475BD8',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const radius = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const typography = {
  fontFamily: 'System',
  h1: { fontSize: 24, fontWeight: '700', lineHeight: 30 },
  h2: { fontSize: 20, fontWeight: '700', lineHeight: 26 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body1: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  body2: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
};

export const palettes = {
  light: {
    bg: '#F6F7FA',
    card: '#FFFFFF',
    text: '#242323',
    subText: '#6B7A99',
    mutedText: '#9CA5BF',
    border: '#E9EDF5',
    primary: '#475BD8',
    primaryLight: '#EBF0FF',
  },
  dark: {
    bg: '#121626',
    card: '#1A2035',
    text: '#F2F5FF',
    subText: '#A1ADC7',
    mutedText: '#6B7A99',
    border: '#283250',
    primary: '#475BD8',
    primaryLight: '#232D52',
  },
};

const ThemeContext = createContext({
  theme: palettes.light,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? palettes.dark : palettes.light;
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
