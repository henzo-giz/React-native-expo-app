import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { colors, fontAssets, fontFamilies } from '@/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const lightNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary.purple,
    background: colors.neutral.background,
    card: colors.neutral.background,
    text: colors.neutral.textPrimary,
    border: colors.neutral.border,
    notification: colors.semantic.error,
  },
  fonts: {
    regular: { fontFamily: fontFamilies.regular, fontWeight: '400' as const },
    medium: { fontFamily: fontFamilies.medium, fontWeight: '500' as const },
    bold: { fontFamily: fontFamilies.bold, fontWeight: '700' as const },
    heavy: { fontFamily: fontFamilies.bold, fontWeight: '700' as const },
  },
};

const darkNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary.purple,
    background: colors.neutral.textPrimary,
    card: colors.neutral.textPrimary,
    text: colors.neutral.background,
    border: '#25304D',
    notification: colors.semantic.error,
  },
  fonts: lightNavigationTheme.fonts,
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? darkNavigationTheme : lightNavigationTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
