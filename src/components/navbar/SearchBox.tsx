"use client";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { InputGroup } from "../ui/input-group";
import { redirect } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { Box, Input, Text } from "@chakra-ui/react";
import Results from "./Results";
import { IoCloseOutline } from "react-icons/io5";
import { useSearchHints } from "@/hooks/useSearchHints";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const { movies, setMovies, loading, error } = useSearchHints(keyword);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLocaleLowerCase() === "enter") {
      setKeyword("");
      redirect(`/reviews?keyword=${keyword}`);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setMovies(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Box ref={searchRef}>
      <InputGroup
        startElement={<CiSearch />}
        endElement={
          keyword.length !== 0 && (
            <IoCloseOutline
              className="hover:text-black"
              size="1rem"
              onClick={() => setKeyword("")}
            />
          )
        }
        className="w-full"
      >
        <Input
          placeholder="Search for a movie"
          className="bg-blue-100  rounded-md"
          id="input"
          value={keyword}
          onKeyDown={handleKey}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </InputGroup>
      <Results movies={movies} setKeyword={setKeyword} err={error} />
    </Box>
  );
};

export default SearchBox;
