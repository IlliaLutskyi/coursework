import { TMovie } from "@/models/movie";
import { TTVshow } from "@/models/tvshow";
import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import PlayTrailerButton from "./PlayTrailerButton";
import OptimizedImage from "../OptimizedImage";
import WatchListButton from "./WatchListButton";
type props = {
  movie: TMovie | null | TTVshow;
  type: string;
  genres: { name: string }[];
};
const MovieContent = ({ movie, type, genres }: props) => {
  const backdropPath =
    movie?.backdrop_path.includes(".jpg") ||
    movie?.backdrop_path.includes(".png") ||
    movie?.backdrop_path.includes(".webp") ||
    movie?.backdrop_path.includes(".jpeg")
      ? `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`
      : `https://pink-genetic-monkey-993.mypinata.cloud/ipfs/${movie?.backdrop_path}`;
  const posterPath =
    movie?.poster_path.includes(".jpg") ||
    movie?.poster_path.includes(".png") ||
    movie?.poster_path.includes(".webp") ||
    movie?.poster_path.includes(".jpeg")
      ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
      : `https://pink-genetic-monkey-993.mypinata.cloud/ipfs/${movie?.poster_path}`;

  return (
    <Box
      className="grid sm:grid-cols-[1fr,4fr] gap-8 w-[100%] text-white p-8 "
      bg={`linear-gradient(rgba(0,0,0,0.7) , rgba(0,0,0,0.7) ),url(${backdropPath}) center/cover no-repeat `}
    >
      <Box>
        <OptimizedImage
          path={posterPath}
          className="sm:w-full w-1/2 m-auto rounded-md"
        />
      </Box>

      <Box className="flex flex-col gap-4 ">
        <Box>
          <Heading className="font-bold text-3xl">
            {movie?.title}
            <span className="opacity-60 ml-1">
              {`(${movie?.release_date.split("-")[0]})`}
            </span>
          </Heading>
          <Text className="mt-2 text-lg">
            <span className="border-white p-1 border-x-[1px] border-y-[1px] mr-4 opacity-60 rounded-sm">
              {type}
            </span>
            {genres?.map((genre, index) => {
              if (!genre?.name) {
                return;
              }
              return index !== genres.length - 1
                ? `${genre?.name},`
                : `${genre?.name}`;
            })}
          </Text>
        </Box>
        <Box className="flex gap-6 items-center ">
          <WatchListButton movieId={movie?._id} type={type} />
          <PlayTrailerButton
            title={"Play Trailer"}
            className="bg-transparent hover:opacity-50"
            movie_title={movie?.title as string}
            trailer_id={movie?.trailer_id as string}
          />
        </Box>
        <Box>
          <Heading className="font-bold text-2xl mb-1">Overview</Heading>
          <Text className="w-[80%]">{movie?.overview}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieContent;
