import { movies } from "@/components/reviews/Reviews";
import { useEffect, useState } from "react";

export function useFetchMoviesByKeyword(
  keyword: string | null,
  page: string | null
) {
  const [movies, setMovies] = useState<movies | null>();
  const [amountOfMovies, setAmountOfMovies] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchMovies() {
      try {
        const res = await fetch(
          `/api/movies?keyword=${keyword}&page=${page ? page : 1}`,
          {
            signal,
          }
        );
        const data: {
          movies: movies | null;
          amount_of_movies: number;
          message: string;
        } = await res.json();
        if (!res.ok) {
          return setError(data.message);
        }
        setMovies(data.movies);
        setAmountOfMovies(data.amount_of_movies);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError")
          return setError(err.message);
      } finally {
        return setLoading(false);
      }
    }
    if (keyword) {
      fetchMovies();
      return () => {
        controller.abort();
        setMovies(null);
        setError("");
      };
    }
  }, [keyword, page]);
  return { movies, amountOfMovies, loading, error };
}
