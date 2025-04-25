import { Actor } from "@/models/actor";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const name = searchParams.get("name") || "";
  try {
    const actors = await Actor.find({
      name: { $regex: name, $options: "i" },
    })
      .limit(6)
      .lean();
    if (!actors.length) {
      return Response.json({ actors: [], err: "No results" }, { status: 404 });
    }
    return Response.json({ actors, err: "" });
  } catch (err) {
    return Response.json(
      {
        actors: [],
        err: err instanceof Error ? err.message : "Could not fetch actors",
      },
      { status: 500 }
    );
  }
  return Response.json({ actors: [], err: "" });
}
