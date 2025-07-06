import { SideBar } from "@/components/SideBar";
import React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideBar activeItem="dashboard" />
      <div className="flex-1 overflow-auto">
        <header className="bg-foreground border-b border-gray p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-text mt-1">
                Track your learning progress
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                {" "}
                {/* search input */}
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-text text-sm" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  className="bg-gray border border-gray-500 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-text"
                />
              </div>
              {/* new skill button */}
              <button className="bg-blue hover:bg-blue/80 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                <FaPlus className="text-sm" />
                <span>Add Skill</span>
              </button>
            </div>
          </div>
        </header>
        <main className="p-6 space-y-8">{children}</main>
      </div>
    </div>
  );
}
