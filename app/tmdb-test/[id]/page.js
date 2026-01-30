import Link from "next/link";
import { fetchMovieDetail } from "@/lib/tmdb";

/**
 * @param {{ params: Promise<{ id: string }> }} props
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const movie = await fetchMovieDetail(id);
  return { title: movie.title };
}

/**
 * 映画詳細ページ（Server Component）
 * @param {{ params: Promise<{ id: string }> }} props
 */
export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const movie = await fetchMovieDetail(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="max-w-7xl mx-auto p-6">
        <Link 
          href="/tmdb-test" 
          className="text-amber-400 hover:text-amber-300 transition-colors inline-block mb-6"
        >
          &larr; 一覧へ戻る
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-bold mb-6 text-white bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
          {movie.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* 画像は next/image ではなく <img> を使用 */}
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : `https://picsum.photos/300/450?random=${movie.id}`
            }
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-xl shadow-2xl w-auto h-auto"
          />

          <div className="flex-1 text-white">
            <div className="mb-4">
              <p className="text-gray-300 mb-2">
                <strong className="text-white">公開日:</strong>{" "}
                {movie.release_date ? movie.release_date : "不明"}
              </p>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">評価:</strong>{" "}
                <span className="text-amber-400 font-semibold">
                  {movie.vote_average ? (movie.vote_average / 2).toFixed(1) : "N/A"} / 5.0
                </span>
              </p>
            </div>

            <h2 className="font-semibold text-xl mb-2 text-white">概要</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {movie.overview ? movie.overview : "概要が登録されていません。"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
