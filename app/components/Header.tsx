"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          {/* 左側: ロゴ */}
          <div className="flex items-center flex-shrink-0 min-w-0 gap-3 sm:gap-3.5 md:gap-4">
            {/* ロゴアイコン - 目立つアニメーション付き */}
            <Link
              href="/"
              className="flex-shrink-0 relative group animate-pulse hover:animate-none"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12">
                {/* 外側のグローリング */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-xl opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse"></div>
                {/* 背景グラデーション */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-2xl group-hover:shadow-amber-500/50"></div>
                {/* フィルムパーフォレーション */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-0.5 sm:gap-1">
                    <div className="w-0.5 sm:w-1 h-2 sm:h-2.5 bg-gray-900/40 rounded-full"></div>
                    <div className="w-0.5 sm:w-1 h-2 sm:h-2.5 bg-gray-900/40 rounded-full"></div>
                    <div className="w-0.5 sm:w-1 h-2 sm:h-2.5 bg-gray-900/40 rounded-full"></div>
                  </div>
                </div>
                {/* 中央の映画フレーム */}
                <div className="absolute inset-1 sm:inset-1.5 bg-gray-900 rounded-lg border-2 border-amber-400/50 flex items-center justify-center overflow-hidden group-hover:border-amber-400 transition-colors duration-300">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400 group-hover:text-yellow-300 transition-colors duration-300"
                  >
                    <path
                      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3.5"
                      fill="currentColor"
                      className="opacity-90"
                    />
                  </svg>
                </div>
                {/* 光沢効果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-xl pointer-events-none"></div>
                {/* パルスアニメーション */}
                <div className="absolute inset-0 rounded-xl border-2 border-amber-300/50 animate-ping opacity-0 group-hover:opacity-100"></div>
              </div>
            </Link>
            {/* ロゴテキスト - より目立つデザイン */}
            <Link
              href="/"
              className="flex items-baseline gap-2 sm:gap-2.5 group"
            >
              <span className="relative">
                {/* メインテキスト */}
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight relative z-10 block">
                  <span className="hidden sm:inline bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent group-hover:from-amber-300 group-hover:via-yellow-300 group-hover:to-amber-300 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,1)]">
                    CINEMA
                  </span>
                  <span className="sm:hidden bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent group-hover:from-amber-300 group-hover:via-yellow-300 group-hover:to-amber-300 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
                    CINE
                  </span>
                </span>
                {/* 強いグロー効果 */}
                <span className="absolute inset-0 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-amber-400/60 blur-md group-hover:text-amber-300/80 group-hover:blur-lg transition-all duration-300">
                  <span className="hidden sm:inline">CINEMA</span>
                  <span className="sm:hidden">CINE</span>
                </span>
                {/* アウトライン効果 */}
                <span className="absolute inset-0 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-transparent [-webkit-text-stroke:2px_rgba(251,191,36,0.3)] group-hover:[-webkit-text-stroke:2px_rgba(251,191,36,0.5)] transition-all duration-300">
                  <span className="hidden sm:inline">CINEMA</span>
                  <span className="sm:hidden">CINE</span>
                </span>
              </span>
              {/* サブテキスト */}
              <span className="hidden md:inline text-xs sm:text-sm text-amber-400/80 font-semibold tracking-[0.2em] uppercase group-hover:text-amber-300 group-hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.6)] transition-all duration-300">
                REC
              </span>
            </Link>
          </div>

          {/* 中央: 検索バー（デスクトップのみ） */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="映画を検索..."
                className="w-full px-4 pl-10 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-amber-400 text-sm"
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

          {/* 右側: ナビゲーションとメニューボタン */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
            {/* 検索アイコンボタン（モバイルのみ） */}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMenuOpen(false);
              }}
              className="md:hidden p-2 text-gray-300 hover:text-amber-400 transition-colors"
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

            {/* デスクトップナビゲーション */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <Link
                href="/"
                className="text-sm lg:text-base text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
              >
                ホーム
              </Link>
              <Link
                href="/genres"
                className="text-sm lg:text-base text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
              >
                ジャンル
              </Link>
              <Link
                href="/mypage"
                className="text-sm lg:text-base text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
              >
                マイページ
              </Link>
            </div>

            {/* ハンバーガーメニューボタン（モバイルのみ） */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsSearchOpen(false);
              }}
              className="md:hidden p-2 text-gray-300 hover:text-amber-400 transition-colors"
              aria-label="メニュー"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* モバイル検索バー */}
        {isSearchOpen && (
          <div className="md:hidden pb-3 pt-2 border-t border-gray-700">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="映画を検索..."
                className="w-full px-4 pl-10 py-2.5 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-amber-400 text-base"
                autoFocus
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
        )}

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden pb-3 pt-2 border-t border-gray-700">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2.5 text-gray-300 hover:bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 text-base"
              >
                ホーム
              </Link>
              <Link
                href="/genres"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2.5 text-gray-300 hover:bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 text-base"
              >
                ジャンル
              </Link>
              <Link
                href="/mypage"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2.5 text-gray-300 hover:bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 text-base"
              >
                マイページ
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
