"use client";
import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useEditForm } from "@/stores/useEditForm";
import { TMovie } from "@/models/movie";
import { TTVshow } from "@/models/tvshow";
import { TTVshowCast } from "@/models/tvshowcast";
import { TCast } from "@/models/cast";
type props = {
  movie: TMovie | TTVshow | null;
  cast: {
    tmdb_movie_id: number;
    cast: (TCast | TTVshowCast)[];
  } | null;
  type: "tv" | "movie";
};
const EditButton = ({ movie, cast, type }: props) => {
  const toggle = useEditForm((store) => store.toggle);
  const setMovie = useEditForm((store) => store.setMovie);
  const setType = useEditForm((store) => store.setType);
  const setCast = useEditForm((store) => store.setCast);
  return (
    <Box className="w-full flex justify-end">
      <Button
        onClick={() => {
          setMovie(movie!);
          setCast(cast!);
          setType(type);
          toggle();
        }}
        className=" bg-blue-600 text-white px-4 py-2 font-mono rounded-sm mx-4 my-2 hover:scale-105 "
      >
        Edit page
      </Button>
    </Box>
  );
};

export default EditButton;
