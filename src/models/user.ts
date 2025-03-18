import mongoose, { Document, Model } from "mongoose";

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
export const User: Model<TUserSchema> =
  mongoose.models.User ?? mongoose.model<TUserSchema>("User", userSchema);
