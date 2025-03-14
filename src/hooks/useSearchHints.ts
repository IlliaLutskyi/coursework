import { TMovie } from "@/models/movie";
import { useEffect, useState } from "react";

export function useSearchHints(keyword: string) {
  const [movies, setMovies] = useState<
    Pick<TMovie, "_id" | "title">[] | null
  >();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchMovies() {
      try {
        const res = await fetch(`/api/search/${keyword}`, { signal });
        const data: {
          movies: Pick<TMovie, "_id" | "title">[] | null;
          message: string;
        } = await res.json();
        if (!res.ok) {
          return setError(data.message);
        }
        setMovies(data.movies);
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
  }, [keyword]);
  return { movies, setMovies, loading, error };
}
