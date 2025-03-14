import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";
import { InputGroup } from "../ui/input-group";
import { CiSearch } from "react-icons/ci";
import { TFetchedMovies } from "@/app/page";
import { getRandomPoster } from "@/utils/getRandomPoster";
import SearchBar from "./SearchBar";
type props = {
  trendingMovies: TFetchedMovies[];
};
const Header = ({ trendingMovies }: props) => {
  return (
    <Box
      background={`linear-gradient(rgba(0, 0, 0, 0.6) , rgba(0,0,0,0.6)),url("https://image.tmdb.org/t/p/original${getRandomPoster(
        trendingMovies
      )}") center/cover no-repeat`}
      className="flex flex-col justify-center items-center
        gap-4
        h-[300px]
       
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
      <SearchBar />
    </Box>
  );
};

export default Header;
