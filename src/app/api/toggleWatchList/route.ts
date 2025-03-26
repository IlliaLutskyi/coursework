import { TMovie } from "@/models/movie";
import { TWatchList, WatchList } from "@/models/watchList";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const userId = searchParams.get("userId");
  const movieId = searchParams.get("movieId");
  try {
    if (!movieId || !userId)
      return NextResponse.json(
        { message: "MovieId and userId are required", added: false },
        { status: 400 }
      );
    const watchList: TWatchList | null = await WatchList.findOne({
      userId,
    }).lean();
    if (!watchList) {
      return NextResponse.json(
        { message: "Watch list does not exist", added: false },
        { status: 404 }
      );
    }
    const movieIds = watchList?.movies as number[];

    if (movieIds.includes(Number(movieId))) {
      const filteredIds = movieIds.filter((id) => id !== Number(movieId));

      await WatchList.findByIdAndUpdate(watchList._id, {
        movies: [...filteredIds],
      });
      return NextResponse.json(
        { message: "Movie was removed from the watch list", added: false },
        { status: 200 }
      );
    } else {
      const filteredIds = [...movieIds, movieId];

      await WatchList.findByIdAndUpdate(watchList._id, {
        movies: [...filteredIds],
      });
      return NextResponse.json(
        { message: "Movie was added to the watch list", added: true },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message:
          err instanceof Error
            ? err.message
            : "Could not add or remove movie to or from the watch list",
        added: false,
      },
      { status: 500 }
    );
  }
}
