"use client";
import React, { KeyboardEvent, useState } from "react";
import { InputGroup } from "../ui/input-group";
import { CiSearch } from "react-icons/ci";
import { Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  function handleEnterClick(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key.toLocaleLowerCase() === "enter") {
      router.push(`/reviews?keyword=${keyword}`);
      setKeyword("");
    }
  }
  return (
    <InputGroup endElement={<CiSearch />} width="80%">
      <Input
        className="text-black bg-white w-full flex-grow"
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleEnterClick}
      />
    </InputGroup>
  );
};

export default SearchBar;
