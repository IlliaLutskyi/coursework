"use client";
import { useTrailerPopupStore } from "@/stores/useTrailerPopupStore";
import { Button } from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
type props = {
  title: string;
  className: string;
  trailer_id: string;
  movie_title: string;
};

const PlayTrailerButton = ({
  title,
  className,
  trailer_id,
  movie_title,
}: props) => {
  const open = useTrailerPopupStore((store) => store.toggle);
  const setTrailerId = useTrailerPopupStore((store) => store.setTrailerId);
  const setMovieTitle = useTrailerPopupStore((store) => store.setMovieTitle);
  return (
    <Button
      className={className}
      onClick={() => {
        setTrailerId(trailer_id);
        setMovieTitle(movie_title);
        open();
      }}
    >
      <FaPlay />
      {` ${title}`}
    </Button>
  );
};

export default PlayTrailerButton;
