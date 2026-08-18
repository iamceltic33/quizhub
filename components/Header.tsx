export function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          Karagandy
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Расписание квизов
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600">
            Ближайшие игры в одном аккуратном списке
          </p>
        </div>
      </div>
    </header>
  );
}
