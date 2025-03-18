import { Box, Container, Heading } from "@chakra-ui/react";
import MovieCarousel from "./MovieCarousel";
import TrailerCarousel from "./TrailerCarousel";
import { TVshow } from "@/models/tvshow";
import { Movie } from "@/models/movie";
import connectDb from "@/lib/db";
import { TFetchedLatestMovie, TFetchedMovies } from "@/app/page";
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
      <Box className="sm:mx-8 mt-4">
        <Heading className="text-3xl mb-[2rem]">Trending</Heading>
        <MovieCarousel
          movies={[...trendingMovies, ...tvshows].sort(
            (prev, next) => prev.popularity - next.popularity
          )}
        />
      </Box>
      <Box
        background={`linear-gradient(rgba(174,233,238,0.5) , rgba(16,95,190,0.5) ),url("https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg") center/cover no-repeat`}
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
