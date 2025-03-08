import { TActor } from "@/models/actor";
import { Box, Heading, Text } from "@chakra-ui/react";
import OptimizedImage from "../OptimizedImage";

type props = {
  actor: Omit<TActor, "_id"> | null;
};
const ActorContent = ({ actor }: props) => {
  return (
    <Box className="grid sm:grid-cols-[1fr_3fr] gap-8 mx-8 mt-8">
      <Box>
        <OptimizedImage
          path={`https://image.tmdb.org/t/p/original${actor?.profile_path}`}
        />
      </Box>

      <Box className="flex flex-col gap-4">
        <Box>
          <Heading className="font-black text-3xl">{actor?.name}</Heading>
        </Box>
        {actor?.biography && (
          <Box>
            <Heading className="font-bold text-xl mb-2">Biography</Heading>
            <Text>{actor?.biography}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ActorContent;
