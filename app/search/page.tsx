"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import ErrorDisplay from "../components/Error";

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  rating: number;
}

interface TMDBMovie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        const error = new Error("検索に失敗しました") as Error;
        throw error;
      }

      const data = await response.json();
      const movieList = (data.results as TMDBMovie[]).map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : `https://picsum.photos/500/750?random=${movie.id}`,
        releaseDate: movie.release_date || "",
        rating: parseFloat(((movie.vote_average || 0) / 2).toFixed(1)),
      }));

      setMovies(movieList);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialQuery = searchParams.get("q");
    if (initialQuery) {
      handleSearch(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
    handleSearch(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="py-3 sm:py-4 md:py-6 lg:py-8 xl:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-white px-2">
            映画検索
          </h1>
          <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="映画タイトルを入力..."
                className="flex-1 px-4 py-2.5 sm:py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-amber-400 text-base sm:text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2.5 sm:py-2 bg-amber-400 text-gray-900 rounded-lg active:bg-amber-500 sm:hover:bg-amber-500 transition-colors font-semibold text-base sm:text-sm touch-manipulation whitespace-nowrap"
              >
                検索
              </button>
            </div>
          </form>

          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorDisplay message={error} onRetry={() => handleSearch(query)} />
          ) : movies.length > 0 ? (
            <>
              <p className="text-sm sm:text-base text-white mb-3 sm:mb-4 px-2 sm:px-0">検索結果: {movies.length}件</p>
              <MovieList movies={movies} />
            </>
          ) : query ? (
            <div className="text-center text-gray-400 py-8 sm:py-12 text-sm sm:text-base">
              検索結果が見つかりませんでした
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8 sm:py-12 text-sm sm:text-base">
              検索キーワードを入力してください
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <main className="py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Loading />
          </div>
        </main>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
