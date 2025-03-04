import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import Link from "next/link";
import Menu from "./Menu";
import SearchBox from "./SearchBox";
const NavigationBar = () => {
  return (
    <Box className=" flex items-baseline justify-center gap-4 p-2 ">
      <Link href="/">
        <Heading className="text-xl font-bold ">Spook</Heading>
      </Link>
      <Box className="relative flex-grow">
        <SearchBox />
      </Box>
      <Menu />
    </Box>
  );
};

export default NavigationBar;
