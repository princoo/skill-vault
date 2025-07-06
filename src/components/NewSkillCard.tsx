import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";

export default function NewSkillCard() {
  return (
    <Link href="/vault/add">
      <div className="bg-foreground border border-gray/50 rounded-lg p-6 border-dashed hover:border-gray cursor-pointer">
        <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
          <div className="w-12 h-12 bg-gray rounded-lg flex items-center justify-center mb-4">
            <FaPlus className="text-gray-text text-xl" />
          </div>
          <h3 className="text-white font-semibold mb-2">Add New Skill</h3>
          <p className="text-gray-text text-sm">
            Start tracking a new learning goal
          </p>
        </div>
      </div>
    </Link>
  );
}
