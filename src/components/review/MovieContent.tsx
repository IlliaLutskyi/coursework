import { TMovie } from "@/models/movie";
import { TTVshow } from "@/models/tvshow";
import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import PlayTrailerButton from "./PlayTrailerButton";
type props = {
  movie: TMovie | null | TTVshow;
  type: string;
  genres: { name: string }[];
};
const MovieContent = ({ movie, type, genres }: props) => {
  return (
    <Box
      className="flex  sm:flex-row flex-col gap-8 w-[100%] text-white p-8 "
      bg={`linear-gradient(rgba(0,0,0,0.7) , rgba(0,0,0,0.7) ),url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}") center/cover no-repeat `}
    >
      <Box className="w:[40%] ">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt=""
          width={1000}
          height={1000}
          className="rounded-md w-full"
        />
      </Box>

      <Box className="w:[60%] flex flex-col gap-4 ">
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
        <Box>
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
