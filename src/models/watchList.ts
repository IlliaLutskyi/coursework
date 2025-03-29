import mongoose, { Schema, Document, Model } from "mongoose";

export type TWatchList = {
  _id: string;
  movies: { movie_id: number; added_at: Date }[];
  userId: mongoose.Types.ObjectId;
};
type TWatchListSchema = TWatchList & Document;
const watchListSchema = new mongoose.Schema<TWatchListSchema>({
  movies: [
    {
      movie_id: {
        type: Number,
        ref: "Movie",
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
