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
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // const end = 1000;
    // for (let i = 890; i <= end; i++) {
    //   await addMoviesToDb(i);
    //   console.log(i);
    // }
    // await deleteTvshowCastsFromDb();
    // for (let i = 1; i <= 2; i++) {
    //   console.log(i);
    // await addActorsToDb("tv");
    // }
    // await addActorsToDb();
    // await addTVshowToDb(1);
    // const options = {
    //   method: "GET",
    //   headers: {
    //     accept: "application/json",
    //     Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    //   },
    // };
    // const res = await fetch(
    //   `https://api.themoviedb.org/3/movie/1126166/videos?api_key=${process.env.TMDB_API_KEY}`,
    //   options
    // );
    // const trailerData = await res.json();
    // console.log(trailerData);
    return NextResponse.json({ message: "good" });
  } catch (err) {
    return NextResponse.json({
      message: "bad",
      err: err instanceof Error ? err.message : "Error",
    });
  }
}
