import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import type { LanguageId, SupportedLanguage } from "@/types/learning";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "@/tw";

const learnerCounts: Record<LanguageId, string> = {
  spanish: "28.4M",
  french: "19.4M",
  japanese: "12.7M",
};

export default function LanguageSelectionScreen() {
  const [selectedLanguageId, setSelectedLanguageId] = useState<LanguageId>("spanish");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLanguages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return languages;
    }

    return languages.filter((language) => {
      return (
        language.name.toLowerCase().includes(query) ||
        language.nativeName.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const handleConfirm = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View className="min-h-full px-6 pb-0 pt-3">
          <View className="mb-8 flex-row items-center justify-center">
            <TouchableOpacity
              activeOpacity={0.8}
              className="absolute left-0 h-11 w-11 items-start justify-center"
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                }
              }}
            >
              <Ionicons name="chevron-back" size={32} color="#050A1F" />
            </TouchableOpacity>
            <Text className="font-poppins-semibold text-[21px] leading-[29px] text-lingua-text-primary">
              Choose a language
            </Text>
          </View>

          <View className="mb-8 h-[48px] flex-row items-center gap-4 rounded-[29px] border border-[#E6E8F0] bg-[#FAFAFD] px-5">
            <Ionicons name="search-outline" size={27} color="#66708D" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search languages"
              placeholderTextColor="#66708D"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.searchInput}
            />
          </View>

          <Text className="mb-5 font-poppins-semibold text-[18px] leading-[26px] text-lingua-text-primary">
            Popular
          </Text>

          <View className="gap-1">
            {filteredLanguages.map((language) => (
              <LanguageRow
                key={language.id}
                language={language}
                selected={language.id === selectedLanguageId}
                onPress={() => setSelectedLanguageId(language.id)}
              />
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.86}
            className="mt-6 min-h-[66px] flex-row items-center justify-center rounded-[24px] bg-lingua-deep-purple px-6"
            onPress={handleConfirm}
          >
            <Text className="font-poppins-semibold text-[17px] leading-[24px] text-white">
              Confirm language
            </Text>
          </TouchableOpacity>

          <View className="-mx-6 mt-6 h-[190px] justify-end overflow-hidden">
            <Image source={images.earth} className="h-[190px] w-full" resizeMode="cover" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type LanguageRowProps = {
  language: SupportedLanguage;
  selected: boolean;
  onPress: () => void;
};

function LanguageRow({ language, selected, onPress }: LanguageRowProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      style={[styles.languageRow, selected ? styles.selectedRow : styles.unselectedRow]}
      onPress={onPress}
    >
      <Image
        source={{ uri: language.flagEmoji }}
        className="h-[48px] w-[48px] rounded-full"
        resizeMode="cover"
      />

      <View className="ml-6 flex-1 gap-1">
        <Text className="font-poppins-semibold text-[20px] leading-[28px] text-lingua-text-primary">
          {language.name}
        </Text>
        <Text className="font-poppins text-[15px] leading-[21px] text-[#66708D]">
          {learnerCounts[language.id]} learners
        </Text>
      </View>

      {selected ? (
        <View className="h-9 w-9 items-center justify-center rounded-full bg-lingua-purple">
          <Ionicons name="checkmark" size={25} color="#FFFFFF" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={28} color="#66708D" />
      )}
    </TouchableOpacity>
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
  searchInput: {
    flex: 1,
    height: "100%",
    color: "#0D132B",
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    lineHeight: 24,
  },
  languageRow: {
    minHeight: 98,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    shadowColor: "#0D132B",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.03,
    shadowRadius: 18,
    elevation: 1,
  },
  unselectedRow: {
    borderColor: "#F0F1F6",
  },
  selectedRow: {
    backgroundColor: "#FAF9FF",
    borderColor: "#6C4EF5",
    borderWidth: 1.5,
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 2,
  },
});
