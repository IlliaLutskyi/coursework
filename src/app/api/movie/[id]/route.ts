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
      return NextResponse.json(
        { message: `No movie with id ${id}` },
        { status: 404 }
      );
    }
    return NextResponse.json({ movie });
  } catch (err) {
    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : "Server Error",
      },
      { status: 500 }
    );
  }
}
