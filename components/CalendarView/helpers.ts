import { ApiResponse, QuizType } from "@/types";
import { CalendarDay, CalendarQuizInfo } from "./types";
import { CALENDAR_WEEK_COUNT, DAY_KEY_FORMATTER, DAY_NUMBER_FORMATTER, MONTH_NUMBER_FORMATTER, WEEK_DAYS } from "./consts";

export function createCalendarWeeks(data: ApiResponse): CalendarDay[][] {
  const today = new Date();
  const visibleStartDate = getStartOfCalendar(today);
  const quizzesByDay = groupQuizzesByDay(transformQuizInfo(data));

  return Array.from({ length: CALENDAR_WEEK_COUNT }, (_, weekIndex) =>
    Array.from({ length: WEEK_DAYS.length }, (_, dayIndex) => {
      const date = addDays(visibleStartDate, weekIndex * WEEK_DAYS.length + dayIndex);
      const dayKey = getDayKey(date);

      return {
        date,
        day: getDayNumber(date),
        isToday: dayKey === getDayKey(today),
        isMuted: getMonthNumber(date) !== getMonthNumber(today),
        quizInfo: quizzesByDay.get(dayKey) ?? [],
      };
    }),
  );
}

export function transformQuizInfo(quizInfo: ApiResponse): CalendarQuizInfo[] {
  const quizTypes = Object.keys(quizInfo) as QuizType[];

  return quizTypes.flatMap((type) =>
    quizInfo[type].map((quiz) => ({
      ...quiz,
      type,
      timestamp: new Date(quiz.dateTime).getTime(),
    })),
  );
}

export function groupQuizzesByDay(quizInfo: CalendarQuizInfo[]) {
  const quizzesByDay = new Map<string, CalendarQuizInfo[]>();

  quizInfo.forEach((quiz) => {
    const dayKey = getDayKey(new Date(quiz.dateTime));
    const dayQuizzes = quizzesByDay.get(dayKey) ?? [];

    dayQuizzes.push(quiz);
    quizzesByDay.set(dayKey, dayQuizzes);
  });

  quizzesByDay.forEach((dayQuizzes) => {
    dayQuizzes.sort((firstQuiz, secondQuiz) => firstQuiz.timestamp - secondQuiz.timestamp);
  });

  return quizzesByDay;
}

export function getStartOfCalendar(date: Date) {
  return addDays(date, -getMondayBasedDayIndex(date));
}

export function getMondayBasedDayIndex(date: Date) {
  const dayIndex = date.getDay();

  return dayIndex === 0 ? 6 : dayIndex - 1;
}

export function addDays(date: Date, days: number) {
  const nextDate = new Date(date);

  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
}

export function getDayKey(date: Date) {
  return DAY_KEY_FORMATTER.format(date);
}

export function getDayNumber(date: Date) {
  return Number(DAY_NUMBER_FORMATTER.format(date));
}

export function getMonthNumber(date: Date) {
  return Number(MONTH_NUMBER_FORMATTER.format(date));
}