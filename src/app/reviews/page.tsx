"use client";

import MoviesList from "@/components/reviews/MoviesList";
import Pagination from "@/components/reviews/Pagination";
import { useFetchMoviesByKeyword } from "@/hooks/useFetchMoviesByKeyword";
import { TMovie } from "@/models/movie";
import ClipLoader from "react-spinners/ClipLoader";
import { Box, Spinner } from "@chakra-ui/react";

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
  if (!keyword) return <Box>There are no movies that matches your query</Box>;
  if (error) return <Box>{error}</Box>;
  if (loading) return <ClipLoader color="black" loading={loading} size={20} />;
  return (
    <Box className="flex flex-col gap-4">
      <Box>
        <MoviesList movies={movies} />
      </Box>
      <Box className="flex-grow self-center mb-2">
        {amountOfMovies !== 0 && (
          <Pagination
            page={page ? Number(page) : 1}
            pageSize={15}
            count={amountOfMovies}
            defaultPage={1}
            onPageChange={(e) =>
              router.push(`/reviews?keyword=${keyword}&page=${e.page}`)
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default page;
