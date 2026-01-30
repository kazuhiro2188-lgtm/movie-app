"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl sm:text-8xl font-bold text-white mb-4">500</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
          エラーが発生しました
        </h2>
        <p className="text-gray-400 mb-8">
          申し訳ございません。予期しないエラーが発生しました。
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-amber-400 text-gray-900 rounded-lg hover:bg-amber-500 transition-colors font-semibold"
          >
            再試行
          </button>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
