import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ActorContent from "@/components/actor/ActorContent";
import EditButton from "@/components/actor/EditButton";
import EditForm from "@/components/actor/EditForm";
import Info from "@/components/actor/Info";
import KnownForSwiper from "@/components/actor/KnownForSwiper";
import connectDb from "@/lib/db";
import { Actor, TActor } from "@/models/actor";
import { Cast } from "@/models/cast";
import { Movie, TMovie } from "@/models/movie";
import { Box, Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
type params = { params: Promise<{ id: string }> };
const ActorPage = async ({ params }: params) => {
  await connectDb();
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const [actor, movie_ids] = await Promise.all([
    Actor.findById(Number(id))
    .lean() as Promise<TActor> | null,
    Cast.find({ "cast.id": Number(id) })
      .select({ tmdb_movie_id: 1, _id: 0 })
      .lean() as Promise<{ tmdb_movie_id: number }[]> | [],
  ]);
  if (!actor)
    return (
      <Box>
        No information was found about this actor
        <Link href="/" className="hover:underline ml-2 text-blue-300">
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
      {session?.user.isAdmin && (
        <>
          <EditButton actor={actor} />
          <EditForm />
        </>
      )}
    </Box>
  );
};

export default ActorPage;
