"use server";
import mongoose, { Document, Model } from "mongoose";

interface IGenre extends Document {
  _id: number;
  name: string;
}
const GenreSchema = new mongoose.Schema<IGenre>({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
});
export const Genre: Model<IGenre> =
  mongoose.models.Genre ?? mongoose.model<IGenre>("Genre", GenreSchema);
