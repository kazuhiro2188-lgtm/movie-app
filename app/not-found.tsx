import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl sm:text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
          ページが見つかりませんでした
        </h2>
        <p className="text-gray-400 mb-8">
          お探しのページは存在しないか、移動された可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-amber-400 text-gray-900 rounded-lg hover:bg-amber-500 transition-colors font-semibold"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
