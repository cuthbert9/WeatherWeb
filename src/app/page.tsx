import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { EmptyState } from "@/components/EmptyState";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col p-6 md:p-12">
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto mt-20 md:mt-0 gap-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight">
          How&apos;s the sky looking today?
        </h1>

        <SearchForm />
        <EmptyState />
      </main>
    </div>
  );
}
