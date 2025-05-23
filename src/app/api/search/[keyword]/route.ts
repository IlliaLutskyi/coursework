import connectDb from "@/lib/db";
import { Movie } from "@/models/movie";
import { NextResponse } from "next/server";
type TParams = {
  params: Promise<{ keyword: string }>;
};
export async function GET(req: Request, { params }: TParams) {
  const { keyword } = await params;
  try {
    await connectDb();
    const movies = await Movie.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: keyword,
            path: "title",
            fuzzy: { maxEdits: 2 },
          },
        },
      },
    ])
      .project({ _id: 1, title: 1 })
      .limit(10)
      .exec();
    if (movies.length === 0) {
      return NextResponse.json(
        { movies: null, message: `No results` },
        { status: 404 }
      );
    }
    return NextResponse.json({ movies, err: "" });
  } catch (err) {
    return NextResponse.json(
      {
        movies: null,
        message: err instanceof Error ? err.message : "Server Error",
      },
      { status: 500 }
    );
  }
}
