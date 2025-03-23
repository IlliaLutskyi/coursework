import mongoose, { Schema, Document, Model } from "mongoose";

type TWatchList = {
  movies: number[] | [];
  userId: Schema.Types.ObjectId;
};
type TWatchListSchema = TWatchList & Document;
const watchListSchema = new mongoose.Schema<TWatchListSchema>({
  movies: [
    {
      type: Number,
      ref: "Movie",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: "User",
  },
});
export const WatchList: Model<TWatchListSchema> =
  mongoose.models.WatchList ??
  mongoose.model<TWatchListSchema>("WatchList", watchListSchema);
