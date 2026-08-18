'use client';
import { ApiResponse, SiteQuizInfo } from '@repo/shared-types';

type QuizSectionProps = {
  title: string;
  subtitle: string;
  accent: string;
  items: SiteQuizInfo[];
};

function QuizCard({ item }: { item: SiteQuizInfo }) {
  return (
    <article className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {(new Date(item.dateTime)).toLocaleString('ru-RU')}
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

function QuizSection({ title, subtitle, accent, items }: QuizSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className={`mb-3 h-1.5 w-16 rounded-full ${accent}`} />
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="w-fit rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
          {items.length} игр
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid gap-3">
          {items.map((item, index) => (
            <QuizCard key={`${title}-${item.dateTime}-${index}`} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 px-5 py-8 text-center text-sm font-medium text-slate-500">
          Пока нет ближайших игр
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
        subtitle="Ближайшие игры от Quiz Please"
        accent="bg-teal-500"
        items={data.quizPlease}
      />
      <QuizSection
        title="Shaker"
        subtitle="Свежие события от Shaker Quiz"
        accent="bg-amber-400"
        items={data.shaker}
      />
      <QuizSection
        title="Smuzi"
        subtitle="Свежие события от Smuzi Quiz"
        accent="bg-indigo-900"
        items={data.smuzi}
      />
    </main>
  );
}
