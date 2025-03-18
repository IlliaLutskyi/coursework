import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/models/user";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import connectDb from "@/lib/db";
export async function POST(req: Request) {
  if (req.method.toUpperCase() !== "POST") {
    return NextResponse.json(
      { message: "Method is not valid " },
      { status: 405 }
    );
  }
  try {
    await connectDb();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const exist = await User.findOne({ email });
    if (exist)
      return NextResponse.json(
        { message: "You have been already signed up" },
        { status: 409 }
      );
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashPassword });
    await user.save();
    await sendVerificationEmail({ userId: user.id, email: email });
    return NextResponse.json(
      { message: "You was signed up successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : "Signing up failed",
      },
      { status: 500 }
    );
  }
}
