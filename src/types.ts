export interface Student {
  name: string;
  level: string;
  attendance: number;
  gathasCount: number;
  totalGathas: number;
  attendanceScore: number;
  gathaScore: number;
  bonusPoints: number;
  progressStatus: 'Poor' | 'Average' | 'Good' | 'Excellent';
  profileImage: string;
  quizHistory?: QuizHistoryRecord[];
  completedLevels?: string[];
  promotionStatus?: 'Learning' | 'Revision Pending' | 'Awaiting Promotion' | 'Promoted';
  batch?: string;
  teacher?: string;
  classTiming?: string;
  batchChangesRemaining?: number;
  lastBatchChangeMonth?: string;
}

export interface QuickAccessItem {
  id: string;
  title: string;
  iconName: string;
  color: string;
  badge?: string;
  description: string;
}

export interface LiveClass {
  className: string;
  teacher: string;
  time: string;
  duration: string;
  isLiveNow: boolean;
  meetingLink: string;
}

export interface JainQuote {
  text: string;
  author: string;
  translation?: string;
}

export interface SutraDetails {
  id: string;
  name: string;
  prakrit: string[];
  english: string[];
  hindi: string[];
  gujarati: string[];
  meaning: string;
  audioDuration: string;
  level: number;
  category: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface BonusPoint {
  id: string;
  category: string;
  eventName: string;
  date: string;
  pointsAwarded: number;
  description?: string;
}

export interface AIQuizQuestion {
  question: string;
  type: 'mcq' | 'boolean' | 'fill';
  options: string[];
  correctAnswer: number | string;
  explanation: string;
}

export interface AIQuiz {
  id: string;
  title: string;
  relatedContentName: string;
  type: 'Sutra' | 'Stavan' | 'Stuti' | 'Gatha' | 'Jain Stories' | 'Bhagwan Stories' | 'Custom';
  questions: AIQuizQuestion[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  level: number;
  category: string;
  publishedAt: string;
}

export interface QuizAnswerRecord {
  question: string;
  type: 'mcq' | 'boolean' | 'fill';
  options: string[];
  userAnswer: number | string | null;
  correctAnswer: number | string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizHistoryRecord {
  quizId: string;
  quizTitle: string;
  category?: string;
  difficulty?: string;
  level?: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  pointsEarned?: number;
  timeSpentSeconds?: number;
  completedAt: string;
  userAnswers?: (number | string | null)[];
  answersSummary?: QuizAnswerRecord[];
}

