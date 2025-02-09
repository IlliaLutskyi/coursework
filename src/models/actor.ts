"use server";
import mongoose, { Document, Model } from "mongoose";
interface IActor extends Document {
  _id: number;
  also_known_as: string[];
  biography: string | "";
  birthday: string | null;
  deathday: string;
  name: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
}
const ActorSchema = new mongoose.Schema<IActor>({
  _id: {
    type: Number,
    required: true,
    unique: true,
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
export const Actor: Model<IActor> =
  mongoose.models.Actor || mongoose.model<IActor>("Actor", ActorSchema);
