export const colors = {
  primary: {
    purple: "#6C4EF5",
    deepPurple: "#5B3BF6",
    blue: "#4D8BFF",
    green: "#21C16B",
  },
  semantic: {
    success: "#21C16B",
    warning: "#FFC800",
    streak: "#FF8A00",
    error: "#FF4D4F",
    info: "#4D8BFF",
  },
  neutral: {
    textPrimary: "#0D132B",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    surface: "#F6F7FB",
    background: "#FFFFFF",
  },
} as const;

export const appColors = {
  light: {
    text: colors.neutral.textPrimary,
    background: colors.neutral.background,
    tint: colors.primary.purple,
    icon: colors.neutral.textSecondary,
    tabIconDefault: colors.neutral.textSecondary,
    tabIconSelected: colors.primary.purple,
    border: colors.neutral.border,
    surface: colors.neutral.surface,
  },
  dark: {
    text: colors.neutral.background,
    background: colors.neutral.textPrimary,
    tint: colors.primary.purple,
    icon: colors.neutral.border,
    tabIconDefault: colors.neutral.border,
    tabIconSelected: colors.primary.purple,
    border: "#25304D",
    surface: "#151A35",
  },
} as const;
