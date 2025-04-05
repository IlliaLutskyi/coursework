"use client";
import { lazy } from "react";
import { useFetchMoviesByKeyword } from "@/hooks/useFetchMoviesByKeyword";
import { TMovie } from "@/models/movie";
import ClipLoader from "react-spinners/ClipLoader";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
const MoviesList = lazy(() => import("@/components/reviews/MoviesList"));
const Pagination = lazy(() => import("@/components/reviews/Pagination"));
export type movies = Pick<
  TMovie,
  "title" | "_id" | "poster_path" | "overview" | "release_date"
>[];
const Reviews = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");

  const { movies, amountOfMovies, error } = useFetchMoviesByKeyword(
    keyword,
    page
  );
  if (!keyword)
    return (
      <Box className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-bold text-xl ">
        There are no movies that matches your query{" "}
        <Link href="/" className="hover:underline text-blue-400">
          home
        </Link>
      </Box>
    );
  if (error)
    return (
      <Box className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-bold text-xl ">
        <span className="text-3xl p-4">404</span> {error}{" "}
        <Link href="/" className="hover:underline text-blue-400">
          home
        </Link>
      </Box>
    );
  return (
    <Suspense
      fallback={
        <ClipLoader
          color="black"
          loading={true}
          className="absolute top-1/2 left-1/2 translate-x-[-50$] translate-y-[-50%]"
          size={20}
        />
      }
    >
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
    </Suspense>
  );
};

export default Reviews;
