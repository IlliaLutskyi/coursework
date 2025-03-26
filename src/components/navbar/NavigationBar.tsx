import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import Link from "next/link";
import Menu from "./Menu";
import SearchBox from "./SearchBox";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const NavigationBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Box className=" flex items-center justify-center gap-4 p-2 ">
      <Link href="/">
        <Heading className="text-xl font-bold ">Spook</Heading>
      </Link>
      <Box className="relative flex-grow">
        <SearchBox />
      </Box>
      {!session?.user && (
        <Link
          href="/signup"
          className="sm:block hidden bg-black shadow-md  text-white p-2 text-sm rounded-lg hover:scale-105"
        >
          Sign up
        </Link>
      )}

      <Menu />
    </Box>
  );
};

export default NavigationBar;
