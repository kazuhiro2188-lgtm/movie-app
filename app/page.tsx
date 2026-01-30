import MovieList from "./components/MovieList";
import { fetchPopularMovies, getImageUrl, convertRating } from "@/lib/tmdb";
import Loading from "./components/Loading";
import ErrorDisplay from "./components/Error";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
}

export default async function Home() {
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
      <main className="py-3 sm:py-4 md:py-6 lg:py-8 xl:py-12">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif italic font-bold text-center mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-12 px-3 sm:px-4 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
          Popular movie
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
