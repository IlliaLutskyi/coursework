"use server";
import mongoose from "mongoose";

export default async function connectDb() {
  const MONGODB_URI: string = process.env.MONGODB_URI as string;
  if (mongoose.connections[0].readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.error("DB error:", err);
  }
}
