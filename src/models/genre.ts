"use server";
import mongoose, { Document, Model } from "mongoose";

export type TGenre = {
  _id: number;
  name: string;
};
type TGenreSchema = TGenre & Document;
const GenreSchema = new mongoose.Schema<TGenreSchema>({
  _id: {
    type: Number,
    required: true,
  },
  name: { type: String, required: true },
});
export const Genre: Model<TGenreSchema> =
  mongoose.models.Genre ?? mongoose.model<TGenreSchema>("Genre", GenreSchema);
