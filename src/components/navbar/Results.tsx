"use client";
import { TMovie } from "@/models/movie";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
type props = {
  movies: Pick<TMovie, "_id" | "title">[] | null | undefined;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  err: string;
};
const Results = ({ movies, setKeyword, err }: props) => {
  return (
    <Box className="absolute w-full bg-white shadow-lg text-black z-50">
      {movies &&
        movies.length > 0 &&
        !err &&
        movies.map((movie, index) => {
          return (
            <Link
              key={index}
              href={`/review/movie/${movie._id}`}
              onClick={() => {
                setKeyword("");
              }}
            >
              <Box className="flex border-slate-400 border-y-[1px] p-2 gap-3 hover:bg-black hover:bg-opacity-20">
                <CiSearch />
                <Text className="text-sm ">{movie.title}</Text>
              </Box>
            </Link>
          );
        })}
      {err && (
        <Box className=" p-2 ">
          <Text className="text-sm font-black">{err}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Results;
