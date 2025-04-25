import { formData } from "@/components/review/CastMemberForm";
import connectDb from "@/lib/db";
import { Cast } from "@/models/cast";
import { TVshowCast } from "@/models/tvshowcast";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      castMemberId: string;
      movieId: string;
      type: "tv" | "movie";
    }>;
  }
) {
  const formData: formData = await req.json();
  const { castMemberId, movieId, type } = await params;

  try {
    await connectDb();
    if (!castMemberId || !movieId || !type)
      return Response.json(
        { message: "Id, movieId and type are required" },
        { status: 400 }
      );
    if (type === "movie") {
      const cast = await Cast.findOneAndUpdate(
        { tmdb_movie_id: movieId },
        {
          "cast.$[actor].character": formData.character,
        },
        { arrayFilters: [{ "actor.id": castMemberId }] }
      );
      if (!cast)
        return Response.json(
          { message: "Cast was not found" },
          { status: 404 }
        );
    } else {
      const cast = await TVshowCast.findOneAndUpdate(
        { tmdb_movie_id: movieId },
        {
          "cast.$[actor].character": formData.character,
        },
        { arrayFilters: [{ "actor.id": castMemberId }] }
      );
      if (!cast)
        return Response.json(
          { message: "Cast was not found" },
          { status: 404 }
        );
    }
    return Response.json(
      { message: "Edits was applied successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        message: err instanceof Error ? err.message : "Could not save changes",
      },
      { status: 500 }
    );
  }
}
