import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  if (req.method.toUpperCase() !== "POST") {
    return NextResponse.json(
      { message: "Method is not valid " },
      { status: 405 }
    );
  }
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }
  const hashPassword = bcrypt.hash(password, 12);
}
