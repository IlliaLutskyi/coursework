import { useEffect, useState } from "react";

export function useVerifyEmail(token: string | null) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function verify() {
      try {
        const res = await fetch(`/api/auth/verify?token=${token}`, { signal });
        const data: { message: string } = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setMessage(data.message);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError")
          setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    verify();
    return () => controller.abort();
  }, [token]);
  return { message, error, loading };
}
