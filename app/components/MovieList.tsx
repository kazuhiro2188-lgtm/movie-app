import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  rating: number;
}

interface MovieListProps {
  movies?: Movie[];
}

export default function MovieList({ movies = [] }: MovieListProps) {
  // サンプルデータ（moviesが空の場合）
  const defaultMovies: Movie[] = movies.length > 0 ? movies : [
    {
      id: 1,
      title: "映画タイトル1",
      posterPath: "https://picsum.photos/500/750?random=1",
      releaseDate: "2026-01-30",
      rating: 4.0,
    },
    {
      id: 2,
      title: "映画タイトル2",
      posterPath: "https://picsum.photos/500/750?random=2",
      releaseDate: "2026-02-15",
      rating: 4.5,
    },
    {
      id: 3,
      title: "映画タイトル3",
      posterPath: "https://picsum.photos/500/750?random=3",
      releaseDate: "2026-03-10",
      rating: 3.5,
    },
    {
      id: 4,
      title: "映画タイトル4",
      posterPath: "https://picsum.photos/500/750?random=4",
      releaseDate: "2026-04-20",
      rating: 4.8,
    },
    {
      id: 5,
      title: "映画タイトル5",
      posterPath: "https://picsum.photos/500/750?random=5",
      releaseDate: "2026-05-05",
      rating: 3.8,
    },
    {
      id: 6,
      title: "映画タイトル6",
      posterPath: "https://picsum.photos/500/750?random=6",
      releaseDate: "2026-06-12",
      rating: 4.2,
    },
    {
      id: 7,
      title: "映画タイトル7",
      posterPath: "https://picsum.photos/500/750?random=7",
      releaseDate: "2026-07-18",
      rating: 4.6,
    },
    {
      id: 8,
      title: "映画タイトル8",
      posterPath: "https://picsum.photos/500/750?random=8",
      releaseDate: "2026-08-25",
      rating: 4.3,
    },
  ];

  const moviesToDisplay = movies.length > 0 ? movies : defaultMovies;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 max-w-[1400px] mx-auto">
      {moviesToDisplay.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.posterPath}
          releaseDate={movie.releaseDate}
          rating={movie.rating}
        />
      ))}
    </div>
  );
}
