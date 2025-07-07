import { NextResponse } from "next/server";
import { auth } from "../auth";

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  if (!session) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/vault/:path*"],
};
