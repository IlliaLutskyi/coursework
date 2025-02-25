import { Box, Container, Heading } from "@chakra-ui/react";
import MovieCarousel from "./MovieCarousel";
import TrailerCarousel from "./TrailerCarousel";
import { TVshow } from "@/models/tvshow";
import { Movie } from "@/models/movie";
import connectDb from "@/lib/db";
export type TFetchedMovies = {
  _id: number;
  title: string;
  release_date: string;
  popularity: number;
  media_type?: string;
  poster_path: string;
};
export type TFetchedLatestMovie = {
  _id: number;
  title: string;
  trailer_id: string;
  backdrop_path: string;
};
const Content = async () => {
  await connectDb();
  const [topMovies, trendingMovies, latestMovies, tvshows]: [
    topMovies: TFetchedMovies[],
    trendingMovies: TFetchedMovies[],
    latestMovies: TFetchedLatestMovie[],
    tvshows: TFetchedMovies[]
  ] = await Promise.all([
    Movie.find({
      vote_average: { $gt: 8 },
    })
      .select({
        _id: 1,
        title: 1,
        release_date: 1,
        poster_path: 1,
      })
      .lean(),
    Movie.find({
      popularity: { $gt: 1000 },
    })
      .select({
        _id: 1,
        title: 1,
        release_date: 1,
        poster_path: 1,
        popularity: 1,
      })
      .lean(),
    Movie.find({
      release_date: { $regex: `^2025` },
      vote_average: { $gt: 8 },
    })
      .select({
        _id: 1,
        trailer_id: 1,
        backdrop_path: 1,
        title: 1,
      })
      .lean(),
    TVshow.find()
      .select({
        _id: 1,
        title: 1,
        release_date: 1,
        media_type: 1,
        popularity: 1,
        poster_path: 1,
      })
      .lean(),
  ]);

  return (
    <Box>
      <Box className="sm:mx-8 mx-4 ">
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
        my="2rem"
      >
        <Heading className="text-3xl mb-[2rem] p-2">Latest Trailers</Heading>
        <TrailerCarousel
          movies={latestMovies}
          // setBackDropPath={setBackDropPath}
        />
      </Box>
      <Box className="sm:mx-8 mx-4 ">
        <Heading className="text-3xl mb-[2rem]">Top-Rated Movies</Heading>
        <MovieCarousel movies={topMovies} />
      </Box>
    </Box>
  );
};

export default Content;
