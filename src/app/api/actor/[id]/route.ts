import { Actor } from "@/models/actor";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}
export async function GET(req: Request, { params }: { params: IParams }) {
  const { id } = await params;
  try {
    const actor = await Actor.findById(id).lean();
    if (!actor) {
      throw new Error(`No actor with id ${id}`);
    }
    return NextResponse.json({ actor });
  } catch (err) {
    return NextResponse.json({
      err: err instanceof Error ? err.message : "Server Error",
    });
  }
}
