/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
    // id: string;
    fullName: string;
  }

  interface Session {
    user: {
      fullName: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fullName: string;
  }
}