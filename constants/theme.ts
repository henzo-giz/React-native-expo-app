import { appColors, fontFamilies } from "@/theme";

export const Colors = appColors;

export const Fonts = {
  sans: fontFamilies.regular,
  medium: fontFamilies.medium,
  semiBold: fontFamilies.semiBold,
  bold: fontFamilies.bold,
  rounded: fontFamilies.semiBold,
  mono: "monospace",
} as const;
