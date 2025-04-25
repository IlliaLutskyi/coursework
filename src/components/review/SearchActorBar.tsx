import React, { useState } from "react";
import { Box, Input, Text } from "@chakra-ui/react";
import { useSearchActorByName } from "@/hooks/useSearchActorByName";
import { InputGroup } from "../ui/input-group";
import { CiSearch } from "react-icons/ci";
import Hints from "./Hints";
import { IoCloseOutline } from "react-icons/io5";

import OptimizedImage from "../OptimizedImage";

const SearchActorBar = () => {
  const [name, setName] = useState("");
  const { actors, err, setActors } = useSearchActorByName(name);
  const [selectedActor, setSelectedActor] = useState<{
    profile_path: string;
    name: string;
  }>();
  return (
    <Box>
      <Box className="grid grid-cols-[1fr_1fr] gap-3 items-center">
        <InputGroup
          startElement={<CiSearch />}
          endElement={
            actors && actors.length > 0 ? (
              <IoCloseOutline
                className="io-close-outline"
                onClick={() => {
                  setActors([]);
                }}
              />
            ) : null
          }
        >
          <Input
            type="text"
            placeholder="Search for an actor"
            className="relative bg-black text-white p-2 w-full"
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
        <Box>
          {selectedActor ? (
            <Box className="grid grid-cols-[1fr_5fr] shadow-xl rounded-full items-center">
              <OptimizedImage
                path={selectedActor.profile_path}
                className="w-1/3 m-auto rounded-full"
              />
              <Text>{selectedActor.name}</Text>
            </Box>
          ) : null}
        </Box>
      </Box>

      <Hints
        actors={actors}
        err={err}
        setActors={setActors}
        setSelectedActor={setSelectedActor}
      />
    </Box>
  );
};

export default SearchActorBar;
