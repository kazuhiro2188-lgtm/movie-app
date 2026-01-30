import { getMovieDetails, getSimilarMovies, getImageUrl, convertRating } from "@/lib/tmdb";
import Image from "next/image";
import { notFound } from "next/navigation";
import MovieList from "@/app/components/MovieList";
import Loading from "@/app/components/Loading";
import ErrorDisplay from "@/app/components/Error";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface SimilarMovie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
}

interface Genre {
  id: number;
  name: string;
}

interface MovieDetail {
  id: number;
  title: string;
  release_date?: string;
  vote_average?: number;
  backdrop_path?: string;
  poster_path?: string;
  overview?: string;
  genres?: Genre[];
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    notFound();
  }

  let movie: MovieDetail | null = null;
  let similarMovies: Array<{
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    rating: number;
  }> = [];
  let error: string | null = null;

  try {
    const [movieData, similarData] = await Promise.all([
      getMovieDetails(movieId, "ja-JP"),
      getSimilarMovies(movieId, "ja-JP", 1),
    ]);

    movie = movieData;
    similarMovies = (similarData as SimilarMovie[]).map((m) => ({
      id: m.id,
      title: m.title,
      posterPath: getImageUrl(m.poster_path) || `https://picsum.photos/500/750?random=${m.id}`,
      releaseDate: m.release_date || "",
      rating: parseFloat(convertRating(m.vote_average || 0)),
    }));
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

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <main className="py-4 sm:py-6 md:py-8 lg:py-12">
          <Loading />
        </main>
      </div>
    );
  }

  const rating = parseFloat(convertRating(movie.vote_average));
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const stars = "★".repeat(fullStars) + (hasHalfStar ? "☆" : "") + "☆".repeat(emptyStars);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* バックドロップ背景 */}
          {movie.backdrop_path && (
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <Image
                src={getImageUrl(movie.backdrop_path, "w1280") || ""}
                alt={movie.title}
                fill
                className="object-cover opacity-20"
                priority
              />
            </div>
          )}

          {/* 映画詳細情報 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-12">
            {/* ポスター */}
            <div className="flex-shrink-0">
              <Image
                src={getImageUrl(movie.poster_path, "w500") || `https://picsum.photos/500/750?random=${movie.id}`}
                alt={movie.title}
                width={500}
                height={750}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>

            {/* 情報 */}
            <div className="flex-1 text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>

              <div className="mb-4">
                <p className="text-gray-300 mb-2">公開日: {movie.release_date || "不明"}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-400 text-xl">{stars}</span>
                  <span className="text-lg font-semibold">{rating.toFixed(1)}</span>
                </div>
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(movie.genres as Genre[]).map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {movie.overview && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">あらすじ</h2>
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>
              )}

              {/* アクションボタン（将来実装） */}
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-amber-400 text-gray-900 rounded-lg hover:bg-amber-500 transition-colors font-semibold">
                  お気に入り
                </button>
                <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
                  視聴済み
                </button>
              </div>
            </div>
          </div>

          {/* 類似映画 */}
          {similarMovies.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">類似映画</h2>
              <MovieList movies={similarMovies} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
