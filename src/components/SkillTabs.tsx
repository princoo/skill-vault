import Link from "next/link";
import React from "react";

export default function SkillTabs({ skill }: { skill: string }) {
  return (
    <div className="bg-slate-800 border-b border-slate-700">
      <nav className="px-6">
        <div className="flex space-x-8">
          <Link
            href={`/vault/${skill}`}
            className="py-4 px-1 border-b-2 border-indigo-500 text-indigo-400 font-medium text-sm"
          >
            Overview
          </Link>
          <Link
            href={`/vault/${skill}/tasks`}
            className="py-4 px-1 border-b-2 border-transparent text-gray-400 hover:text-white font-medium text-sm transition-colors duration-200"
          >
            Tasks
          </Link>
          <Link
            href={`/vault/${skill}/reflection`}
            className="py-4 px-1 border-b-2 border-transparent text-gray-400 hover:text-white font-medium text-sm transition-colors duration-200"
          >
            Reflection
          </Link>
        </div>
      </nav>
    </div>
  );
}
