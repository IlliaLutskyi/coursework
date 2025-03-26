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
};

const WatchListButton = ({ movieId }: props) => {
  const { data: session } = useSession();
  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setError("");
    setMessage("");
    async function checkWatchList() {
      try {
        const res = await fetch(
          `/api/checkWatchList?movieId=${movieId}&userId=${session?.user.id}`
        );
        const data: { message: string; isInWatchList: boolean } =
          await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }

        setIsAdded(data.isInWatchList);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    }
    checkWatchList();
    const watchListButton = document.getElementById("watchListButton");
    watchListButton?.addEventListener("click", handleWatchListClick);
    if (loading) {
      toaster.create({
        title: "Working on it ...",
        type: "info",
        duration: 1000,
      });
    }
    if (message) {
      toaster.create({
        title: message,
        type: "info",
        duration: 3000,
      });
    }
    if (error) {
      toaster.create({
        title: error,
        type: "error",
        duration: 3000,
      });
    }
    return () =>
      watchListButton?.removeEventListener("click", handleWatchListClick);
  });
  async function handleWatchListClick() {
    if (!session?.user?.id) {
      return router.push("/login");
    }
    try {
      setLoading(true);
      const res = await fetch(
        `/api/toggleWatchList?userId=${session.user.id}&movieId=${movieId}`,
        { method: "POST" }
      );
      const data: { message: string; added: boolean } = await res.json();
      console.log(data.added);
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
      <Box className="p-2 bg-blue-500 rounded-full hover:scale-105">
        {isAdded ? (
          <FaBookmark id="watchListButton" className="cursor-pointer" />
        ) : (
          <FaRegBookmark id="watchListButton" className="cursor-pointer" />
        )}
        <Toaster />
      </Box>
    </>
  );
};

export default WatchListButton;
