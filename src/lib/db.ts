"use server";
import mongoose from "mongoose";

export default async function connectDb() {
  if (mongoose.connections[0].readyState === 1) {
    console.log("You was already connected");
    return;
  }
  try {
    const db = await mongoose.connect(
      "mongodb+srv://axax09787:7hGh3x_6JDrw3.V@cluster0.tu9dz.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0"
    );
  } catch (err) {
    console.log("Hekngvjienorignierngiuerngiernignueuirbguiebrguienrubg");
    console.log("DB error:", err);
  }
}
