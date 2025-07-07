"use server";
import { LoginFormData } from "@/lib/validations/auth";
import { signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: LoginFormData) {
  try {
    const { email, password } = formData;
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    if (error instanceof AuthError) { // if the errorr are thrown by next-auth
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid email or password",
            success: false,
          };
        case "CallbackRouteError":
          return {
            error: "Invalid email or password",
            success: false,
          };
        default:
          return {
            error: "Something went wrong during authentication",
            success: false,
          };
      }
    }
    return {
      error: "An unexpected error occurred",
      success: false,
    };
  }
}
