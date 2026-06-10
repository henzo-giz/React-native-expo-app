import type { ImageSourcePropType } from "@/tw";

export const images: Record<string, ImageSourcePropType> = {
  mascotLogo: require("@/assets/images/moscot-logo.png"),
  mascotWelcome: require("@/assets/images/mascot-welcome.png"),
  mascotAuth: require("@/assets/images/mascot-auth.png"),
  earth: require("@/assets/images/earth.png"),
} as const;
