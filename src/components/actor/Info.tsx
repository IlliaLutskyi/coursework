import { TActor } from "@/models/actor";
import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
type props = {
  actor: Omit<TActor, "_id"> | null;
};
const Info = ({ actor }: props) => {
  return (
    <Box className="flex sm:flex-row flex-col   gap-4 justify-around text-center items-center">
      {actor?.place_of_birth && (
        <Box>
          <Heading className="font-bold text-xl">Place of birth</Heading>
          <Text>{actor.place_of_birth}</Text>
        </Box>
      )}
      {actor?.deathday && (
        <Box>
          <Heading className="font-bold text-xl">Date of death</Heading>
          <Text>{actor.deathday}</Text>
        </Box>
      )}
      {actor?.birthday && (
        <Box>
          <Heading className="font-bold text-xl">Birthdate</Heading>
          <Text>{actor.birthday}</Text>
        </Box>
      )}
      {actor?.also_known_as && actor.also_known_as.length !== 0 && (
        <Box>
          <Heading className="font-bold text-xl">Also Known As</Heading>
          {actor.also_known_as.map((name) => (
            <Text>{name}</Text>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Info;
