import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import Menu from "./Menu";
import SearchBox from "./SearchBox";
import SignupButton from "./SignupButton";

const NavigationBar = async () => {
  return (
    <Box className=" flex items-center justify-center gap-4 p-2 ">
      <Link href="/">
        <Heading className="text-xl font-bold ">Spook</Heading>
      </Link>
      <Box className="relative flex-grow">
        <SearchBox />
      </Box>
      {/* SignupButton apprears when user is logged out, ProfileMenu appears when user is logged in */}
      <SignupButton />

      <Menu />
    </Box>
  );
};

export default NavigationBar;
