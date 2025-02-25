"use server";
import mongoose, { Document, Model } from "mongoose";
export type TTVshowCast = {
  character: string | "";
  id: number;
  name: string;
  order: number;
  popularity: number;
  profile_path: string | null;
};
type TTVshowCastSchema = {
  tmdb_movie_id: number;
  cast: TTVshowCast[];
} & Document;
const CastSchema = new mongoose.Schema<TTVshowCastSchema>({
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
export const TVshowCast: Model<TTVshowCastSchema> =
  mongoose.models.TVshowCast ??
  mongoose.model<TTVshowCastSchema>("TVshowCast", CastSchema);
