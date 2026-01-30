import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  rating: number;
  href?: string;
}

export default function MovieCard({
  id,
  title,
  posterPath,
  releaseDate,
  rating,
  href,
}: MovieCardProps) {
  // 評価を星に変換（5段階評価）
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = "★".repeat(fullStars) + (hasHalfStar ? "☆" : "") + "☆".repeat(emptyStars);

  const movieHref = href || `/movies/${id}`;

  return (
    <Link
      href={movieHref}
      className="flex flex-col bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-out no-underline text-inherit active:scale-95 sm:hover:-translate-y-2 sm:hover:shadow-2xl sm:hover:scale-105 h-full border border-gray-700/50 touch-manipulation"
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <Image
          className="w-full h-full object-cover block"
          src={posterPath}
          alt={`${title}のポスター`}
          width={500}
          height={750}
          loading="lazy"
        />
      </div>
      <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 flex flex-col gap-1.5 sm:gap-2 md:gap-3 flex-grow">
        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold m-0 text-white leading-tight sm:leading-snug line-clamp-2 min-h-[2.5em] sm:min-h-[3em]">
          {title}
        </h3>
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-300 m-0">公開日：{releaseDate}</p>
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mt-auto" aria-label={`評価 ${rating} / 5`}>
          <span className="text-xs sm:text-sm md:text-base lg:text-lg text-amber-400 tracking-wider" aria-hidden="true">
            {stars}
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white">{rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
