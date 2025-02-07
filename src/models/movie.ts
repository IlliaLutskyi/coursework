import mongoose, { Mongoose } from "mongoose";
interface IMovie {
  _id: number;
  title: string;
  genre: mongoose.Types.ObjectId[];
  cast: mongoose.Types.ObjectId;
  overview: string;
  popularity: number;
  trailer_key: string;
  trailer_site: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}
const MovieSchema = new mongoose.Schema<IMovie>(
  {
    _id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    genre: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    cast: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cast",
    },
    overview: {
      type: String,
      required: true,
    },
    trailer_key: {
      type: String,
      unique: true,
    },
    trailer_site: String,
    popularity: {
      type: Number,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
    },
    vote_count: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const Movie =
  mongoose.models.Movie ?? mongoose.model("Movie", MovieSchema);
