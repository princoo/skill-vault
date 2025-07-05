"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaPlus,
  FaSmile,
  FaMeh,
  FaFrown,
} from "react-icons/fa";
import { SideBar } from "@/components/SideBar";
import clsx from "clsx";

interface Reflection {
  id: string;
  content: string;
  mood: "happy" | "neutral" | "sad";
  timestamp: string;
  tags?: string[];
}

export default function SkillReflectionPage({
  params,
}: {
  params: Promise<{ skill: string }>;
}) {
  const { skill } = use(params);
  const [reflections, setReflections] = useState<Reflection[]>([
    {
      id: "1",
      content:
        "Finally understood how closures work! The concept of lexical scoping makes so much more sense now. I was able to implement a counter function using closures and I felt like a breakthrough moment. This is definitely one of those concepts that clicks once you see it in action.",
      mood: "happy",
      timestamp: "Dec 16, 2024 • 2:30 PM",
      tags: ["breakthrough", "closures", "understanding"],
    },
    {
      id: "2",
      content:
        "Prototype chain is still confusing. Need to practice more with examples. The relationship between __proto__ and prototype property needs more clarification. I think I need to build more examples to really grasp this concept.",
      mood: "neutral",
      timestamp: "Dec 14, 2024 • 4:15 PM",
      tags: ["prototypes", "confusion", "practice-needed"],
    },
    {
      id: "3",
      content:
        "Struggled with async/await today. The concept makes sense but implementing it in real scenarios is challenging. I keep getting confused about when to use Promise.all vs Promise.allSettled. Need more practice with error handling in async functions.",
      mood: "sad",
      timestamp: "Dec 12, 2024 • 6:45 PM",
      tags: ["async-await", "promises", "error-handling"],
    },
  ]);

  const [newReflection, setNewReflection] = useState("");
  const [selectedMood, setSelectedMood] = useState<"happy" | "neutral" | "sad">(
    "happy"
  );
  const [newTags, setNewTags] = useState("");

  const addReflection = () => {
    if (newReflection.trim()) {
      const reflection: Reflection = {
        id: Date.now().toString(),
        content: newReflection,
        mood: selectedMood,
        timestamp:
          new Date().toLocaleDateString() +
          " • " +
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        tags: newTags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      };
      setReflections((prev) => [reflection, ...prev]);
      setNewReflection("");
      setNewTags("");
    }
  };

  const getMoodIcon = (mood: "happy" | "neutral" | "sad") => {
    switch (mood) {
      case "happy":
        return <FaSmile className="text-green-400" />;
      case "neutral":
        return <FaMeh className="text-yellow-400" />;
      case "sad":
        return <FaFrown className="text-red-400" />;
    }
  };

  const getMoodColor = (mood: "happy" | "neutral" | "sad") => {
    switch (mood) {
      case "happy":
        return "border-l-green-400";
      case "neutral":
        return "border-l-yellow-400";
      case "sad":
        return "border-l-red-400";
    }
  };

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
              <span className="text-white">JavaScript Advanced Concepts</span>
            </nav>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-white text-3xl font-bold mb-2">
                JavaScript Advanced Concepts
              </h1>
              <p className="text-gray-400 text-lg mb-4 max-w-3xl">
                Master advanced JavaScript concepts including closures,
                prototypes, event/loop, async/await, and modern ES6+ features.
              </p>
              <div className="flex items-center space-x-4">
                <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  In Progress
                </span>
                <span className="text-gray-400 text-sm">
                  Started 3 weeks ago
                </span>
                <span className="text-gray-400 text-sm">65% complete</span>
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
                className="py-4 px-1 border-b-2 border-transparent text-gray-400 hover:text-white font-medium text-sm transition-colors duration-200"
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
                className="py-4 px-1 border-b-2 border-indigo-500 text-indigo-400 font-medium text-sm"
              >
                Reflection
              </Link>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="p-6 max-w-4xl mx-auto">
          {/* Add New Reflection */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-semibold">
                Learning Reflections
              </h2>
              <button
                onClick={addReflection}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
              >
                <FaPlus className="text-sm" />
                <span>Add Reflection</span>
              </button>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <textarea
                value={newReflection}
                onChange={(e) => setNewReflection(e.target.value)}
                placeholder="Share your thoughts, insights, challenges, or breakthroughs about your learning journey..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={6}
              />

              <div className="mt-4">
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Add tags (comma separated): breakthrough, concepts, practice..."
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">
                    How are you feeling?
                  </span>
                  <div className="flex items-center space-x-2">
                    {(["happy", "neutral", "sad"] as const).map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={clsx(
                          "w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200",
                          selectedMood === mood
                            ? "bg-slate-600 ring-2 ring-indigo-500"
                            : "hover:bg-slate-700"
                        )}
                      >
                        {getMoodIcon(mood)}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={addReflection}
                  disabled={!newReflection.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Save Reflection
                </button>
              </div>
            </div>
          </section>

          {/* Reflections List */}
          <section>
            <div className="space-y-6">
              {reflections.map((reflection) => (
                <article
                  key={reflection.id}
                  className={clsx(
                    "bg-slate-800 border border-slate-700 rounded-lg p-6 border-l-4",
                    getMoodColor(reflection.mood)
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                        {getMoodIcon(reflection.mood)}
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">
                          {reflection.timestamp}
                        </span>
                        {reflection.tags && reflection.tags.length > 0 && (
                          <div className="flex items-center space-x-2 mt-1">
                            {reflection.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-white transition-colors duration-200">
                        <FaEdit className="text-sm" />
                      </button>
                      <button className="text-gray-400 hover:text-red-400 transition-colors duration-200">
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {reflection.content}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
