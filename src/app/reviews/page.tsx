"use client";

import MoviesList from "@/components/reviews/MoviesList";
import Pagination from "@/components/reviews/Pagination";
import { useFetchMoviesByKeyword } from "@/hooks/useFetchMoviesByKeyword";
import { TMovie } from "@/models/movie";
import { Box } from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
export type movies = Pick<
  TMovie,
  "title" | "_id" | "poster_path" | "overview" | "release_date"
>[];
const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");

  const { movies, amountOfMovies, loading, error } = useFetchMoviesByKeyword(
    keyword,
    page
  );
  if (!keyword)
    return (
      <Box className="text-center">
        There are no movies that matches your query
      </Box>
    );
  if (error) return <Box className="text-center">{error}</Box>;
  return (
    <Box className="flex flex-col gap-4">
      <Box>
        <MoviesList movies={movies} />
      </Box>
      <Box className="flex-grow self-center mb-2">
        <Pagination
          page={page ? Number(page) : 1}
          pageSize={15}
          count={amountOfMovies}
          defaultPage={1}
          onPageChange={(e) =>
            router.push(`/reviews?keyword=${keyword}&page=${e.page}`)
          }
        />
      </Box>
    </Box>
  );
};

export default page;
