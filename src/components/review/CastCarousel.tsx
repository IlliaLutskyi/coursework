"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Scrollbar } from "swiper/modules";
import { TCast } from "@/models/cast";
import { TTVshowCast } from "@/models/tvshowcast";
import { Card, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
type props = {
  cast: TCast[] | TTVshowCast[] | undefined;
};
const CastCarousel = ({ cast }: props) => {
  return (
    <Swiper
      modules={[Mousewheel, Scrollbar]}
      slidesPerView={2}
      spaceBetween={30}
      scrollbar={{ hide: true }}
      mousewheel={{ forceToAxis: true }}
      grabCursor={true}
      simulateTouch={true}
      touchRatio={2}
      direction="horizontal"
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
    >
      {cast?.map((character, index) => {
        return (
          <SwiperSlide key={index} className="h-[400px] cursor-pointer pb-8">
            <Link href={`/actor/${character.id}`}>
              <Card.Root
                h="full"
                className="bg-white border-black border-x-[1px] border-y-[1px] shadow-2xl"
                maxW="sm"
                overflow="hidden"
                gap="0"
              >
                {character?.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/original${character.profile_path}`}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full"
                  />
                ) : (
                  <FaUserAlt className="w-full h-[200px] p-2" color="black" />
                )}
                <Card.Body className="text-black w-full">
                  <Heading className="font-bold text-sm w-full hover:opacity-40">
                    {character.name}
                  </Heading>
                  <Text className="text-sm">{character.character}</Text>
                </Card.Body>
              </Card.Root>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CastCarousel;
