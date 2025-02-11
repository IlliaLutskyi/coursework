import connectDb from "@/lib/db";
import { addActorsToDb, addCastsToDb, addMoviesToDb } from "@/lib/refetcher";
import { Movie } from "@/models/movie";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await addMoviesToDb();
    return NextResponse.json({ message: "good" });
  } catch (err) {
    return NextResponse.json({
      message: "bad",
      err: err instanceof Error ? err.message : "Error",
    });
  }
}
