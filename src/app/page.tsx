import Header from "@/components/home/Header";
import { Box } from "@chakra-ui/react";
import Content from "@/components/home/Content";
import TrailerPopup from "@/components/TrailerPopup";
import connectDb from "@/lib/db";
import { Movie } from "@/models/movie";
import { TVshow } from "@/models/tvshow";
type TMoviesArray = [
  topMovies: TFetchedMovies[],
  trendingMovies: TFetchedMovies[],
  latestMovies: TFetchedLatestMovie[],
  tvshows: TFetchedMovies[]
];
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
export default async function Home() {
  const [topMovies, trendingMovies, latestMovies, tvshows] = await getMovies();
  return (
    <Box display="flex" flexDirection={"column"} gap="2rem">
      <Header trendingMovies={trendingMovies} />
      <Content
        trendingMovies={trendingMovies}
        topMovies={topMovies}
        latestMovies={latestMovies}
        tvshows={tvshows}
      />
      <TrailerPopup />
    </Box>
  );
}
async function getMovies(): Promise<TMoviesArray> {
  await connectDb();
  const [topMovies, trendingMovies, latestMovies, tvshows]: TMoviesArray =
    await Promise.all([
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
        release_date: { $regex: `^2024|2025` },
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
  return [topMovies, trendingMovies, latestMovies, tvshows];
}
