import { Box, Heading } from "@chakra-ui/react";
import MovieCarousel from "./MovieCarousel";
import TrailerCarousel from "./TrailerCarousel";

import { TFetchedLatestMovie, TFetchedMovies } from "@/app/page";
import { getRandomPoster } from "@/utils/getRandomPoster";
type props = {
  trendingMovies: TFetchedMovies[];
  tvshows: TFetchedMovies[];
  latestMovies: TFetchedLatestMovie[];
  topMovies: TFetchedMovies[];
};
const Content = async ({
  trendingMovies,
  topMovies,
  tvshows,
  latestMovies,
}: props) => {
  return (
    <Box>
      <Box className="sm:mx-8 mt-4 mx-4">
        <Heading className="text-3xl mb-[2rem]">Trending</Heading>
        <MovieCarousel
          movies={[...trendingMovies, ...tvshows].sort(
            (prev, next) => prev.popularity - next.popularity
          )}
        />
      </Box>
      <Box
        background={`linear-gradient(rgba(174,233,238,0.7) ,rgba(16,95,190,0.5) ),url("https://image.tmdb.org/t/p/original${getRandomPoster(
          tvshows
        )}") center/cover no-repeat`}
        color="white"
        mb="2rem"
      >
        <Heading className="text-3xl mb-[2rem] p-2">Latest Trailers</Heading>
        <TrailerCarousel
          movies={latestMovies}
          // setBackDropPath={setBackDropPath}
        />
      </Box>
      <Box className="sm:mx-8 mx-4 mb-2">
        <Heading className="text-3xl mb-[2rem]">Top-Rated Movies</Heading>
        <MovieCarousel movies={topMovies} />
      </Box>
    </Box>
  );
};

export default Content;
