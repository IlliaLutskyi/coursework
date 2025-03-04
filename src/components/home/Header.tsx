import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";
import { InputGroup } from "../ui/input-group";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  return (
    <Box
      background={
        'linear-gradient(rgba(0, 0, 0, 0.5) , rgba(0, 0, 0, 0.2)),url("https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg") center/cover no-repeat'
      }
      className="flex flex-col justify-center items-center
        gap-4
        sm:h-[300px]
        h-[200px]
        "
    >
      <Text
        color="white"
        fontFamily="fantasy"
        textAlign={"center"}
        className="sm:text-[1.5rem] text-[1rem]"
      >
        Welcome to Spook – Your Ultimate Destination for Movies Info!
      </Text>
      <InputGroup
        endElement={<CiSearch className="hover:scale-125" />}
        width="80%"
      >
        <Input flexGrow="1" color="black" background="white" width="100%" />
      </InputGroup>
    </Box>
  );
};

export default Header;
