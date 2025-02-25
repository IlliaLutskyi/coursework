import TrailerPopup from "@/components/TrailerPopup";
import CastContent from "@/components/review/CastContent";
import MovieContent from "@/components/review/MovieContent";
import connectDb from "@/lib/db";
import { Cast, TCast } from "@/models/cast";
import { Genre, TGenre } from "@/models/genre";
import { Movie, TMovie } from "@/models/movie";
import { TTVshow, TVshow } from "@/models/tvshow";
import { TTVshowCast, TVshowCast } from "@/models/tvshowcast";
import { Box } from "@chakra-ui/react";
import React from "react";

type params = { params: { type: string; id: string } };
const Page = async ({ params }: params) => {
  await connectDb();
  const { type, id } = await params;
  if (type === "movie") {
    const [movie, cast] = await Promise.all([
      Movie.findById(Number(id))
        .select({ _id: 0 })
        .lean() as Promise<TMovie | null>,
      Cast.findOne({ tmdb_movie_id: id })
        .select({ _id: 0, "cast._id": 0 })
        .lean() as Promise<{
        tmdb_movie_id: number;
        cast: TCast[];
      } | null>,
    ]);
    const genres: { name: string }[] | null = await Promise.all(
      movie?.genre.map((genre) => {
        return Genre.findById(genre).select({ name: 1, _id: 0 }).lean();
      }) as Iterable<{ name: string } | PromiseLike<{ name: string }>>
    );
    return (
      <Box className="flex flex-col gap-4">
        <MovieContent movie={movie} type={type} genres={genres} />
        <CastContent cast={cast} />
        <TrailerPopup />
      </Box>
    );
  } else if (type === "tv") {
    const [tvshow, tvcast] = await Promise.all([
      TVshow.findById(Number(id))
        .select({ _id: 0 })
        .lean() as Promise<TTVshow | null>,
      TVshowCast.findOne({ tmdb_movie_id: id })
        .select({ _id: 0, "cast._id": 0 })
        .lean() as Promise<{
        tmdb_movie_id: number;
        cast: TTVshowCast[];
      } | null>,
    ]);
    const genres = await Promise.all(
      tvshow?.genre.map((genre) => {
        return Genre.findById(genre)
          .select({ name: 1, _id: 0 })
          .lean() as Promise<{ name: string }[] | null>;
      }) as Iterable<{ name: string } | PromiseLike<{ name: string }>>
    );
    return (
      <Box>
        <MovieContent movie={tvshow} type={type} genres={genres} />
        <CastContent cast={tvcast} />
        <TrailerPopup />
      </Box>
    );
  } else {
    return <Box color="black">Invalid type:{type}</Box>;
  }
};

export default Page;
