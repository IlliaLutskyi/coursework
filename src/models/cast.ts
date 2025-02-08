import mongoose, { Document, Model } from "mongoose";
interface ICast extends Document {
  tmdb_movie_id: number;
  _id: number;
  cast: number[];
}
const CastSchema = new mongoose.Schema<ICast>({
  tmdb_movie_id: {
    type: Number,
    required: true,
    unique: true,
  },
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  cast: [Number],
});
export const Cast: Model<ICast> =
  mongoose.models.Cast ?? mongoose.model<ICast>("Cast", CastSchema);
