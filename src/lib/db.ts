import mongoose from "mongoose";

export function connectDb() {
  return mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => console.log("DB was connected"))
    .catch((err) => console.log(`DB Error: ${err}`));
}
