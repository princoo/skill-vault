"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { SideBar } from "@/components/SideBar";
import clsx from "clsx";

interface LearningObjective {
  id: string;
  title: string;
  completed: boolean;
}

export default function SkillOverviewPage({
  params,
}: {
  params: Promise<{ skill: string }>;
}) {
  const { skill } = use(params);
  const [objectives, setObjectives] = useState<LearningObjective[]>([
    {
      id: "1",
      title: "Understand React fundamentals and JSX syntax",
      completed: true,
    },
    {
      id: "2",
      title: "Master React hooks (useState, useEffect, useContext)",
      completed: true,
    },
    {
      id: "3",
      title: "Implement state management with Redux or Context API",
      completed: false,
    },
    {
      id: "4",
      title: "Build responsive components with modern CSS",
      completed: false,
    },
  ]);

  const toggleObjective = (id: string) => {
    setObjectives((prev) =>
      prev.map((obj) =>
        obj.id === id ? { ...obj, completed: !obj.completed } : obj
      )
    );
  };

  const completedCount = objectives.filter((obj) => obj.completed).length;
  const progressPercentage = (completedCount / objectives.length) * 100;

  return (
    <div className="flex h-screen bg-slate-900">
      <SideBar activeItem="dashboard" />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/vault"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaArrowLeft />
            </Link>
            <nav className="text-sm">
              <Link href="/vault" className="text-gray-400 hover:text-white">
                Skills
              </Link>
              <span className="text-gray-500 mx-2">›</span>
              <span className="text-white">React.js Development</span>
            </nav>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-white text-3xl font-bold mb-2">
                React.js Development
              </h1>
              <p className="text-gray-400 text-lg mb-4 max-w-3xl">
                Master modern React.js development including hooks, state
                management, component architecture, and best practices for
                building scalable web applications.
              </p>
              <div className="flex items-center space-x-4">
                <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  In Progress
                </span>
                <span className="text-gray-400 text-sm">
                  Started: March 15, 2024
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200">
                <FaEdit className="text-sm" />
                <span>Edit</span>
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200">
                <FaTrash className="text-sm" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
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

        {/* Main Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Learning Objectives */}
            <div className="lg:col-span-2">
              <h2 className="text-white text-xl font-semibold mb-6">
                Learning Objectives
              </h2>
              <div className="space-y-4">
                {objectives.map((objective) => (
                  <div
                    key={objective.id}
                    className="flex items-start space-x-4 p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors duration-200"
                  >
                    <button
                      onClick={() => toggleObjective(objective.id)}
                      className={clsx(
                        "w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200",
                        objective.completed
                          ? "bg-green-600 text-white"
                          : "border-2 border-gray-400 text-gray-400 hover:border-gray-300"
                      )}
                    >
                      {objective.completed ? (
                        <FaCheck className="text-xs" />
                      ) : (
                        <FaCircle className="text-xs opacity-0" />
                      )}
                    </button>
                    <p
                      className={clsx(
                        "flex-1 font-medium",
                        objective.completed
                          ? "text-gray-400 line-through"
                          : "text-white"
                      )}
                    >
                      {objective.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Sidebar */}
            <div className="space-y-6">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Progress
                </h3>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">
                      Overall Progress
                    </span>
                    <span className="text-white text-sm font-medium">
                      {Math.round(progressPercentage)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-indigo-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Tasks Completed</span>
                    <span className="text-white font-medium">8/12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Reflections</span>
                    <span className="text-white font-medium">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Time Invested</span>
                    <span className="text-white font-medium">42 hours</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white text-sm">
                        Completed &quot;Build Todo App&quot;
                      </p>
                      <p className="text-gray-400 text-xs">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-white text-sm">
                        Added reflection entry
                      </p>
                      <p className="text-gray-400 text-xs">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
