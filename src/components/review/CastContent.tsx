import { TCast } from "@/models/cast";
import { TTVshowCast } from "@/models/tvshowcast";
import { Box, Text } from "@chakra-ui/react";

import React from "react";
import CastCarousel from "./CastCarousel";
type props = {
  cast:
    | { tmdb_movie_id: number; cast: TCast[] }
    | { tmdb_movie_id: number; cast: TTVshowCast[] }
    | null;
};
const CastContent = ({ cast }: props) => {
  return (
    <Box className="mx-8 py-8">
      <Text className="text-2xl mb-2">Series Cast</Text>
      <CastCarousel cast={cast?.cast}></CastCarousel>
    </Box>
  );
};

export default CastContent;
