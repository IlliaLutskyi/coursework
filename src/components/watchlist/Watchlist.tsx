"use client";
import { TMovie } from "@/models/movie";
import { Box, Em, Heading, NativeSelect, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OptimizedImage from "../OptimizedImage";
import Link from "next/link";
import { TTVshow } from "@/models/tvshow";
import { shortenText } from "@/utils/shortenOverview";
type props = {
  watchlist: watchlist;
};
type watchlist = {
  movies: {
    movie: TMovie | TTVshow;
    added_at: Date;
    refType: "Movie" | "TVshow";
  }[];
};
type filterType = "Date added" | "Popularity" | "Release date";
const filterOptions = ["Date added", "Popularity", "Release date"];
const Watchlist = ({ watchlist }: props) => {
  const [filter, setFilter] = useState<filterType>("Date added");
  const [filteredWatchlist, setFilteredWatchlist] = useState(watchlist.movies);

  useEffect(() => {
    if (filter === "Date added") {
      setFilteredWatchlist((prev) => {
        const sortedPrev = [...prev];

        sortedPrev.sort((prev, next) => {
          const prevDate = new Date(prev.added_at).getTime();
          const nextDate = new Date(next.added_at).getTime();

          return nextDate - prevDate;
        });
        return sortedPrev;
      });
    }
    if (filter === "Popularity") {
      setFilteredWatchlist((prev) => {
        const sortedPrev = [...prev];
        sortedPrev.sort((prev, next) => {
          const prevPopularity = prev.movie.popularity;
          const nextPopularity = next.movie.popularity;
          return nextPopularity - prevPopularity;
        });
        return sortedPrev;
      });
    }
    if (filter === "Release date") {
      setFilteredWatchlist((prev) => {
        const sortedPrev = [...prev];
        sortedPrev.sort((prev, next) => {
          const prevReleaseDate = new Date(prev.movie.release_date).getTime();
          const nextReleaseDate = new Date(next.movie.release_date).getTime();
          return nextReleaseDate - prevReleaseDate;
        });
        return sortedPrev;
      });
    }
  }, [filter, watchlist]);
  return (
    <Box className="mx-4">
      <Box className="flex gap-2 justify-end items-center">
        <Heading className="text-sm font-bold">Select filter:</Heading>
        <NativeSelect.Root className="w-[150px] bg-black text-white text-sm rounded-md ml-2">
          <NativeSelect.Field
            value={filter}
            onChange={(e) => setFilter(e.currentTarget.value as filterType)}
          >
            {filterOptions.map((filter, index) => {
              return (
                <option
                  value={filter}
                  key={index + 1}
                  className="p-2 text-white text-xs"
                >
                  {filter}
                </option>
              );
            })}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Box>
      <Box className="flex flex-col gap-4 p-4">
        {filteredWatchlist?.map((movies, index) => {
          const posterPath =
            movies.movie.poster_path.includes(".jpg") ||
            movies.movie.poster_path.includes(".png") ||
            movies.movie.poster_path.includes(".webp") ||
            movies.movie.poster_path.includes(".jpeg")
              ? `https://image.tmdb.org/t/p/w300${movies.movie.poster_path}`
              : `https://pink-genetic-monkey-993.mypinata.cloud/ipfs/${movies.movie.poster_path}`;
          return (
            <Link
              key={index}
              href={`/review/${"media_type" in movies.movie ? "tv" : "movie"}/${
                movies.movie._id
              }`}
            >
              <Box className="grid grid-cols-[1fr_11fr] hover:shadow-2xl duration-500 shadow-md gap-4">
                <Box>
                  <OptimizedImage path={posterPath} />
                </Box>
                <Box className="flex flex-col gap-2">
                  <Box>
                    <Heading className="font-bold text-xl hover:text-blue-400">
                      {movies.movie.title}
                    </Heading>
                    <Em className="text-sm">{movies.movie.release_date}</Em>
                  </Box>
                  <Box>
                    <Text>
                      {shortenText(movies.movie.overview, 1 / 1.5)}...
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default Watchlist;
