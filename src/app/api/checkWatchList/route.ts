import { WatchList } from "@/models/watchList";
import { NextResponse } from "next/server";
import { useId } from "react";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const userId = searchParams.get("userId");
  const movieId = searchParams.get("movieId");
  try {
    if (!userId || !movieId) {
      return NextResponse.json({ message: "" }, { status: 400 });
    }
    const watchList = await WatchList.findOne({ userId }).lean();
    if (!watchList) {
      await WatchList.insertOne({
        userId,
        movies: [],
      });
      return NextResponse.json({ message: "success", isInWatchList: false });
    }
    const movies = watchList?.movies as { movie_id: number; added_at: Date }[];
    const isInList = movies.some((movie) => movie.movie_id === Number(movieId));
    if (isInList) {
      return NextResponse.json({ message: "success", isInWatchList: true });
    } else {
      return NextResponse.json({ message: "success", isInWatchList: false });
    }
  } catch (err) {
    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : "Something went wrong",
        isInWatchList: false,
      },
      { status: 500 }
    );
  }
}
