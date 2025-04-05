import Profile from "@/components/watchlist/Profile";
import Watchlist from "@/components/watchlist/Watchlist";
import { Box } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { WatchList } from "@/models/watchList";
import { TMovie } from "@/models/movie";
import connectDb from "@/lib/db";
import { TTVshow } from "@/models/tvshow";
export type watchlist = {
  movies: {
    movie: TMovie | TTVshow;
    added_at: Date;
    refType: "Movie" | "TVshow";
  }[];
} | null;
const WatchlistPage = async () => {
  await connectDb();
  const session = await getServerSession(authOptions);
  const watchlist = await getWatchlist(session?.user.id as string);
  return (
    <Box className="flex flex-col gap-4">
      <Profile />
      {watchlist && watchlist.movies.length !== 0 ? (
        <Watchlist watchlist={watchlist} />
      ) : (
        <Box className="text-lg text-center font-bold">
          Your watchlist is empty
        </Box>
      )}
    </Box>
  );
};
async function getWatchlist(userId: string): Promise<watchlist> {
  const watchlist = (await WatchList.findOne({ userId })
    .select({ "movies._id": 0, _id: 0, userId: 0 })
    .populate("movies.movie")
    .lean()) as watchlist;

  return watchlist;
}
export default WatchlistPage;
