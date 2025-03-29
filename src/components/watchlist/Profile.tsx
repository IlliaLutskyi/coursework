import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Avatar, Box, Heading, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import React from "react";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Box
      background="linear-gradient(rgba(1,1,1,0.5),rgba(1,1,1,0.5)), url('/images/waterfall.jpg') center/cover no-repeat"
      className="grid sm:grid-cols-[1fr,10fr] w-full h-[150px] content-center px-4 py-2"
    >
      <Box>
        <Avatar.Root colorPalette="pink" size="2xl">
          <Avatar.Fallback>
            {session?.user.name && session.user.name[0]}
          </Avatar.Fallback>
          <Avatar.Image src={session?.user.image ? session.user.image : ""} />
        </Avatar.Root>
      </Box>
      <Box className="text-white">
        <Heading className="text-2xl font-bold">{session?.user.name}</Heading>
        <Text className="text-xs">{session?.user.email}</Text>
      </Box>
    </Box>
  );
};

export default Profile;
