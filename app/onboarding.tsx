import { useAuth } from "@clerk/expo";
import { Link, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { Image, ScrollView, Text, TouchableOpacity, View } from "@/tw";

export default function OnboardingScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { width } = useWindowDimensions();
  const artworkSize = Math.min(width * 0.86, 390);

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="min-h-full w-full justify-between px-10 pb-8 pt-6">
          <View>
            <View className="mb-10 flex-row items-center justify-center gap-3">
              <Image source={images.mascotLogo} className="h-14 w-14" resizeMode="contain" />
              <Text className="h1 leading-[50px] text-lingua-text-primary">
                Qualingo
              </Text>
            </View>

            <View className="gap-4">
              <Text className="h1 text-lingua-text-primary">
                Your AI language{"\n"}
                <Text className="text-lingua-deep-purple">teacher.</Text>
              </Text>
              <Text className="max-w-[360px] font-poppins body-lg leading-[36px] text-lingua-text-secondary">
                Real conversations, personalized{"\n"}lessons, anytime, anywhere.
              </Text>
            </View>
          </View>

          <View className="relative mt-10 items-center" style={{ minHeight: artworkSize }}>
            <SpeechBubble
              label="Hello!"
              containerClassName="left-5 top-4 bg-[#EEF8FF]"
              textClassName="text-[25px] text-lingua-text-primary"
              tailClassName="bottom-[-10px] right-8 bg-[#EEF8FF]"
              rotation="-rotate-6"
            />
            <SpeechBubble
              label="¡Hola!"
              containerClassName="right-9 top-0 bg-[#F7F5FF]"
              textClassName="text-[26px] text-lingua-deep-purple"
              tailClassName="bottom-[-10px] left-8 bg-[#F7F5FF]"
              rotation="rotate-12"
            />
            <SpeechBubble
              label="你好!"
              containerClassName="right-1 top-30 bg-[#FFF4EF]"
              textClassName="text-[25px] text-[#FF3F2E]"
              tailClassName="bottom-[-10px] left-8 bg-[#FFF4EF]"
              rotation="rotate-12"
            />

            <Image
              source={images.mascotWelcome}
              className="mt-8"
              style={{ width: artworkSize, height: artworkSize, zIndex: 10, }}
              resizeMode="contain"
            />
          </View>

          <Link href="/sign-up" asChild>
            <TouchableOpacity activeOpacity={0.86} style={styles.ctaButton}>
              <Text style={styles.ctaLabel}>Get Started</Text>
              <Text style={styles.ctaArrow}>
                ›
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type SpeechBubbleProps = {
  label: string;
  containerClassName: string;
  textClassName: string;
  tailClassName: string;
  rotation: string;
};

function SpeechBubble({
  label,
  containerClassName,
  textClassName,
  tailClassName,
  rotation,
}: SpeechBubbleProps) {
  return (
    <View className={`absolute z-10 rounded-[18px] px-5 py-1 ${containerClassName} ${rotation}`}>
      <Text className={`font-poppins-medium ${textClassName}`}>{label}</Text>
      <View className={`absolute h-6 w-6 rotate-45 ${tailClassName}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  ctaButton: {
    minHeight: 65,
    width: "100%",
    marginTop: 32,
    paddingHorizontal: 32,
    borderRadius: 26,
    backgroundColor: "#5B3BF6",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  ctaLabel: {
    color: "#FFFFFF",
    fontFamily: "Poppins",
    fontSize: 25,
  },
  ctaArrow: {
    position: "absolute",
    right: 36,
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
    fontSize: 48,
    lineHeight: 61,
  },
});
