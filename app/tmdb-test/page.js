import Link from "next/link";
import { fetchPopularMovies } from "@/lib/tmdb";

export const metadata = { title: "人気映画タイトル一覧" };

export default async function TmdbTestPage() {
  const movies = await fetchPopularMovies(); // サーバー側なので env が読める

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-bold text-center mb-6 sm:mb-8 text-white bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
          TMDB Test - 人気映画
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((m) => (
            <Link
              key={m.id}
              href={`/tmdb-test/${m.id}`}
              className="border border-gray-700 rounded-lg p-2 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <img
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
                    : "/placeholder.png"
                }
                alt={m.title}
                className="rounded mb-2 w-full h-auto"
              />
              <h2 className="text-sm font-semibold text-white">{m.title}</h2>
              <p className="text-xs text-gray-400">{m.release_date}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

