'use client';
import { ApiResponse, SiteQuizInfo } from '@/types';
import { useState } from 'react';

type QuizSectionProps = {
  title: string;
  items: SiteQuizInfo[];
};

const QUIZ_DATE_FORMAT = new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Almaty',
});

function QuizCard({ item }: { item: SiteQuizInfo }) {
  return (
    <article className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {QUIZ_DATE_FORMAT.format(new Date(item.dateTime))}
          </p>
          <h3 className="text-base font-semibold leading-snug text-slate-950">
            {item.info}
          </h3>
        </div>

        {item.additionalInfo && (
          <div className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
            {item.additionalInfo}
          </div>
        )}
      </div>
    </article>
  );
}

function QuizSection({ title, items }: QuizSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex cursor-pointer w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-slate-50 sm:px-5"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
              isOpen ? 'bg-teal-500' : 'bg-slate-300'
            }`}
          />
          <h2 className="truncate text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
            {title}
          </h2>
        </span>

        <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
          {items.length} игр
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-slate-200 bg-slate-50/70 p-3 sm:p-4">
          {items.length > 0 ? (
            <div className="grid gap-3">
              {items.map((item, index) => (
                <QuizCard
                  key={`${title}-${item.dateTime}-${index}`}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 px-5 py-8 text-center text-sm font-medium text-slate-500">
              Пока нет ближайших игр
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export function DataView(props: { data?: ApiResponse }) {
  const data = props.data;

  if (!data) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500 shadow-sm">
          Данные пока не загрузились
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:px-8">
      <QuizSection
        title="Quiz Please"
        items={data.quizPlease}
      />
      <QuizSection
        title="Shaker"
        items={data.shaker}
      />
      <QuizSection
        title="Smuzi"
        items={data.smuzi}
      />

      <QuizSection
        title="Mohito"
        items={data.mohito}
      />
    </main>
  );
}
