import mongoose from "mongoose";
interface ICast {
  tmdb_movie_id: number;
  _id: number;
  cast: mongoose.Types.ObjectId[];
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
  cast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
    },
  ],
});
export const Cast = mongoose.models.Cast ?? mongoose.model("Cast", CastSchema);
