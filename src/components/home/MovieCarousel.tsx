"use client";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { TFetchedMovies } from "@/app/page";
import { Box, Em, Image, Text } from "@chakra-ui/react";
import { Mousewheel } from "swiper/modules";
import SwiperSkeleton from "../SwiperSkeleton";
import OptimizedImage from "../OptimizedImage";
const MovieCarousel = ({
  movies,
}: {
  movies: TFetchedMovies[] | undefined;
}) => {
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);
  function handleImagesLoad() {
    setImagesLoadedCount((prev) => prev + 1);
  }
  return (
    <>
      {/* {imagesLoadedCount !== movies?.length && (
        <SwiperSkeleton amount_of_slides={8} />
      )} */}
      <Box className="flex overflow-x-scroll gap-4 snap-x snap-mandantory w-full p-3">
        {movies?.map((movie, index) => {
          return (
            // <SwiperSlide key={index}>
            <Link
              href={`/review/${
                movie?.media_type ? movie.media_type : "movie"
              }/${movie._id}`}
              key={index}
              className="snap-start w-[200px] flex-shrink-0 "
            >
              <Box>
                <Box>
                  <OptimizedImage
                    path={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    className="w-full m-auto rounded-md"
                  />
                </Box>
                <Box textAlign={"center"}>
                  <Text
                    fontFamily="cursive"
                    className="font-bold hover:text-blue-400"
                  >
                    {movie.title}
                  </Text>
                  <Em fontSize={"0.7rem"}>{movie.release_date}</Em>
                </Box>
              </Box>
            </Link>
            // </SwiperSlide>
          );
        })}
      </Box>
      {/* <Swiper
        className={`${imagesLoadedCount === movies?.length ? "" : "hidden"}`}
        modules={[Mousewheel]}
        slidesPerView={2}
        spaceBetween={10}
        mousewheel={{ forceToAxis: true }}
        grabCursor={true}
        simulateTouch={true}
        touchRatio={2}
        direction="horizontal"
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 30 },
        }}
      >
        {movies?.map((movie, index) => {
          return (
            <SwiperSlide key={index}>
              <Link
                href={`/review/${
                  movie?.media_type ? movie.media_type : "movie"
                }/${movie._id}`}
              >
                <Box>
                  <Box>
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      className="w-full m-auto rounded-md"
                      onLoad={handleImagesLoad}
                    />
                  </Box>
                  <Box textAlign={"center"}>
                    <Text
                      fontFamily="cursive"
                      className="font-bold hover:text-blue-400"
                    >
                      {movie.title}
                    </Text>
                    <Em fontSize={"0.7rem"}>{movie.release_date}</Em>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper> */}
    </>
  );
};

export default MovieCarousel;
