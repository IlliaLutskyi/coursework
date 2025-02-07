import {
  Box,
  Button,
  Field,
  Flex,
  Icon,
  Input,
  Separator,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { CiSearch } from "react-icons/ci";

import { CiMenuBurger } from "react-icons/ci";
import { InputGroup } from "../ui/input-group";
const NavigationBar = () => {
  return (
    <Box>
      <Flex direction="row" className="p-3 gap-4  items-baseline">
        <Icon fontSize="2xl" className="self-center">
          <CiMenuBurger />
        </Icon>
        <Text className="bg-yellow-200 text-black p-1 rounded-lg font-mono text-lg">
          Spook
        </Text>
        <InputGroup
          endElement={<CiSearch />}
          className="bg-white text-black rounded-md flex-grow "
        >
          <Input
            className="focus:border focus:border-yellow-500 
            focus:border-x-2 
             focus:border-y-2 outline-none"
            placeholder="Search for a movie"
          />
        </InputGroup>

        <Button
          variant="outline"
          className="p-2 hover:bg-white hover:bg-opacity-15"
        >
          Sign in
        </Button>
      </Flex>
    </Box>
  );
};

export default NavigationBar;
