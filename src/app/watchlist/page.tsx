import Profile from "@/components/watchlist/Profile";
import Watchlist from "@/components/watchlist/Watchlist";
import { Box } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { WatchList } from "@/models/watchList";
import { TMovie } from "@/models/movie";
import connectDb from "@/lib/db";
export type watchlist = {
  movies: { movie_id: TMovie; added_at: Date }[];
} | null;
const page = async () => {
  await connectDb();
  const session = await getServerSession(authOptions);
  const watchlist = await getWatchlist(session?.user.id as string);
  return (
    <Box>
      <Profile />
      <Watchlist watchlist={watchlist} />
    </Box>
  );
};
async function getWatchlist(userId: string): Promise<watchlist> {
  const watchlist = (await WatchList.findOne({ userId })
    .select({ "movies._id": 0, _id: 0, userId: 0 })
    .populate("movies.movie_id")
    .sort({ "movies.added_at": 1 })
    .lean()) as watchlist;

  return watchlist;
}
export default page;
