"use client";

import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import { getMovieDetails, getImageUrl, convertRating } from "@/lib/tmdb";

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  rating: number;
}

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<"favorites" | "watched" | "watchlist">("favorites");
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ローカルストレージからデータを取得
    const loadMovies = async () => {
      setLoading(true);
      try {
        const favIds = JSON.parse(localStorage.getItem("favorites") || "[]");
        const watchedIds = JSON.parse(localStorage.getItem("watched") || "[]");
        const watchlistIds = JSON.parse(localStorage.getItem("watchlist") || "[]");

        // 各IDから映画データを取得
        const [favMovies, watchedMovies, watchlistMovies] = await Promise.all([
          Promise.all(favIds.map((id: number) => fetchMovieData(id))),
          Promise.all(watchedIds.map((id: number) => fetchMovieData(id))),
          Promise.all(watchlistIds.map((id: number) => fetchMovieData(id))),
        ]);

        setFavorites(favMovies.filter(Boolean) as Movie[]);
        setWatched(watchedMovies.filter(Boolean) as Movie[]);
        setWatchlist(watchlistMovies.filter(Boolean) as Movie[]);
      } catch (error) {
        console.error("データの読み込みに失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const fetchMovieData = async (id: number): Promise<Movie | null> => {
    try {
      const response = await fetch(`/api/movie/${id}`);
      if (!response.ok) return null;
      const movie = await response.json();
      return {
        id: movie.id,
        title: movie.title,
        posterPath: getImageUrl(movie.poster_path) || `https://picsum.photos/500/750?random=${movie.id}`,
        releaseDate: movie.release_date || "",
        rating: parseFloat(convertRating(movie.vote_average)),
      };
    } catch {
      return null;
    }
  };

  const getCurrentMovies = () => {
    switch (activeTab) {
      case "favorites":
        return favorites;
      case "watched":
        return watched;
      case "watchlist":
        return watchlist;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="py-3 sm:py-4 md:py-6 lg:py-8 xl:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-white px-2">
            マイページ
          </h1>

          {/* タブ */}
          <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 scrollbar-hide">
            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-colors whitespace-nowrap text-sm sm:text-base touch-manipulation ${
                activeTab === "favorites"
                  ? "bg-amber-400 text-gray-900"
                  : "bg-gray-700 text-white active:bg-gray-600 sm:hover:bg-gray-600"
              }`}
            >
              お気に入り ({favorites.length})
            </button>
            <button
              onClick={() => setActiveTab("watched")}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-colors whitespace-nowrap text-sm sm:text-base touch-manipulation ${
                activeTab === "watched"
                  ? "bg-amber-400 text-gray-900"
                  : "bg-gray-700 text-white active:bg-gray-600 sm:hover:bg-gray-600"
              }`}
            >
              視聴済み ({watched.length})
            </button>
            <button
              onClick={() => setActiveTab("watchlist")}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg font-semibold transition-colors whitespace-nowrap text-sm sm:text-base touch-manipulation ${
                activeTab === "watchlist"
                  ? "bg-amber-400 text-gray-900"
                  : "bg-gray-700 text-white active:bg-gray-600 sm:hover:bg-gray-600"
              }`}
            >
              視聴予定 ({watchlist.length})
            </button>
          </div>

          {/* コンテンツ */}
          {loading ? (
            <div className="text-center text-gray-400 py-8 sm:py-12 text-sm sm:text-base">読み込み中...</div>
          ) : getCurrentMovies().length > 0 ? (
            <MovieList movies={getCurrentMovies()} />
          ) : (
            <div className="text-center text-gray-400 py-8 sm:py-12 text-sm sm:text-base">
              {activeTab === "favorites" && "お気に入りがありません"}
              {activeTab === "watched" && "視聴済みの映画がありません"}
              {activeTab === "watchlist" && "視聴予定の映画がありません"}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
