import mongoose, { Document, Model } from "mongoose";
export type TTVshow = {
  _id: number;
  title: string;
  genre: number[];
  overview: string;
  popularity: number;
  trailer_id: string;
  release_date: string;
  media_type: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  poster_path: string;
  origin_country: string[];
};
type TTVshowSchema = TTVshow & Document;
const TVshowSchema = new mongoose.Schema<TTVshowSchema>({
  _id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  media_type: {
    type: String,
    required: true,
  },
  genre: [
    {
      type: Number,
      required: true,
    },
  ],
  trailer_id: {
    type: String,
    unique: true,
    required: true,
  },
  backdrop_path: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },

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
  origin_country: [String],
});
export const TVshow: Model<TTVshowSchema> =
  mongoose.models.TVshow ??
  mongoose.model<TTVshowSchema>("TVshow", TVshowSchema);
