"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { TFetchedMovies } from "./Content";
import { Box, Em, Image, Text } from "@chakra-ui/react";
import { Mousewheel } from "swiper/modules";
const MovieCarousel = ({
  movies,
}: {
  movies: TFetchedMovies[] | undefined;
}) => {
  return (
    <Swiper
      modules={[Mousewheel]}
      slidesPerView={2}
      spaceBetween={5}
      mousewheel={{ forceToAxis: true }}
      grabCursor={true}
      simulateTouch={true}
      touchRatio={2}
      direction="horizontal"
      breakpoints={{
        640: { slidesPerView: 3, spaceBetween: 10 },
        768: { slidesPerView: 4, spaceBetween: 20 },
        1024: { slidesPerView: 6, spaceBetween: 30 },
      }}
    >
      {movies?.map((movie) => {
        return (
          <SwiperSlide key={movie._id}>
            <Link
              href={`/review/${
                movie?.media_type ? movie.media_type : "movie"
              }/${movie._id}`}
            >
              <Box>
                <Box>
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    className="sm:w-[250px] w-[200px] "
                    rounded={"lg"}
                    m="auto"
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
    </Swiper>
  );
};

export default MovieCarousel;
