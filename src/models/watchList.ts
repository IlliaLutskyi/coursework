import mongoose, { Document, Model } from "mongoose";
import { TMovie } from "./movie";
import { TTVshow } from "./tvshow";

export type TWatchList = {
  _id: string;
  movies: {
    movie: number | TMovie | TTVshow;
    added_at: Date;
    refType: "Movie" | "TVshow";
  }[];
  userId: mongoose.Types.ObjectId;
};
type TWatchListSchema = TWatchList & Document;
const watchListSchema = new mongoose.Schema<TWatchListSchema>({
  movies: [
    {
      movie: {
        type: Number,
        refPath: "movies.refType",
      },
      refType: {
        type: String,
        required: true,
        enum: ["Movie", "TVshow"],
      },
      added_at: {
        type: Date,
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: "User",
  },
});
export const WatchList: Model<TWatchListSchema> =
  mongoose.models.WatchList ??
  mongoose.model<TWatchListSchema>("WatchList", watchListSchema);
