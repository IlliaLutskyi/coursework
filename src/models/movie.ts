"use server";
import mongoose, { Document, Model } from "mongoose";

export type TMovie = {
  _id: number;
  title: string;
  genre: number[];
  cast: number;
  overview: string;
  popularity: number;
  trailer_id: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  poster_path: string;
};
type TMovieSchema = TMovie & Document;
const MovieSchema = new mongoose.Schema<TMovieSchema>({
  _id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  genre: [
    {
      type: Number,
      required: true,
    },
  ],
  cast: {
    type: Number,
    required: true,
  },
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
});

export const Movie: Model<TMovieSchema> =
  mongoose.models.Movie || mongoose.model<TMovieSchema>("Movie", MovieSchema);
