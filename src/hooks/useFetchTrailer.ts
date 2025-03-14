import { TTrailer } from "@/models/trailer";
import { useEffect, useState } from "react";

export function useFetchTrailer(trailer_id: string) {
  const [trailer, setTrailer] = useState<TTrailer | undefined>();
  const [error, setError] = useState<string | undefined>("");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchTrailer() {
      try {
        const res = await fetch(`/api/trailer/${trailer_id}`, {
          signal: signal,
        });
        const data: { trailer: TTrailer; message?: string } = await res.json();
        if (!res.ok) {
          return setError(data?.message);
        }
        setTrailer(data.trailer);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError")
          return setError(err.message);
      }
    }
    fetchTrailer();
    return () => {
      controller.abort();
      setError("");
    };
  }, [trailer_id]);
  return { trailer, error };
}
