"use client";
import { useTrailerPopupStore } from "@/stores/useTrailerPopupStore";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import Trailer from "./Trailer";
import CloseButton from "./home/CloseButton";

const TrailerPopup = () => {
  const isOpen = useTrailerPopupStore((store) => store.isOpen);
  const trailerId = useTrailerPopupStore((store) => store.trailer_id);
  const movie_title = useTrailerPopupStore((store) => store.movie_title);
  return (
    <>
      {isOpen ? (
        <>
          <Box className="fixed inset-0 w-screen h-screen bg-black bg-opacity-40 z-50" />
          <Box className="fixed flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] sm:w-[70vw] w-[100vw] h-[80vh] bg-black rounded-md z-50">
            <Box
              display="flex"
              alignItems="baseline"
              justifyContent="center"
              p="1rem"
            >
              <Heading color="white" fontFamily="fantasy" flexGrow="1">
                {movie_title}
              </Heading>
              <CloseButton />
            </Box>
            <Trailer
              trailer_id={trailerId}
              className=" m-[0.5rem] h-full z-50"
            />
          </Box>
        </>
      ) : null}
    </>
  );
};

export default TrailerPopup;
