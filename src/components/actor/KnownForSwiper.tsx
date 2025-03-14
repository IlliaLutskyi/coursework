"use client";

import { TMovie } from "@/models/movie";
import { Box, Em, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Mousewheel, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type props = {
  movies: Pick<TMovie, "title" | "poster_path" | "_id">[];
};
const KnownForSwiper = ({ movies }: props) => {
  return (
    <Swiper
      modules={[Mousewheel, Scrollbar]}
      slidesPerView={2}
      spaceBetween={10}
      scrollbar={{ hide: true }}
      mousewheel={{ forceToAxis: true }}
      grabCursor={true}
      simulateTouch={true}
      touchRatio={2}
      direction="horizontal"
      breakpoints={{
        640: { slidesPerView: 3, spaceBetween: 10 },
        768: { slidesPerView: 4, spaceBetween: 10 },
        1024: { slidesPerView: 6, spaceBetween: 10 },
      }}
    >
      {movies?.map((movie, index) => {
        return (
          <SwiperSlide key={index} className="mb-4">
            <Link href={`/review/movie/${movie._id}`}>
              <Box>
                <Box>
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt=""
                    width={300}
                    height={300}
                    className="w-[200px] h-[250px] m-auto rounded-md object-cover object-center"
                  />
                </Box>
                <Box textAlign={"center"}>
                  <Text
                    fontFamily="cursive"
                    className="font-bold hover:text-blue-400 text-sm"
                  >
                    {movie.title}
                  </Text>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default KnownForSwiper;
