import { TMovie } from "@/models/movie";
import { useEffect, useState } from "react";

export function useFetchData(id: number, type: string) {
  const [movieData, setMovieData] = useState<TMovie | null>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getMovieDate() {
      try {
        setLoading(true);
        const res = await fetch(`/api/movie/${type}/${id}`, { signal });
        const data: { message: string; movie: TMovie } = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        console.log(data.movie);
        setMovieData(data.movie);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getMovieDate();
    return () => controller.abort();
  }, [id, type]);
  return { movieData, loading };
}
