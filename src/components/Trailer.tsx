"use client";
import { useFetchTrailer } from "@/hooks/useFetchTrailer";
import { Box } from "@chakra-ui/react";
type props = {
  trailer_id: string;
  className: string;
};
const Trailer = ({ trailer_id, className }: props) => {
  const { trailer, error } = useFetchTrailer(trailer_id);
  if (error) return <Box className="text-white">{error}</Box>;
  return (
    <>
      {trailer && (
        <iframe
          src={`https://www.youtube.com/embed/${trailer.trailer_key}`}
          className={className}
        />
      )}
    </>
  );
};

export default Trailer;
