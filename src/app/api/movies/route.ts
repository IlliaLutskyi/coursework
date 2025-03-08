import connectDb from "@/lib/db";
import { Movie } from "@/models/movie";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  await connectDb();
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");
  const skip = (Number(page) - 1) * 15;
  try {
    const movies = await Movie.find({
      title: { $regex: `^${keyword}`, $options: "i" },
    })
      .select({
        _id: 1,
        title: 1,
        poster_path: 1,
        overview: 1,
        release_date: 1,
      })
      .skip(skip)
      .limit(15)
      .lean();
    if (movies.length === 0) {
      throw new Error("There are no movies that matches your query");
    }

    const amount_of_movies = await Movie.countDocuments({
      title: { $regex: `^${keyword}`, $options: "i" },
    });
    return NextResponse.json({ movies, amount_of_movies, err: "" });
  } catch (err) {
    return NextResponse.json(
      {
        movies: null,
        amount_of_movies: 0,
        err: err instanceof Error ? err.message : "Something went wrong ",
      },
      { status: 404 }
    );
  }
}
