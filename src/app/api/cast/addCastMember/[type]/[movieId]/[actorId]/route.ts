import { formData } from "@/components/review/CreateCastMemberForm";
import { Actor } from "@/models/actor";
import { Cast, TCast } from "@/models/cast";
import { TTVshowCast, TVshowCast } from "@/models/tvshowcast";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ movieId: string; actorId: string; type: "tv" | "movie" }>;
  }
) {
  const { movieId, actorId, type } = await params;
  const { character }: formData = await req.json();
  try {
    const actor = await Actor.findById(actorId).lean();
    if (!actor)
      return Response.json({ message: "Actor was not found" }, { status: 404 });
    if (type === "movie") {
      const cast = (await Cast.findOne({ tmdb_movie_id: movieId }))!;
      const order =
        cast.cast.sort((a, b) => a.order - b.order)[cast.cast.length - 1]
          .order + 1;
      const castMember: TCast = {
        character: character,
        profile_path: actor.profile_path,
        id: actor._id,
        name: actor.name,
        popularity: actor.popularity,
        order,
      };
      cast.cast = [...cast.cast, castMember];
      await cast.save();
    } else if (type === "tv") {
      const cast = (await TVshowCast.findOne({ tmdb_movie_id: movieId }))!;
      const order =
        cast.cast.sort((a, b) => a.order - b.order)[cast.cast.length - 1]
          .order + 1;
      const castMember: TTVshowCast = {
        character: character,
        profile_path: actor.profile_path,
        id: actor._id,
        name: actor.name,
        popularity: actor.popularity,
        order,
      };
      cast.cast = [...cast.cast, castMember];
      await cast.save();
    }
    return Response.json(
      { message: "The actor was added successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      {
        message: err instanceof Error ? err.message : "Could not add the actor",
      },
      { status: 500 }
    );
  }
}
