import { getGenres } from "@/lib/tmdb";
import Link from "next/link";
import Loading from "../components/Loading";
import ErrorDisplay from "../components/Error";

interface Genre {
  id: number;
  name: string;
}

export default async function GenresPage() {
  let genres: Genre[] = [];
  let error: string | null = null;

  try {
    genres = (await getGenres("ja-JP")) as Genre[];
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : "エラーが発生しました";
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <main className="py-4 sm:py-6 md:py-8 lg:py-12">
          <ErrorDisplay message={error} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="py-3 sm:py-4 md:py-6 lg:py-8 xl:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-white px-2">
            ジャンル一覧
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/genres/${genre.id}`}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center active:bg-gray-700/50 sm:hover:bg-gray-700/50 transition-all duration-300 active:scale-95 sm:hover:-translate-y-2 sm:hover:shadow-lg border border-gray-700/50 touch-manipulation"
              >
                <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg">{genre.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
