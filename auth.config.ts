/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserByEmail } from "@/lib/services/userService";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations/auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },

    async session({ session }) {
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // 1. Validate credentials
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        // 2. Find the user
        const user = await getUserByEmail(email);
        if (!user) return null;

        // 3. Verify password
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;

        // 4. Return the user
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
