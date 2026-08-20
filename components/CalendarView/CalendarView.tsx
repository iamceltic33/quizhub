'use client';

import type { QuizType, ApiResponse } from '@/types';
import { useState } from 'react';
import type { CalendarCellProps } from './types';
import { QUIZ_TYPE_META, QUIZ_TYPE_STYLES, TIME_FORMATTER, WEEK_DAYS } from './consts';
import { createCalendarWeeks, getDayKey } from './helpers';

function CalendarCell({ day, filters }: CalendarCellProps) {
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
            className={`cursor-pointer rounded-md border px-2 py-1.5 text-xs font-medium leading-snug ${
              QUIZ_TYPE_STYLES[item.type]
            } ${filters[item.type] ? '' : 'hidden'}`}
          >
            <span className="mr-1 font-bold">
              {TIME_FORMATTER.format(new Date(item.dateTime))}
            </span>
            <span>{item.info}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


export function CalendarView(props: { data: ApiResponse }) {
  const calendarWeeks = createCalendarWeeks(props.data);
  const [filters, setFilters] = useState<Record<QuizType, boolean>>({
    shaker: true, smuzi: true, quizPlease: true, mohito: true
  });

  const updateFilters = (quiz: QuizType) => {
    setFilters(old => ({
        ...old,
        [quiz]: !old[quiz]
    }))
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
          <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            Календарь игр
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-200 px-4 py-3 sm:px-5">
            {QUIZ_TYPE_META.map((item) => (
                <div
                key={item.type}
                role="button"
                tabIndex={0}
                aria-pressed={filters[item.type]}
                onClick={() => updateFilters(item.type)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    updateFilters(item.type);
                  }
                }}
                className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  filters[item.type]
                    ? `${item.className} shadow-sm`
                    : 'border-slate-200 bg-slate-50 text-slate-400 opacity-70 hover:opacity-100'
                }`}
                >
                {item.label}
                </div>
            ))}
            </div>

        <div className="hidden sm:grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="border-r border-slate-200 px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-500 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7">
          {calendarWeeks.flat().map((day) => (
            <CalendarCell filters={filters} key={getDayKey(day.date)} day={day} />
          ))}
        </div>
      </section>
    </main>
  );
}
