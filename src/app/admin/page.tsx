import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { Box, Tabs } from "@chakra-ui/react";
import MovieTab from "@/components/admin/MovieTab";
import ActorTab from "@/components/admin/ActorTab";
import GenreTab from "@/components/admin/GenreTab";
const Admin = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.isAdmin) return;
  return (
    <Tabs.Root
      defaultValue="movie"
      className="grid grid-cols-[1fr_4fr] w-full items-baseline p-10"
      variant="plain"
    >
      <Box>
        <Tabs.List className="flex flex-col gap-4 items-start w-full">
          <Tabs.Trigger
            value="movie"
            _selected={{
              bg: "black",
              color: "white",
            }}
            className="shadow-xl rounded-md px-4 py-2 text-sm"
          >
            Create movie
          </Tabs.Trigger>
          <Tabs.Trigger
            value="actor"
            className="shadow-xl rounded-md px-4 py-2 text-sm"
            _selected={{
              bg: "black",
              color: "white",
            }}
          >
            Create actor
          </Tabs.Trigger>
          <Tabs.Trigger
            value="genre"
            className="shadow-xl rounded-md px-4 py-2 text-sm"
            _selected={{
              bg: "black",
              color: "white",
            }}
          >
            Create genre
          </Tabs.Trigger>
        </Tabs.List>
      </Box>
      <Box>
        <Tabs.Content value="movie">
          <MovieTab />
        </Tabs.Content>
        <Tabs.Content value="actor">
          <ActorTab />
        </Tabs.Content>
        <Tabs.Content value="genre">
          <GenreTab />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
};

export default Admin;
