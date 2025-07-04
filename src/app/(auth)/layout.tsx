import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - SkillVault",
  description:
    "Sign in or create an account to start tracking your learning journey",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
