import { Trailer } from "@/models/trailer";
import { NextResponse } from "next/server";
type params = {
  params: Promise<{ id: string }>;
};
export async function GET(req: Request, { params }: params) {
  const { id } = await params;
  try {
    const trailer = await Trailer.findById(id).lean();
    if (!trailer) {
      return NextResponse.json(
        { message: `No trailer with id ${id}` },
        { status: 404 }
      );
    }
    return NextResponse.json({ trailer });
  } catch (err) {
    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : "Server Error",
      },
      { status: 500 }
    );
  }
}
