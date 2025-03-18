import Link from "next/link";
import { TFetchedMovies } from "@/app/page";
import { Box, Em, Text } from "@chakra-ui/react";

import OptimizedImage from "../OptimizedImage";
const MovieCarousel = ({
  movies,
}: {
  movies: TFetchedMovies[] | undefined;
}) => {
  return (
    <>
      <Box
        className="flex overflow-x-scroll gap-4 snap-x snap-mandantory "
        id="scroll_container"
      >
        {movies?.map((movie, index) => {
          return (
            <Link
              href={`/review/${
                movie?.media_type ? movie.media_type : "movie"
              }/${movie._id}`}
              key={index}
              className="snap-start w-[200px] flex-shrink-0 "
            >
              <Box>
                <Box>
                  <OptimizedImage
                    path={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    className="w-full m-auto rounded-md"
                  />
                </Box>
                <Box textAlign={"center"}>
                  <Text
                    fontFamily="cursive"
                    className="font-bold hover:text-blue-400"
                  >
                    {movie.title}
                  </Text>
                  <Em fontSize={"0.7rem"}>{movie.release_date}</Em>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>
    </>
  );
};

export default MovieCarousel;
