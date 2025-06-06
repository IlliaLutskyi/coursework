"use server";
import mongoose, { Document, Model } from "mongoose";
export type TCast = {
  character: string | "";
  id: number;
  name: string;
  cast_id?: number;
  order: number;
  popularity: number;
  profile_path: string | null;
};
type TCastSchema = { tmdb_movie_id: number; cast: TCast[] } & Document;
const CastSchema = new mongoose.Schema<TCastSchema>({
  tmdb_movie_id: {
    type: Number,
    required: true,
    unique: true,
  },
  cast: [
    {
      character: {
        type: String,
        default: "",
      },
      id: {
        type: Number,
        required: true,
      },
      cast_id: {
        type: Number,
        default: -1,
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
export const Cast: Model<TCastSchema> =
  mongoose.models.Cast ?? mongoose.model<TCastSchema>("Cast", CastSchema);
