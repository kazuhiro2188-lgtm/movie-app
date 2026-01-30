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
      className="flex flex-col bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-out no-underline text-inherit hover:-translate-y-4 hover:shadow-2xl hover:scale-105 h-full border border-gray-700/50"
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
      <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-2 sm:gap-3 flex-grow">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold m-0 text-white leading-tight sm:leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 m-0">公開日：{releaseDate}</p>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-auto" aria-label={`評価 ${rating} / 5`}>
          <span className="text-sm sm:text-base md:text-lg text-amber-400 tracking-wider" aria-hidden="true">
            {stars}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-white">{rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
