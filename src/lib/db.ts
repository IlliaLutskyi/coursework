"use server";
import mongoose from "mongoose";

export default async function connectDb() {
  const MONGODB_URI: string = process.env.MONGODB_URI as string;
  if (mongoose.connections[0].readyState === 1) {
    console.log("You was already connected");
    return;
  }
  try {
    const db = await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.log("Hekngvjienorignierngiuerngiernignueuirbguiebrguienrubg");
    console.log("DB error:", err);
  }
}
