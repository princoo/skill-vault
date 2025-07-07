"use client";

import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

export default function LogoutAction() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center space-x-2 text-gray-text hover:text-white"
    >
      <FaSignOutAlt className="text-sm" />
      <span className="text-sm">Logout</span>
    </button>
  );
}
