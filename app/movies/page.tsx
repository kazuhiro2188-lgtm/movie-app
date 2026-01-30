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
        <h1 className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
          {/* メインテキスト - オシャレなデザイン */}
          <span className="relative inline-block z-10">
            <span className="font-serif italic tracking-wider bg-gradient-to-r from-amber-200 via-yellow-300 via-amber-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] sm:drop-shadow-[0_0_10px_rgba(251,191,36,0.7)] hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.9)] transition-all duration-500 letter-spacing-[0.1em] sm:letter-spacing-[0.15em]">
              Popular
            </span>
            <span className="font-sans font-extralight tracking-[0.2em] text-amber-300/80 mx-2 sm:mx-3">•</span>
            <span className="font-serif italic tracking-wider bg-gradient-to-r from-yellow-300 via-amber-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] sm:drop-shadow-[0_0_10px_rgba(251,191,36,0.7)] hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.9)] transition-all duration-500 letter-spacing-[0.1em] sm:letter-spacing-[0.15em]">
              movie
            </span>
          </span>
          {/* 強いグロー効果 */}
          <span className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light text-amber-400/40 blur-lg pointer-events-none px-3 sm:px-4 md:px-6 lg:px-8">
            <span className="font-serif italic tracking-wider">Popular</span>
            <span className="font-sans font-extralight tracking-[0.2em] text-amber-300/60 mx-2 sm:mx-3">•</span>
            <span className="font-serif italic tracking-wider">movie</span>
          </span>
          {/* アウトライン効果 */}
          <span className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light text-transparent [-webkit-text-stroke:1px_rgba(251,191,36,0.2)] sm:[-webkit-text-stroke:1.5px_rgba(251,191,36,0.3)] pointer-events-none px-3 sm:px-4 md:px-6 lg:px-8">
            <span className="font-serif italic tracking-wider">Popular</span>
            <span className="font-sans font-extralight tracking-[0.2em] mx-2 sm:mx-3">•</span>
            <span className="font-serif italic tracking-wider">movie</span>
          </span>
          {/* エレガントな下線 */}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 md:w-40 lg:w-48 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></span>
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
