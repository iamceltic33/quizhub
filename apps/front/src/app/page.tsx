import { AllQuizzes } from "../components/AllQuizzes";
import { Header } from "../components/Header";

export const metadata = {
  title: "QuizHub Karagandy",
};

export default function Page() {

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <AllQuizzes />
    </div>
  );
}