import { TActor } from "@/models/actor";
import { useEffect, useState } from "react";

export function useSearchActorByName(name: string) {
  const [actors, setActors] = useState<TActor[]>();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setErr("");
    const controller = new AbortController();
    const signal = controller.signal;
    async function getActors() {
      setLoading(true);

      try {
        const res = await fetch(`/api/actors?name=${name}`, { signal });
        const data: { actors: TActor[]; err: string } = await res.json();
        if (!res.ok) {
          throw new Error(data.err);
        }
        setActors(data.actors);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError")
          setErr(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (name) getActors();

    return () => controller.abort();
  }, [name]);
  return { actors, err, loading, setActors };
}
