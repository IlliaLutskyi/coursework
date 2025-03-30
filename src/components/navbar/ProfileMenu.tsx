"use client";
import { Avatar, Box, Heading, Menu, Portal, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const ProfileMenu = () => {
  const { data: session } = useSession();
  return (
    <>
      {session?.user && (
        <Menu.Root>
          <Menu.Trigger>
            <Avatar.Root colorPalette="black">
              <Avatar.Fallback>
                {session.user.name && session.user.name[0]}
              </Avatar.Fallback>
              <Avatar.Image src={`${session.user.image}`} />
            </Avatar.Root>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Box className="p-2 ">
                  <Heading className="font-bold text-sm ">
                    {session.user.name}
                  </Heading>
                  <Text className="text-xs">{session.user.email}</Text>
                </Box>
                <Menu.Item value="watchlist">
                  <Link href="/watchlist" className="text-center w-full">
                    Watchlist
                  </Link>
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item
                  value="log_out"
                  onClick={async () => await signOut({ redirect: false })}
                >
                  <Text className="text-center w-full">Log out</Text>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      )}
    </>
  );
};

export default ProfileMenu;
