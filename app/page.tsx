import { AllQuizzes } from "@/components/AllQuizzes";
import { Header } from "@/components/Header";
import { type ViewMode } from "@/components/DataView";

export const metadata = {
  title: "QuizHub Karagandy",
};

type PageProps = {
  searchParams: Promise<{
    view?: string | string[];
  }>;
};

function getViewMode(view: string | string[] | undefined): ViewMode {
  const value = Array.isArray(view) ? view[0] : view;

  return value === "calendar" ? "calendar" : "list";
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialViewMode = getViewMode(params.view);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <AllQuizzes initialViewMode={initialViewMode} />
    </div>
  );
}
