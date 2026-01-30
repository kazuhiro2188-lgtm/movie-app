// lib/tmdb.js
const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * 画像URLを生成
 */
export function getImageUrl(path, size = "w500") {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * 評価を5段階に変換
 */
export function convertRating(voteAverage) {
  return (voteAverage / 2).toFixed(1);
}

/**
 * 人気映画を取得して配列を返す（サーバー専用）
 */
export async function fetchPopularMovies(lang = "ja-JP", page = 1) {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${lang}&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`TMDB 取得失敗 (${res.status}): ${detail}`);
  }

  const { results } = await res.json();
  return results;
}

// lib/tmdb.js  (差分のみ追記)
export async function fetchMovieDetail(id, lang = "ja-JP") {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${lang}`;
    const res = await fetch(url);
    if (!res.ok) {
      const detail = await res.text();
      throw new Error(`TMDB 詳細取得失敗 (${res.status}): ${detail}`);
    }
    return res.json();
  }

/**
 * 映画を検索
 */
export async function searchMovies(query, lang = "ja-JP", page = 1) {
  const encodedQuery = encodeURIComponent(query);
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodedQuery}&language=${lang}&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`TMDB 検索失敗 (${res.status}): ${detail}`);
  }

  const { results } = await res.json();
  return results;
}

/**
 * 映画の詳細を取得
 */
export async function getMovieDetails(movieId, lang = "ja-JP") {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${lang}`;

  const res = await fetch(url);
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`TMDB 取得失敗 (${res.status}): ${detail}`);
  }

  return res.json();
}

/**
 * 類似映画を取得
 */
export async function getSimilarMovies(movieId, lang = "ja-JP", page = 1) {
  const url = `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=${lang}&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`TMDB 取得失敗 (${res.status}): ${detail}`);
  }

  const { results } = await res.json();
  return results;
}

/**
 * ジャンル一覧を取得
 */
export async function getGenres(lang = "ja-JP") {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${lang}`;

  const res = await fetch(url);
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`TMDB 取得失敗 (${res.status}): ${detail}`);
  }

  const { genres } = await res.json();
  return genres;
}

/**
 * ジャンル別映画を取得
 */
export async function getMoviesByGenre(genreId, lang = "ja-JP", page = 1) {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=${lang}&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`TMDB 取得失敗 (${res.status}): ${detail}`);
  }

  const { results } = await res.json();
  return results;
}