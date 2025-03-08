"use client";
import { Box, Em, Skeleton, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
type props = {
  amount_of_slides: number;
};
const SwiperSkeleton = ({ amount_of_slides }: props) => {
  const slides = new Array(amount_of_slides).fill(1);
  return (
    <Swiper
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
      {slides.map((_, index) => (
        <SwiperSlide key={index}>
          <Box>
            <Skeleton className="w-[220px] h-[270px] m-auto rounded-md"></Skeleton>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSkeleton;
