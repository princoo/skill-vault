/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { createUser, getUserByEmail } from "@/lib/services/userService";
import { RegisterFormData } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";
export async function signup({ name, email, password }: RegisterFormData) {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(email, hashedPassword, name);

    return { success: true, error: null };
  } catch (err: any) {
    return {
      error: `Something went wrong. Please try again ${err.message}`,
      success: false,
    };
  }
}
