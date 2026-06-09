import { Feather, FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    TextInput as NativeTextInput,
    Platform,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "@/tw";

type AuthScreenProps = {
  mode: "sign-up" | "sign-in";
  title: string;
  subtitle: string;
  buttonLabel: string;
  footerText: string;
  footerLinkLabel: string;
  footerHref: "/sign-in" | "/sign-up";
  showPassword?: boolean;
};

const SOCIAL_OPTIONS = [
  { label: "Continue with Google", icon: "google", color: "#4285F4" },
  { label: "Continue with Facebook", icon: "facebook", color: "#1877F2" },
  { label: "Continue with Apple", icon: "apple", color: "#06112E" },
] as const;

export function AuthScreen({
  title,
  subtitle,
  buttonLabel,
  footerText,
  footerLinkLabel,
  footerHref,
  showPassword = false,
}: AuthScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(NativeTextInput | null)[]>([]);

  const openVerification = () => {
    setCode(["", "", "", "", "", ""]);
    setIsVerificationVisible(true);
  };

  useEffect(() => {
    if (isVerificationVisible) {
      const focusTimer = setTimeout(() => inputRefs.current[0]?.focus(), 250);
      return () => clearTimeout(focusTimer);
    }
  }, [isVerificationVisible]);

  const handleCodeChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...code];
    nextCode[index] = digit;
    setCode(nextCode);

    if (digit && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (digit && index === inputRefs.current.length - 1) {
      setIsVerificationVisible(false);
      router.replace("/");
    }
  };

  const handleCodeKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="min-h-full px-8 pb-8 pt-0">
          <TouchableOpacity activeOpacity={0.75} style={styles.backButton} onPress={() => router.back()}>
            <Feather name="chevron-left" size={34} color="#06112E" />
          </TouchableOpacity>

          <View className="mt-0">
            <Text className="font-poppins-bold h1 leading-[42px] text-lingua-text-primary">
              {title}
            </Text>
            <Text className="mt-3 font-poppins body-lg leading-[30px] text-[#66708D]">
              {subtitle}
            </Text>
          </View>

          <View className="mt-5 h-[175px] items-center justify-end overflow-hidden">
            <Text style={styles.sparkleLeft}>✦</Text>
            <Text style={styles.sparkleBlue}>✦</Text>
            <Text style={styles.sparkleYellow}>✦</Text>
            <Image source={images.mascotAuth} className="h-[210px] w-[210px]" resizeMode="contain" />
          </View>

          <View className="-mt-10 gap-3">
            <View style={styles.inputShell}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                value={email}
                placeholder={focusedField === "email" ? "" : "alex@gmail.com"}
                placeholderTextColor="#06112E"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                underlineColorAndroid="transparent"
                onBlur={() => setFocusedField(null)}
                onChangeText={setEmail}
                onFocus={() => setFocusedField("email")}
              />
            </View>

            {showPassword ? (
              <View style={styles.inputShell}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordRow}>
                  <TextInput
                    value={password}
                    placeholder={focusedField === "password" ? "" : "•••••••••"}
                    placeholderTextColor="#06112E"
                    secureTextEntry={!isPasswordVisible}
                    style={[styles.input, styles.passwordInput]}
                    underlineColorAndroid="transparent"
                    onBlur={() => setFocusedField(null)}
                    onChangeText={setPassword}
                    onFocus={() => setFocusedField("password")}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.passwordToggle}
                    onPress={() => setIsPasswordVisible((currentValue) => !currentValue)}
                  >
                    <Feather
                      name={isPasswordVisible ? "eye-off" : "eye"}
                      size={27}
                      color="#66708D"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>

          <TouchableOpacity activeOpacity={0.88} style={styles.primaryButton} onPress={openVerification}>
            <Text style={styles.primaryButtonText}>{buttonLabel}</Text>
          </TouchableOpacity>

          <View className="my-7 flex-row items-center gap-5">
            <View className="h-px flex-1 bg-[#E8EAF1]" />
            <Text className="font-poppins text-[14px] text-[#66708D]">or continue with</Text>
            <View className="h-px flex-1 bg-[#E8EAF1]" />
          </View>

          <View className="gap-3">
            {SOCIAL_OPTIONS.map((option) => (
              <TouchableOpacity key={option.label} activeOpacity={0.82} style={styles.socialButton}>
                <FontAwesome name={option.icon} size={31} color={option.color} style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mt-auto flex-row justify-center gap-1 pt-5">
            <Text className="font-poppins text-[15px] text-[#66708D]">{footerText}</Text>
            <Link href={footerHref}>
              <Text className="font-poppins-semibold text-[16px] text-lingua-deep-purple">
                {footerLinkLabel}
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>

      <Modal visible={isVerificationVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalKeyboard}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Check your email</Text>
              <Text style={styles.modalBody}>
                You have received a verification code. Enter the 6 digits below.
              </Text>
              <View style={styles.codeRow}>
                {code.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(input) => {
                      inputRefs.current[index] = input;
                    }}
                    value={digit}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={styles.codeInput}
                    textAlign="center"
                    underlineColorAndroid="transparent"
                    onChangeText={(value) => handleCodeChange(value, index)}
                    onKeyPress={({ nativeEvent }) => handleCodeKeyPress(nativeEvent.key, index)}
                  />
                ))}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
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
  backButton: {
    height: 44,
    width: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  sparkleLeft: {
    position: "absolute",
    left: 83,
    top: 52,
    color: "#FF9500",
    fontFamily: "Poppins-SemiBold",
    fontSize: 27,
    zIndex: 2,
  },
  sparkleBlue: {
    position: "absolute",
    right: 86,
    top: 61,
    color: "#62A9FF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 27,
    zIndex: 2,
  },
  sparkleYellow: {
    position: "absolute",
    right: 107,
    top: 108,
    color: "#FFD45C",
    fontFamily: "Poppins-SemiBold",
    fontSize: 27,
    zIndex: 2,
  },
  inputShell: {
    minHeight: 64,
    borderWidth: 1.5,
    borderColor: "#E8EAF1",
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingTop: 6,
    backgroundColor: "#FFFFFF",
  },
  inputLabel: {
    color: "#66708D",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
  input: {
    color: "#06112E",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    padding: 0,
    marginTop: 6,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    letterSpacing: 4,
  },
  passwordToggle: {
    height: 40,
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  primaryButton: {
    minHeight: 56,
    marginTop: 27,
    borderRadius: 18,
    backgroundColor: "#5B3BF6",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-semibold",
    fontSize: 19,
  },
  socialButton: {
    minHeight: 50,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: "#EEF0F5",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  socialIcon: {
    position: "absolute",
    left: 44,
  },
  socialButtonText: {
    color: "#06112E",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    left: 12,
  },
  modalKeyboard: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(6, 17, 46, 0.42)",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  modalCard: {
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 28,
  },
  modalTitle: {
    color: "#06112E",
    fontFamily: "Poppins-Bold",
    fontSize: 26,
    textAlign: "center",
  },
  modalBody: {
    marginTop: 12,
    color: "#66708D",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  codeRow: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  codeInput: {
    height: 54,
    flex: 1,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#E8EAF1",
    color: "#06112E",
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    padding: 0,
  },
});
