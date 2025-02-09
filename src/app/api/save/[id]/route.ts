import connectDb from "@/lib/db";
import { addActorsToDb, addCastsToDb, addMoviesToDb } from "@/lib/refetcher";
import { Movie } from "@/models/movie";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // const options = {
    //   method: "GET",
    //   headers: {
    //     accept: "application/json",
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzE1MWUzZTE3MDFjNDk4NzA4YmUxNmU3OWIzMmYzMyIsIm5iZiI6MTcyNjExNjkwNC43MTcsInN1YiI6IjY2ZTI3NDI4OTAxM2ZlODcyMjIzNmUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jCLcIAJpJhdNezM7Ac5diJoF2vEu8C18A5sw9mU7bXo`,
    //   },
    // };
    // const res = await fetch(
    //   `https://api.themoviedb.org/3/movie/1247019
    // /credits?api_key=57151e3e1701c498708be16e79b32f33`,
    //   options
    // );
    // const castData = await res.json();
    // console.log(castData.cast[0].cast_id);
    // const resp = await fetch(
    //   `https://api.themoviedb.org/3/movie/933260
    // /credits?api_key=57151e3e1701c498708be16e79b32f33`,
    //   options
    // );
    // const castDatap = await resp.json();
    // console.log(castDatap.cast[0].cast_id);
    await addCastsToDb();
    return NextResponse.json({ message: "good" });
  } catch (err) {
    return NextResponse.json({
      message: "bad",
      err: err instanceof Error ? err.message : "Error",
    });
  }
}
