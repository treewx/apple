export interface HSKWord {
  chinese: string;
  pinyin: string;
  english: string;
  level: number; // HSK level 1-6
  category?: string; // e.g., "numbers", "family", "food", etc.
  difficulty?: 'easy' | 'medium' | 'hard';
  examples?: string[]; // Example sentences in Chinese
  imageUrl?: string;
}

export interface HSKLesson {
  id: string;
  title: string;
  description: string;
  level: number;
  words: HSKWord[];
  category: string;
  estimatedTime: number; // in minutes
}

export interface HSKLevel {
  level: number;
  title: string;
  description: string;
  totalWords: number;
  lessons: HSKLesson[];
  color: string; // theme color for the level
}

export interface UserProgress {
  userId: string;
  level: number;
  lessonId: string;
  wordsLearned: string[]; // Chinese characters of learned words
  testScores: TestResult[];
  lastAccessed: Date;
  completedLessons: string[];
}

export interface TestResult {
  lessonId: string;
  score: number; // percentage
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in seconds
  date: Date;
  mistakes: {
    word: HSKWord;
    userAnswer: string;
    correctAnswer: string;
  }[];
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in seconds
}

export interface QuizQuestion {
  id: string;
  type: 'translation' | 'pinyin' | 'listening' | 'multiple-choice';
  word: HSKWord;
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: string;
  explanation?: string;
}

export type StudyMode = 'learn' | 'review' | 'test';