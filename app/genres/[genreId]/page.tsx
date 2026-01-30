import { getMoviesByGenre, getGenres, getImageUrl, convertRating } from "@/lib/tmdb";
import MovieList from "@/app/components/MovieList";
import Loading from "@/app/components/Loading";
import ErrorDisplay from "@/app/components/Error";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    genreId: string;
  }>;
}

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
}

export default async function GenreDetailPage({ params }: PageProps) {
  const { genreId: genreIdParam } = await params;
  const genreId = parseInt(genreIdParam);

  if (isNaN(genreId)) {
    notFound();
  }

  let movies: Array<{
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    rating: number;
  }> = [];
  let genreName = "";
  let error: string | null = null;

  try {
    const [movieResults, genreList] = await Promise.all([
      getMoviesByGenre(genreId, "ja-JP", 1),
      getGenres("ja-JP"),
    ]);

    const genre = (genreList as Genre[]).find((g) => g.id === genreId);
    if (!genre) {
      notFound();
    }

    genreName = genre.name;
    movies = (movieResults as Movie[]).map((movie) => ({
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-white px-4">
          {genreName}の映画
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
