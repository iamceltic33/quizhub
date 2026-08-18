'use client';
import { ApiResponse } from '@/types';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CalendarView } from './CalendarView';
import { ListView } from './ListView';

export type ViewMode = 'list' | 'calendar';

const VIEW_TABS: { label: string; value: ViewMode }[] = [
  { label: 'Список', value: 'list' },
  { label: 'Календарь', value: 'calendar' },
];

export function DataView(props: { data?: ApiResponse; initialViewMode: ViewMode }) {
  const data = props.data;
  const router = useRouter();
  const pathname = usePathname();
  const [viewMode, setViewMode] = useState<ViewMode>(props.initialViewMode);

  function handleViewModeChange(nextViewMode: ViewMode) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('view', nextViewMode);

    setViewMode(nextViewMode);
    router.replace(`${pathname}?${searchParams.toString()}`, { scroll: false });
  }

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
    <>
      <div className="mx-auto flex w-full max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
          {VIEW_TABS.map((tab) => {
            const isActive = viewMode === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleViewModeChange(tab.value)}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === 'list' ? <ListView data={data} /> : <CalendarView data={data}/>}
    </>
  );
}
