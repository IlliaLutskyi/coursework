import { transporter } from "@/lib/nodemailer";
import { User } from "@/models/user";
import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function sendVerificationEmail({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  try {
    const token = JWT.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });
    const link = `http://localhost:3000/verify?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verification Link",
      html: `<p>Click here to proceed verification process: <a href="${link}">proceed</a></p>`,
    });
    await User.findByIdAndUpdate(userId, {
      verificationToken: token,
    });
    return;
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Email sending error" },
      { status: 500 }
    );
  }
}
