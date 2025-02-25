import { Movie } from "@/models/movie";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}
export async function GET(req: Request, { params }: { params: IParams }) {
  const { id } = await params;
  try {
    const movie = await Movie.findById(id).lean();
    if (!movie) {
      throw new Error(`No movie with id ${id}`);
    }
    return NextResponse.json({ movie });
  } catch (err) {
    return NextResponse.json({
      err: err instanceof Error ? err.message : "Server Error",
    });
  }
}
