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
      className="flex gap-4 overflow-x-scroll snap-x snap-mandatory scroll-smooth"
      id="cast_scroll_container"
    >
      {cast?.map((character, index) => {
        const profilePath =
          character.profile_path?.includes(".jpg") ||
          character.profile_path?.includes(".png") ||
          character.profile_path?.includes(".webp") ||
          character.profile_path?.includes(".jpeg")
            ? `https://image.tmdb.org/t/p/original${character?.profile_path}`
            : `https://pink-genetic-monkey-993.mypinata.cloud/ipfs/${character.profile_path}`;

        return (
          <Link
            href={`/actor/${character.id}`}
            key={index}
            className="snap-center w-[200px] flex-shrink-0 py-3"
          >
            <Card.Root className="bg-white shadow-xl h-full ">
              {character?.profile_path ? (
                <OptimizedImage path={profilePath} />
              ) : (
                <FaUserAlt className="w-full h-3/4 p-2 text-black" />
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
