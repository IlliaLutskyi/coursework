import { TMovie } from "@/models/movie";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import OptimizedImage from "../OptimizedImage";

type props = {
  movies: Pick<TMovie, "title" | "poster_path" | "_id">[];
};
const KnownForSwiper = ({ movies }: props) => {
  return (
    <Box
      className="flex gap-4 overflow-x-scroll snap-x snap-mandatory scroll-smooth"
      id="scroll_container"
    >
      {movies?.map((movie, index) => {
        const path =
          movie?.poster_path.includes(".jpg") ||
          movie?.poster_path.includes(".png") ||
          movie?.poster_path.includes(".webp") ||
          movie?.poster_path.includes(".jpeg")
            ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
            : `https://pink-genetic-monkey-993.mypinata.cloud/ipfs/${movie?.poster_path}`;
        return (
          <Link
            href={`/review/movie/${movie._id}`}
            key={index}
            className="snap-center w-[200px] mb-2 flex-shrink-0"
          >
            <Box>
              <Box>
                <OptimizedImage path={path} />
              </Box>
              <Box textAlign={"center"}>
                <Text
                  fontFamily="cursive"
                  className="font-bold hover:text-blue-400 text-sm"
                >
                  {movie.title}
                </Text>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default KnownForSwiper;
