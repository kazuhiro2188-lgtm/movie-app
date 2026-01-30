import type { Metadata } from "next";
import { fetchPopularMovies, getImageUrl, convertRating } from "@/lib/tmdb";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import ErrorDisplay from "../components/Error";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
}

export const metadata: Metadata = {
  title: "人気映画一覧",
  description: "TMDBから取得した人気映画の一覧",
};

export default async function MoviesPage() {
  let movies: Array<{
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    rating: number;
  }> = [];
  let error: string | null = null;

  try {
    const results = await fetchPopularMovies("ja-JP", 1);
    movies = (results as Movie[]).map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: getImageUrl(movie.poster_path) || `https://picsum.photos/500/750?random=${movie.id}`,
      releaseDate: movie.release_date || "",
      rating: parseFloat(convertRating(movie.vote_average || 0)),
    }));
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : "エラーが発生しました";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="py-4 sm:py-6 md:py-8 lg:py-12">
        <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 px-3 sm:px-4">
          {/* メインテキスト */}
          <span className="relative inline-block z-10">
            <span className="bg-gradient-to-r from-yellow-300 via-amber-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] hover:drop-shadow-[0_0_20px_rgba(251,191,36,1)] transition-all duration-500">
              Popular movie
            </span>
          </span>
          {/* 強いグロー効果 */}
          <span className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-amber-400/50 blur-xl animate-pulse pointer-events-none">
            Popular movie
          </span>
          {/* アウトライン効果 */}
          <span className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent [-webkit-text-stroke:3px_rgba(251,191,36,0.4)] pointer-events-none">
            Popular movie
          </span>
          {/* パルスリング */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-full max-w-md h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent rounded-full blur-sm animate-pulse"></span>
          </span>
        </h1>
        {error ? (
          <ErrorDisplay message={error} />
        ) : movies.length === 0 ? (
          <Loading />
        ) : (
          <MovieList movies={movies} />
        )}
      </main>
    </div>
  );
}
