"use server";
import mongoose, { Document, Model } from "mongoose";
export type TActor = {
  _id: number;
  also_known_as: string[];
  biography: string | "";
  birthday: string | null;
  deathday: string;
  name: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
};
type TActorSchema = TActor & Document;
const ActorSchema = new mongoose.Schema<TActorSchema>({
  _id: {
    type: Number,
    required: true,
  },
  also_known_as: [
    {
      type: String,
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    default: "",
  },
  birthday: {
    type: String,
    default: null,
  },
  deathday: {
    type: String,
    default: null,
  },
  place_of_birth: {
    type: String,
    default: null,
  },
  popularity: {
    type: Number,
    required: true,
  },
  profile_path: {
    type: String,
    default: null,
  },
});
export const Actor: Model<TActorSchema> =
  mongoose.models.Actor || mongoose.model<TActorSchema>("Actor", ActorSchema);
