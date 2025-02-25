import { Trailer } from "@/models/trailer";
import { NextResponse } from "next/server";
type params = {
  params: { id: string };
};
export async function GET(req: Request, { params }: params) {
  const { id } = await params;
  try {
    const trailer = await Trailer.findById(id).lean();
    if (!trailer) {
      throw new Error(`No trailer with id ${id}`);
    }
    return NextResponse.json({ trailer });
  } catch (err) {
    return NextResponse.json({
      err: err instanceof Error ? err.message : "Server Error",
    });
  }
}
