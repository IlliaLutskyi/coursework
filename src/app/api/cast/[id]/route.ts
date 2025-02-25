import { Cast } from "@/models/cast";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}
export async function GET(req: Request, { params }: { params: IParams }) {
  const { id } = await params;
  try {
    const cast = await Cast.findById(id).lean();
    if (!cast) {
      throw new Error(`No cast with id ${id}`);
    }
    return NextResponse.json({ cast });
  } catch (err) {
    return NextResponse.json({
      err: err instanceof Error ? err.message : "Server Error",
    });
  }
}
