"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* 左側: ロゴ */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-serif italic font-bold bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent hover:from-yellow-300 hover:via-amber-200 hover:to-yellow-400 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
            >
              Movie Recommendation App
            </Link>
          </div>

          {/* 中央: 検索バー */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="映画を検索..."
                className="w-full px-4 pl-10 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-amber-400 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="検索"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* 右側: ナビゲーション */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            <Link
              href="/"
              className="text-sm sm:text-base hidden sm:inline text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
            >
              ホーム
            </Link>
            <Link
              href="/genres"
              className="text-sm sm:text-base hidden sm:inline text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
            >
              ジャンル
            </Link>
            <Link
              href="/mypage"
              className="text-sm sm:text-base text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
            >
              マイページ
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
