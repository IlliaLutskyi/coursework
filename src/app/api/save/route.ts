import connectDb from "@/lib/db";
import {
  addActorsToDb,
  addCastsToDb,
  addGenresToDb,
  addMoviesToDb,
  addTVshowToDb,
  deleteTvshowCastsFromDb,
} from "@/lib/refetcher";
import { Movie } from "@/models/movie";
import { User } from "@/models/user";
import { WatchList } from "@/models/watchList";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // const watchList = await WatchList.findById("67e00f820e3d32cdc5565006")
    //   .populate("userId")
    //   .lean();

    // console.log(watchList);
    return NextResponse.json({ message: "good" });
  } catch (err) {
    return NextResponse.json({
      message: "bad",
      err: err instanceof Error ? err.message : "Error",
    });
  }
}
