import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  if (url.pathname === "/signup" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (url.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
export const config = { matcher: ["/signup"] };
