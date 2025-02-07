import mongoose from "mongoose";
export interface IActor {
  tmdb_cast_id: number;
  _id: number;
  character: string;
  name: string;
  order: number;
  popularity: number;
  profile_path: string;
}
export const ActorSchema = new mongoose.Schema<IActor>(
  {
    tmdb_cast_id: {
      type: Number,
      required: true,
    },
    _id: {
      type: Number,
      required: true,
      unique: true,
    },
    character: {
      type: String,
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
    profile_path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Actor =
  mongoose.models.Actor ?? mongoose.model("Actor", ActorSchema);
