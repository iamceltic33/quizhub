import type { QuizType, SiteQuizInfo } from '@/types';

export type CalendarQuizInfo = SiteQuizInfo & {
  type: QuizType;
  timestamp: number;
};

export type CalendarDay = {
  date: Date;
  day: number;
  isToday: boolean;
  isMuted: boolean;
  quizInfo: CalendarQuizInfo[];
};

export type CalendarCellProps = {
  day: CalendarDay;
  filters: Record<QuizType, boolean>;
};