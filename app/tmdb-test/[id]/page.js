import Link from "next/link";
import { fetchMovieDetail } from "@/lib/tmdb";

export async function generateMetadata({ params }) {
  const movie = await fetchMovieDetail(params.id);
  return { title: movie.title };
}

/** 映画詳細ページ（Server Component） */
export default async function MovieDetailPage({ params }) {
  const movie = await fetchMovieDetail(params.id);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link href="/movies" className="text-blue-600 hover:underline">
        &larr; 一覧へ戻る
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-6">{movie.title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 画像は next/image ではなく <img> を使用 */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "/placeholder.png"
          }
          alt={movie.title}
          width={300}
          height={450}
          className="rounded w-auto h-auto"
        />

        <div className="flex-1">
          <p>
            <strong>公開日:</strong>{" "}
            {movie.release_date ? movie.release_date : "不明"}
          </p>
          <p>
            <strong>評価:</strong> {movie.vote_average}
          </p>

          <h2 className="font-semibold mt-4 mb-2">概要</h2>
          <p className="whitespace-pre-line">
            {movie.overview ? movie.overview : "概要が登録されていません。"}
          </p>
        </div>
      </div>
    </main>
  );
}