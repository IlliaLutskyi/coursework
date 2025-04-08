import { Box, Em, Heading, Text } from "@chakra-ui/react";
import React from "react";
import OptimizedImage from "../OptimizedImage";

import { shortenText } from "@/utils/shortenOverview";
import Link from "next/link";
import { movies } from "./Reviews";
type props = {
  movies: movies | null | undefined;
};
const MoviesList = ({ movies }: props) => {
  return (
    <Box className="flex flex-col gap-4 p-2">
      {movies?.map((movie, index) => {
        return (
          <Link key={index} href={`/review/movie/${movie._id}`}>
            <Box
              className="grid sm:grid-cols-[1fr_6fr] 
            grid-cols-[1fr_3fr] shadow-md  gap-2"
            >
              <Box>
                <OptimizedImage
                  path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
              </Box>
              <Box className="flex flex-col gap-2">
                <Box>
                  <Heading className="font-bold text-xl hover:text-blue-400">
                    {movie.title}
                  </Heading>
                  <Em className="text-sm">{movie.release_date}</Em>
                </Box>
                <Box>
                  <Text>{shortenText(movie.overview, 1 / 1.5)}...</Text>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default MoviesList;
