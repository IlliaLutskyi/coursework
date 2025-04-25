"use client";
import { TActor } from "@/models/actor";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import OptimizedImage from "../OptimizedImage";
import { useCreateCastMemberStore } from "@/stores/useCreateCastMemberStore";

type props = {
  actors: TActor[] | undefined;
  err: string;
  setActors: React.Dispatch<React.SetStateAction<TActor[] | undefined>>;
  setSelectedActor: React.Dispatch<
    React.SetStateAction<
      | {
          profile_path: string;
          name: string;
        }
      | undefined
    >
  >;
};
const Hints = ({ actors, err, setActors, setSelectedActor }: props) => {
  const { setActorId, actorId } = useCreateCastMemberStore((store) => store);
  if (err) return <Text className="text-sm">{err}</Text>;
  return (
    <Box className="absolute flex flex-col w-full bg-slate-300 z-50 shadow-2xl">
      {actors?.map((actor, index) => {
        const profilePath =
          actor.profile_path?.includes(".jpg") ||
          actor.profile_path?.includes(".png") ||
          actor.profile_path?.includes(".webp") ||
          actor.profile_path?.includes(".jpeg")
            ? `https://image.tmdb.org/t/p/original${actor?.profile_path}`
            : `https://pink-genetic-monkey-993.mypinata.cloud/ipfs/${actor.profile_path}`;
        return (
          <Box
            key={index}
            className={`grid grid-cols-[1fr_6fr] hover:bg-blue-300 ${
              actorId === actor._id ? "bg-blue-300" : "bg-white"
            }`}
            id="hints-container"
            onClick={() => {
              setActorId(actor._id);
              setActors([]);
              setSelectedActor({
                profile_path: profilePath,
                name: actor.name,
              });
            }}
          >
            <Box>
              <OptimizedImage
                path={profilePath}
                className="w-1/3 m-auto rounded-full"
              />
            </Box>
            <Box>
              <Text className="text-sm">{actor.name}</Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Hints;
