import connectDb from "@/lib/db";
import {
  addActorsToDb,
  addCastsToDb,
  addGenresToDb,
  addMoviesToDb,
  addTVshowToDb,
  deleteTvshowCastsFromDb,
} from "@/lib/refetcher";
import { Movie, TMovie } from "@/models/movie";
import { User } from "@/models/user";
import { WatchList } from "@/models/watchList";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDb();

    return NextResponse.json({ message: "good" });
  } catch (err) {
    return NextResponse.json({
      message: "bad",
      err: err instanceof Error ? err.message : "Error",
    });
  }
}
