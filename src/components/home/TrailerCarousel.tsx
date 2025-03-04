"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Scrollbar } from "swiper/modules";
import { FaPlay } from "react-icons/fa";
import { Box, Skeleton, Text } from "@chakra-ui/react";
import { TFetchedLatestMovie } from "./Content";
import { useTrailerPopupStore } from "@/stores/useTrailerPopupStore";
const TrailerCarousel = ({
  movies,
}: //   setBackDropPath,
{
  movies: TFetchedLatestMovie[] | undefined;
  //   setBackDropPath: Dispatch<SetStateAction<string>>;
}) => {
  const open = useTrailerPopupStore((store) => store.toggle);
  const setTrailerId = useTrailerPopupStore((store) => store.setTrailerId);
  const setMovieTitle = useTrailerPopupStore((store) => store.setMovieTitle);
  return (
    <Swiper
      className="mx-4 py-4"
      modules={[Mousewheel]}
      slidesPerView={2}
      spaceBetween={10}
      mousewheel={{ forceToAxis: true }}
      grabCursor={true}
      simulateTouch={true}
      touchRatio={2}
      direction="horizontal"
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 4, spaceBetween: 40 },
        1024: { slidesPerView: 5, spaceBetween: 60 },
      }}
    >
      {movies?.map((movie) => {
        return (
          <SwiperSlide
            key={movie._id}
            onClick={() => {
              setTrailerId(movie.trailer_id);
              setMovieTitle(movie.title);
              open();
            }}
          >
            <Box className="flex flex-col gap-2 ">
              <Box
                background={`url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}') center/cover no-repeat`}
                display={"grid"}
                placeItems={"center"}
                h={"150px"}
                w={"200px"}
                rounded={"lg"}
                className="hover:scale-110
                duration-200"
                m="auto"
                //   onMouseEnter={() => setBackDropPath(movie.backdrop_path)}
              >
                <FaPlay color="white" />
              </Box>
              <Text color="white" fontFamily={"fantasy"} m="auto">
                {movie.title}
              </Text>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TrailerCarousel;
