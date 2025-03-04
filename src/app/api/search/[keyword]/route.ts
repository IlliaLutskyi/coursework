import { Movie } from "@/models/movie";
import { NextResponse } from "next/server";
interface IParams {
  keyword: string;
}
export async function GET(req: Request, { params }: { params: IParams }) {
  const { keyword } = await params;
  try {
    const movies = await Movie.find({
      title: { $regex: `^${keyword}`, $options: "i" },
    })
      .select({ _id: 1, title: 1 })
      .limit(10)
      .lean();
    if (!movies) {
      throw new Error(`No results`);
    }
    return NextResponse.json({ movies, err: "" });
  } catch (err) {
    return NextResponse.json({
      movies: null,
      err: err instanceof Error ? err.message : "Server Error",
    });
  }
}
