import mongoose, { Document } from "mongoose";
import { Model } from "mongoose";
type TUser = {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpiry: mongoose.Schema.Types.Date;
};
const userSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  verificationTokenExpiry: Date,
});
const User: Model<TUser> =
  mongoose.models.User ?? mongoose.model<TUser>("User", userSchema);
