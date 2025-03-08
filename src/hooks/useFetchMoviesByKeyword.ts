import { TMovie } from "@/models/movie";
import { useEffect, useState } from "react";
import { movies } from "@/app/reviews/page";

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
          err: string;
        } = await res.json();
        if (!res.ok) {
          throw new Error(data.err);
        }
        setMovies(data.movies);
        setAmountOfMovies(data.amount_of_movies);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError")
          setError(err.message);
      } finally {
        setLoading(false);
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
