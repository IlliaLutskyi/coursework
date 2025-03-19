import { TCast } from "@/models/cast";
import { TTVshowCast } from "@/models/tvshowcast";
import { Box, Card, Heading, Text } from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import OptimizedImage from "../OptimizedImage";
type props = {
  cast: TCast[] | TTVshowCast[] | undefined;
};
const CastCarousel = ({ cast }: props) => {
  return (
    <Box
      className="flex gap-4 overflow-x-scroll snap-x snap-mandatory"
      id="cast_scroll_container"
    >
      {cast?.map((character, index) => {
        return (
          <Link
            href={`/actor/${character.id}`}
            key={index}
            className="snap-center w-[200px] flex-shrink-0 py-3"
          >
            <Card.Root
              h="full"
              className="bg-white shadow-xl"
              maxW="sm"
              overflow="hidden"
              gap="0"
            >
              {character?.profile_path ? (
                <OptimizedImage
                  path={`https://image.tmdb.org/t/p/original${character.profile_path}`}
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
        );
      })}
    </Box>
  );
};

export default CastCarousel;
