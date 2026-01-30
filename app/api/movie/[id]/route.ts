import { NextRequest, NextResponse } from "next/server";
import { getMovieDetails } from "@/lib/tmdb";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const movieId = parseInt(params.id);

  if (isNaN(movieId)) {
    return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
  }

  try {
    const movie = await getMovieDetails(movieId, "ja-JP");
    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { error: "映画データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
