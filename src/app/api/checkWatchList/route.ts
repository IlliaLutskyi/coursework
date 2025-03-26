import { WatchList } from "@/models/watchList";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const userId = searchParams.get("userId");
  const movieId = searchParams.get("movieId");
  try {
    if (!userId || !movieId) throw new Error("UserId and movieId are required");
    const watchList = await WatchList.findOne({ userId }).lean();
    const movieIds = watchList?.movies as number[];
    if (watchList?.movies.includes(Number(movieId))) {
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
