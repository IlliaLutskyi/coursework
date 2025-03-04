import { TMovie } from "@/models/movie";
import { useEffect, useState } from "react";

export function useSearchHints(keyword: string) {
  const [movies, setMovies] = useState<
    Pick<TMovie, "_id" | "title">[] | null
  >();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchMovies() {
      try {
        setLoading(true);
        const res = await fetch(`/api/search/${keyword}`, { signal });
        const data: {
          movies: Pick<TMovie, "_id" | "title">[] | null;
          err: string;
        } = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data.err);
        }
        setMovies(data.movies);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    if (keyword) {
      fetchMovies();
      return () => {
        controller.abort();
        setMovies(null);
      };
    }
  }, [keyword]);
  return { movies, setMovies, loading, error };
}
