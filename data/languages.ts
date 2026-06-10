import type { LanguageId, SupportedLanguage } from "@/types/learning";

export const languages: SupportedLanguage[] = [
  {
    id: "spanish",
    name: "Spanish",
    nativeName: "Español",
    shortName: "ES",
    flagEmoji: "https://flagcdn.com/w320/es.png",
    accentColor: "#FF5A5F",
    description: "Start friendly everyday conversations in Spanish.",
    learnerGoal: "Order food, greet people, and introduce yourself with confidence.",
  },
  {
    id: "french",
    name: "French",
    nativeName: "Français",
    shortName: "FR",
    flagEmoji: "https://flagcdn.com/w320/fr.png",
    accentColor: "#5B7CFA",
    description: "Learn useful French for travel and daily life.",
    learnerGoal: "Greet people, ask simple questions, and understand polite phrases.",
  },
  {
    id: "japanese",
    name: "Japanese",
    nativeName: "日本語",
    shortName: "JA",
    flagEmoji: "https://flagcdn.com/w320/jp.png",
    accentColor: "#F6B73C",
    description: "Build a gentle foundation for Japanese conversations.",
    learnerGoal: "Use greetings, thank people, and introduce yourself simply.",
  },
];

export function getLanguageById(languageId: LanguageId) {
  return languages.find((language) => language.id === languageId);
}
