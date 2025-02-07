import mongoose from "mongoose";
interface IGenre {
  _id: number;
  name: string;
}
const GenreSchema = new mongoose.Schema<IGenre>(
  {
    _id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);
export const Genre =
  mongoose.models.Genre ?? mongoose.model("Genre", GenreSchema);
