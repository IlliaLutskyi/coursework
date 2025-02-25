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
    <Box color="white">
      <Flex
        direction="row"
        alignItems="baseline"
        background="black"
        padding="0.75rem"
        gap="1rem"
      >
        <Icon fontSize="2xl" alignSelf="center">
          <CiMenuBurger />
        </Icon>
        <Text
          background="linear-gradient(#eeaeca,#94bbe9)"
          color="black"
          backgroundClip={"text"}
          padding="0.25rem"
          rounded="lg"
          fontFamily="revert"
          fontSize="large"
        >
          Spook
        </Text>
        <InputGroup
          endElement={<CiSearch />}
          background="white"
          color="black"
          borderRadius="lg"
          flexGrow="1"
        >
          <Input
            outline="none"
            _focus={{ border: "2px solid yellow", borderRadius: "lg" }}
            placeholder="Search for a movie"
          />
        </InputGroup>

        <Button
          variant="outline"
          padding="0.25"
          _hover={{ background: "white", opacity: "0.15" }}
        >
          Sign in
        </Button>
      </Flex>
    </Box>
  );
};

export default NavigationBar;
