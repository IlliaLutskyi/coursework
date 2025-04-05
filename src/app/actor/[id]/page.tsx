import ActorContent from "@/components/actor/ActorContent";
import Info from "@/components/actor/Info";
import KnownForSwiper from "@/components/actor/KnownForSwiper";
import connectDb from "@/lib/db";
import { Actor, TActor } from "@/models/actor";
import { Cast } from "@/models/cast";
import { Movie, TMovie } from "@/models/movie";
import { Box, Heading } from "@chakra-ui/react";

import Link from "next/link";
const ActorPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  await connectDb();
  const id = (await params).id;
  const [actor, movie_ids] = await Promise.all([
    Actor.findById(Number(id)).select({ _id: 0 }).lean() as Promise<
      Omit<TActor, "_id">
    > | null,
    Cast.find({ "cast.id": Number(id) })
      .select({ tmdb_movie_id: 1, _id: 0 })
      .lean() as Promise<{ tmdb_movie_id: number }[]> | [],
  ]);
  if (!actor)
    return (
      <Box>
        No information was found about this actor
        <Link href="/" className="hover:underline text-blue-300">
          Go back to home page
        </Link>
      </Box>
    );
  const movies = await Promise.all(
    movie_ids.map(
      (ids) =>
        Movie.findById(ids.tmdb_movie_id)
          .select({ title: 1, poster_path: 1, _id: 1 })
          .lean() as Promise<Pick<TMovie, "title" | "poster_path" | "_id">>
    )
  );

  return (
    <Box className="flex flex-col gap-2">
      <ActorContent actor={actor} />
      {(actor.also_known_as.length !== 0 ||
        actor.birthday ||
        actor.place_of_birth ||
        actor.deathday) && <Info actor={actor} />}
      {movies && movies.length !== 0 && (
        <Box className="mx-8 my-2">
          <Heading className="text-lg font-bold mb-2">Known For</Heading>
          <KnownForSwiper movies={movies} />
        </Box>
      )}
    </Box>
  );
};

export default ActorPage;
