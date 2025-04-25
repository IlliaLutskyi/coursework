"use client";
import { Box } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
type props = {
  movieId: number | undefined;
  type: string;
};

const WatchListButton = ({ movieId, type }: props) => {
  const { data: session, status } = useSession();
  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // ====================================================
  // Checking for existing movie in the watch list
  // ====================================================
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function checkWatchList() {
      try {
        const res = await fetch(
          `/api/watchlist/checkWatchList?movieId=${movieId}${
            session?.user.id ? "&userId=" + session.user.id : ""
          }`,
          { signal }
        );
        const data: { message: string; isInWatchList: boolean } =
          await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }

        setIsAdded(data.isInWatchList);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError")
          setError(err instanceof Error ? err.message : "Something went wrong");
      }
    }
    checkWatchList();
    return () => controller.abort();
  }, [status, movieId]);

  // ====================================================
  // Showing toast messages
  // ====================================================
  useEffect(() => {
    if (message) {
      toaster.dismiss();
      toaster.create({
        title: message,
        type: "info",
        duration: 3000,
      });
    }
    if (loading) {
      toaster.dismiss();
      toaster.create({
        title: " Working on it...",
        type: "loading",
        duration: 1000,
      });
    }
    if (
      error &&
      error !==
        `Cast to ObjectId failed for value "undefined" (type string) at path "userId" for model "WatchList"`
    ) {
      toaster.dismiss();
      toaster.create({
        title: error,
        type: "error",
        duration: 3000,
      });
    }
  }, [message, loading, error]);
  // ====================================================
  // Handle click event
  // ====================================================
  async function handleWatchListClick() {
    setMessage("");
    setError("");
    if (status === "loading") return;
    if (!session?.user?.id) {
      return router.push(`/login?movieId=${movieId}&type=${type}`);
    }
    try {
      setLoading(true);
      const res = await fetch(
        `/api/watchlist/toggleWatchList?userId=${session.user.id}&movieId=${movieId}&type=${type}`,
        { method: "POST" }
      );
      const data: { message: string; added: boolean } = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      if (data.added) {
        setIsAdded(true);
      } else {
        setIsAdded(false);
      }
      setMessage(data.message);
    } catch (err) {
      setIsAdded(false);
      setError(
        err instanceof Error
          ? err.message
          : "Could not add the movie to the watch list"
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Box
        className="p-2 bg-blue-500 rounded-full hover:scale-105"
        onClick={handleWatchListClick}
      >
        {isAdded ? (
          <FaBookmark className="cursor-pointer" />
        ) : (
          <FaRegBookmark className="cursor-pointer" />
        )}
        <Toaster />
      </Box>
    </>
  );
};
export default WatchListButton;
