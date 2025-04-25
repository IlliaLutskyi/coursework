import { Cast } from "@/models/cast";
import { TVshowCast } from "@/models/tvshowcast";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      type: "tv" | "movie";
      movieId: string;
      castMemberId: string;
    }>;
  }
) {
  const { castMemberId, movieId, type } = await params;
  try {
    if (type === "movie") {
      const cast = (await Cast.findOne({ tmdb_movie_id: movieId }))!;
      const newCast = cast.cast.filter(
        (castMember) => castMember.id !== Number(castMemberId)
      );
      cast.cast = [...newCast];
      await cast.save();
    } else if (type === "tv") {
      const cast = (await TVshowCast.findOne({ tmdb_movie_id: movieId }))!;
      const newCast = cast.cast.filter(
        (castMember) => castMember.id !== Number(castMemberId)
      );
      cast.cast = [...newCast];
      await cast.save();
    }
    return Response.json(
      {
        message: "The cast member was deleted successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        message:
          err instanceof Error
            ? err.message
            : "Could not delete the cast member",
      },
      { status: 500 }
    );
  }
}
