import { fetchPopularMovies } from "@/lib/tmdb";

export const metadata = { title: "人気映画タイトル一覧" };

export default async function TmdbTestPage() {
  const movies = await fetchPopularMovies(); // サーバー側なので env が読める

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
    {movies.map((m) => (
      <div key={m.id} className="border rounded-lg p-2">
        <img
          src={
            m.poster_path
              ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
              : "/placeholder.png"
          }
          alt={m.title}
          className="rounded mb-2"
        />
        <h2 className="text-sm font-semibold">{m.title}</h2>
        <p className="text-xs text-gray-600">{m.release_date}</p>
      </div>
    ))}
  </div>
  );
}

