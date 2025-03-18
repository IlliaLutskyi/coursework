import { NextResponse } from "next/server";
import JWT from "jsonwebtoken";
import { User } from "@/models/user";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const token = searchParams.get("token");
  if (!token)
    return NextResponse.json({ message: "Token is missing" }, { status: 400 });
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET as string) as {
      email: string;
    };
    console.log(decoded);
    const user = await User.findOneAndUpdate(
      { email: decoded.email },
      { isVerified: true, verificationToken: "" },
      { new: true }
    );
    console.log(user);
    if (!user) return NextResponse.json({ message: "User was not found" });
    return NextResponse.json({ message: "Verification went successfully" });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Token is incorrect or expired",
      },
      { status: 500 }
    );
  }
}
