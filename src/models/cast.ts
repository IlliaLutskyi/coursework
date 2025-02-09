"use server";
import mongoose, { Document, Model } from "mongoose";
export type TCast = {
  character: string;
  id: number;
  name: string;
  cast_id: number;
  order: number;
  popularity: number;
  profile_path: string | null;
};
interface ICast extends Document {
  tmdb_movie_id: number;
  cast: TCast[];
}
const CastSchema = new mongoose.Schema<ICast>({
  tmdb_movie_id: {
    type: Number,
    required: true,
    unique: true,
  },
  cast: [
    {
      character: {
        type: String,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
      cast_id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
      popularity: {
        type: Number,
        required: true,
      },
      profile_path: { type: String, default: null },
    },
  ],
});
export const Cast: Model<ICast> =
  mongoose.models.Cast ?? mongoose.model<ICast>("Cast", CastSchema);
