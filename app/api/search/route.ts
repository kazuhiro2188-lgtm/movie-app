import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchMovies(query, "ja-JP", 1);
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      { error: "検索に失敗しました" },
      { status: 500 }
    );
  }
}
