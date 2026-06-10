import type { LanguageId, LearningUnit } from "@/types/learning";

export const units: LearningUnit[] = [
  {
    id: "spanish-basics",
    languageId: "spanish",
    title: "Spanish Basics",
    description: "Greetings, introductions, and simple classroom words.",
    order: 1,
    lessonIds: [
      "spanish-greetings",
      "spanish-introductions",
      "spanish-polite-phrases",
      "spanish-food-ordering",
      "spanish-numbers",
      "spanish-review-basics",
    ],
  },
  {
    id: "french-basics",
    languageId: "french",
    title: "French Basics",
    description: "Friendly first phrases for daily conversation.",
    order: 1,
    lessonIds: [
      "french-greetings",
      "french-introductions",
      "french-polite-phrases",
      "french-cafe",
      "french-numbers",
      "french-review-basics",
    ],
  },
  {
    id: "japanese-basics",
    languageId: "japanese",
    title: "Japanese Basics",
    description: "Simple greetings, polite phrases, and travel-ready words.",
    order: 1,
    lessonIds: [
      "japanese-greetings",
      "japanese-introductions",
      "japanese-polite-phrases",
      "japanese-food-ordering",
      "japanese-numbers",
      "japanese-review-basics",
    ],
  },
];

export function getUnitsByLanguage(languageId: LanguageId) {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((firstUnit, secondUnit) => firstUnit.order - secondUnit.order);
}

export function getUnitById(unitId: string) {
  return units.find((unit) => unit.id === unitId);
}
