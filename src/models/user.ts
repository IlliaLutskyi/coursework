import mongoose, { Document, Model } from "mongoose";
import { WatchList } from "./watchList";

type TUser = {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationToken: string;
};
type TUserSchema = TUser & Document;
const userSchema = new mongoose.Schema<TUserSchema>({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: "",
  },
});
userSchema.post("save", async (doc: TUserSchema) => {
  try {
    const watchList = new WatchList({
      userId: doc._id,
      movies: [],
    });
    await watchList.save();
  } catch (err) {
    console.error(err);
  }
});
userSchema.post("findOneAndDelete", async (doc: TUserSchema) => {
  try {
    const watchList = await WatchList.findOne({ userId: doc._id });
    await watchList?.deleteOne();
  } catch (err) {
    console.error(err);
  }
});
export const User: Model<TUserSchema> =
  mongoose.models.User ?? mongoose.model<TUserSchema>("User", userSchema);
