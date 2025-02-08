import mongoose, { Document, Model } from "mongoose";
interface IMovie extends Document {
  _id: number;
  title: string;
  genre: number[];
  cast: number;
  overview: string;
  popularity: number;
  trailer_key: string;
  trailer_site: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
}
const MovieSchema = new mongoose.Schema<IMovie>({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  genre: [Number],
  cast: Number,
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
  poster_path: {
    type: String,
    required: true,
  },
});
export const Movie: Model<IMovie> =
  mongoose.models.Movie ?? mongoose.model<IMovie>("Movie", MovieSchema);
