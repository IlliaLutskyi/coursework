"use client";
import { FaPlay } from "react-icons/fa";
import { Box, Text } from "@chakra-ui/react";
import { useTrailerPopupStore } from "@/stores/useTrailerPopupStore";
import { TFetchedLatestMovie } from "@/app/page";
const TrailerCarousel = ({
  movies,
}: //   setBackDropPath,
{
  movies: TFetchedLatestMovie[] | undefined;
  //   setBackDropPath: Dispatch<SetStateAction<string>>;
}) => {
  const open = useTrailerPopupStore((store) => store.toggle);
  const setTrailerId = useTrailerPopupStore((store) => store.setTrailerId);
  const setMovieTitle = useTrailerPopupStore((store) => store.setMovieTitle);
  return (
    <Box
      className="flex gap-20 overflow-x-scroll snap-x snap-mandatory mx-4 py-4"
      id="scroll_container"
    >
      {movies?.map((movie) => {
        return (
          <Box
            key={movie._id}
            onClick={() => {
              setTrailerId(movie.trailer_id);
              setMovieTitle(movie.title);
              open();
            }}
            className="snap-start w-[150px] flex-shrink-0"
          >
            <Box className="flex flex-col gap-2 ">
              <Box
                background={`url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}') center/cover no-repeat`}
                className="grid place-items-center h-[150px] w-[200px] rounded-lg m-auto hover:scale-110
                duration-200"
                //   onMouseEnter={() => setBackDropPath(movie.backdrop_path)}
              >
                <FaPlay color="white" />
              </Box>
              <Text color="white" fontFamily={"fantasy"} m="auto">
                {movie.title}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default TrailerCarousel;
