export type LanguageId = "spanish" | "french" | "japanese";

export type LessonKind = "video" | "audio" | "chat" | "conversation" | "vocabulary" | "review";

export type ActivityKind =
  | "listen"
  | "speak"
  | "translate"
  | "match"
  | "multiple-choice"
  | "conversation";

export type DifficultyLevel = "beginner" | "easy" | "medium";

export type SupportedLanguage = {
  id: LanguageId;
  name: string;
  nativeName: string;
  shortName: string;
  flagEmoji: string;
  accentColor: string;
  description: string;
  learnerGoal: string;
};

export type LearningUnit = {
  id: string;
  languageId: LanguageId;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
};

export type VocabularyItem = {
  id: string;
  term: string;
  translation: string;
  pronunciation: string;
  example: string;
};

export type PhraseItem = {
  id: string;
  text: string;
  translation: string;
  pronunciation: string;
  context: string;
};

export type LessonGoal = {
  id: string;
  label: string;
};

export type LessonActivity = {
  id: string;
  type: ActivityKind;
  prompt: string;
  answer: string;
  options?: string[];
};

export type AiTeacherPrompt = {
  persona: string;
  lessonBrief: string;
  speakingCue: string;
  correctionStyle: string;
};

export type Lesson = {
  id: string;
  languageId: LanguageId;
  unitId: string;
  title: string;
  subtitle: string;
  kind: LessonKind;
  order: number;
  xpReward: number;
  estimatedMinutes: number;
  difficulty: DifficultyLevel;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: LessonActivity[];
  aiTeacherPrompt: AiTeacherPrompt;
};
