'use client';

import type { QuizType, SiteQuizInfo, ApiResponse } from '@/types';

type CalendarQuizInfo = SiteQuizInfo & {
  type: QuizType;
  timestamp: number;
};

type CalendarDay = {
  date: Date;
  day: number;
  isToday: boolean;
  isMuted: boolean;
  quizInfo: CalendarQuizInfo[];
};

type CalendarCellProps = {
  day: CalendarDay;
};

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const QUIZ_TIME_ZONE = 'Asia/Almaty';
const CALENDAR_WEEK_COUNT = 6;

const QUIZ_TYPE_STYLES: Record<QuizType, string> = {
  quizPlease: 'border-teal-200 bg-teal-50 text-teal-900',
  shaker: 'border-amber-200 bg-amber-50 text-amber-900',
  smuzi: 'border-indigo-200 bg-indigo-50 text-indigo-900',
  mohito: 'border-emerald-200 bg-emerald-50 text-emerald-900',
};

const DAY_KEY_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  day: '2-digit',
  month: '2-digit',
  timeZone: QUIZ_TIME_ZONE,
  year: 'numeric',
});

const TIME_FORMATTER = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: QUIZ_TIME_ZONE,
});

const DAY_NUMBER_FORMATTER = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  timeZone: QUIZ_TIME_ZONE,
});

const MONTH_NUMBER_FORMATTER = new Intl.DateTimeFormat('ru-RU', {
  month: 'numeric',
  timeZone: QUIZ_TIME_ZONE,
});

function CalendarCell({ day }: CalendarCellProps) {
  return (
    <div
      className={`min-h-28 border-r border-b border-slate-200 bg-white p-3 ${
        day.isMuted ? 'bg-slate-50 text-slate-400' : 'text-slate-900'
      } ${day.isToday ? 'ring-2 ring-inset ring-teal-500' : ''}`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`flex h-8 min-w-8 items-center justify-center rounded-full text-sm font-semibold ${
            day.isToday ? 'bg-teal-500 text-white' : ''
          }`}
        >
          {day.day}
        </span>
      </div>

      <ul className="mt-3 space-y-1.5">
        {day.quizInfo.map((item) => (
          <li
            key={`${item.type}-${item.dateTime}-${item.info}`}
            className={`rounded-md border px-2 py-1.5 text-xs font-medium leading-snug ${
              QUIZ_TYPE_STYLES[item.type]
            }`}
          >
            <span className="mr-1 font-bold">
              {TIME_FORMATTER.format(new Date(item.dateTime))}
            </span>
            {item.info}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CalendarView(props: { data: ApiResponse }) {
  const calendarWeeks = createCalendarWeeks(props.data);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Календарь игр
          </h2>
        </div>

        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="border-r border-slate-200 px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-500 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarWeeks.flat().map((day) => (
            <CalendarCell key={getDayKey(day.date)} day={day} />
          ))}
        </div>
      </section>
    </main>
  );
}

function createCalendarWeeks(data: ApiResponse): CalendarDay[][] {
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

function transformQuizInfo(quizInfo: ApiResponse): CalendarQuizInfo[] {
  const quizTypes = Object.keys(quizInfo) as QuizType[];

  return quizTypes.flatMap((type) =>
    quizInfo[type].map((quiz) => ({
      ...quiz,
      type,
      timestamp: new Date(quiz.dateTime).getTime(),
    })),
  );
}

function groupQuizzesByDay(quizInfo: CalendarQuizInfo[]) {
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

function getStartOfCalendar(date: Date) {
  return addDays(date, -getMondayBasedDayIndex(date));
}

function getMondayBasedDayIndex(date: Date) {
  const dayIndex = date.getDay();

  return dayIndex === 0 ? 6 : dayIndex - 1;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);

  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
}

function getDayKey(date: Date) {
  return DAY_KEY_FORMATTER.format(date);
}

function getDayNumber(date: Date) {
  return Number(DAY_NUMBER_FORMATTER.format(date));
}

function getMonthNumber(date: Date) {
  return Number(MONTH_NUMBER_FORMATTER.format(date));
}
