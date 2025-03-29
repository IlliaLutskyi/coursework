"use client";
import { watchlist } from "@/app/watchlist/page";
import { Box, Heading, NativeSelect } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
type props = {
  watchlist: watchlist;
};
const filterOptions = ["Date Added", "Popularity", "Release date"];
const Watchlist = ({ watchlist }: props) => {
  const [filter, setFilter] = useState<string>();
  const [filteredWatchlist, setFilteredWatchlist] = useState(watchlist?.movies);
  console.log(filteredWatchlist);
  useEffect(() => {}, [filter]);
  return (
    <Box className="mx-4 my-2">
      <Box className="flex gap-2 justify-end items-center">
        <Heading className="text-sm font-bold">Select filter:</Heading>
        <NativeSelect.Root className="w-[150px] bg-black text-white text-sm rounded-md ml-2">
          <NativeSelect.Field
            value={filter}
            onChange={(e) => setFilter(e.currentTarget.value)}
          >
            {filterOptions.map((filter, index) => {
              return (
                <option
                  value={filter}
                  key={index + 1}
                  className="p-2 text-white text-xs"
                >
                  {filter}
                </option>
              );
            })}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Box>
      <Box>
        {filteredWatchlist?.map((movie) => {
          return <></>;
        })}
      </Box>
    </Box>
  );
};

export default Watchlist;
