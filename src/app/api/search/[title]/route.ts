import { Movie } from "@/models/movie";
import { NextResponse, NextRequest } from "next/server";
interface IParams {
  title: string;
}
export async function GET(req: Request, { params }: { params: IParams }) {
  const { title } = await params;
  try {
    const movies = await Movie.find({
      title: { $regex: `^${title}`, $options: "i" },
    })
      .limit(5)
      .lean();
    if (!movies) {
      throw new Error(`No movie with title ${title}`);
    }
    return NextResponse.json({ movies });
  } catch (err) {
    return NextResponse.json({
      err: err instanceof Error ? err.message : "Server Error",
    });
  }
}
