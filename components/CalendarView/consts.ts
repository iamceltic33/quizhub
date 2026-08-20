import { QuizType } from "@/types";

export const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const QUIZ_TIME_ZONE = 'Asia/Almaty';
export const CALENDAR_WEEK_COUNT = 6;

export const QUIZ_TYPE_META: {
  label: string;
  type: QuizType;
  className: string;
}[] = [
  {
    label: 'Квиз Плиз',
    type: 'quizPlease',
    className: 'border-rose-200 bg-rose-50 text-rose-900',
  },
  {
    label: 'Шейкер',
    type: 'shaker',
    className: 'border-amber-200 bg-amber-50 text-amber-900',
  },
  {
    label: 'Смузи',
    type: 'smuzi',
    className: 'border-indigo-200 bg-indigo-50 text-indigo-900',
  },
  {
    label: 'Мохито',
    type: 'mohito',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  },
];

export const QUIZ_TYPE_STYLES = QUIZ_TYPE_META.reduce(
  (styles, item) => ({
    ...styles,
    [item.type]: item.className,
  }),
  {} as Record<QuizType, string>,
);

export const DAY_KEY_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  day: '2-digit',
  month: '2-digit',
  timeZone: QUIZ_TIME_ZONE,
  year: 'numeric',
});

export const TIME_FORMATTER = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: QUIZ_TIME_ZONE,
});

export const DAY_NUMBER_FORMATTER = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  timeZone: QUIZ_TIME_ZONE,
});

export const MONTH_NUMBER_FORMATTER = new Intl.DateTimeFormat('ru-RU', {
  month: 'numeric',
  timeZone: QUIZ_TIME_ZONE,
});