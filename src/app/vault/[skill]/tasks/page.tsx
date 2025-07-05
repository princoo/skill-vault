"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaCircle,
  FaArrowLeft,
  FaPlus,
  FaSmile,
  FaMeh,
  FaFrown,
} from "react-icons/fa";
import { SideBar } from "@/components/SideBar";
import clsx from "clsx";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

interface Reflection {
  id: string;
  content: string;
  mood: "happy" | "neutral" | "sad";
  timestamp: string;
}

export default function SkillTasksPage({
  params,
}: {
  params: Promise<{ skill: string }>;
}) {
  const { skill } = use(params);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Learn about Closures",
      completed: true,
      dueDate: "Dec 15, 2024",
    },
    {
      id: "2",
      title: "Understand Prototypal Inheritance",
      completed: false,
      dueDate: "Dec 20, 2024",
    },
    {
      id: "3",
      title: "Master Async/Await Patterns",
      completed: false,
      dueDate: "Dec 25, 2024",
    },
  ]);

  const [reflections, setReflections] = useState<Reflection[]>([
    {
      id: "1",
      content:
        "Finally understood how closures work! The concept of lexical scoping makes so much more sense now. I was able to implement a counter function using closures and I felt like a breakthrough moment.",
      mood: "happy",
      timestamp: "Dec 16, 2024 • 2:30 PM",
    },
    {
      id: "2",
      content:
        "Prototype chain is still confusing. Need to practice more with examples. The relationship between __proto__ and prototype property needs more clarification.",
      mood: "neutral",
      timestamp: "Dec 14, 2024 • 4:15 PM",
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newReflection, setNewReflection] = useState("");
  const [selectedMood, setSelectedMood] = useState<"happy" | "neutral" | "sad">(
    "happy"
  );

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        dueDate: "mm/dd/yyyy",
      };
      setTasks((prev) => [...prev, task]);
      setNewTask("");
    }
  };

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
      };
      setReflections((prev) => [reflection, ...prev]);
      setNewReflection("");
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
                This comprehensive skill covers complex programming patterns and
                best practices for building scalable applications.
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
                className="py-4 px-1 border-b-2 border-indigo-500 text-indigo-400 font-medium text-sm"
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
        <main className="p-6 space-y-8">
          {/* Tasks Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-semibold">Tasks</h2>
              <button
                onClick={addTask}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
              >
                <FaPlus className="text-sm" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Add Task Input */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter task name..."
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === "Enter" && addTask()}
                />
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="w-32 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={addTask}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-4 p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={clsx(
                      "w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200",
                      task.completed
                        ? "bg-green-600 text-white"
                        : "border-2 border-gray-400 text-gray-400 hover:border-gray-300"
                    )}
                  >
                    {task.completed ? (
                      <FaCheck className="text-xs" />
                    ) : (
                      <FaCircle className="text-xs opacity-0" />
                    )}
                  </button>
                  <p
                    className={clsx(
                      "flex-1 font-medium",
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-white"
                    )}
                  >
                    {task.title}
                  </p>
                  <span className="text-gray-400 text-sm">
                    Due: {task.dueDate}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                      <FaEdit className="text-sm" />
                    </button>
                    <button className="text-gray-400 hover:text-red-400 transition-colors duration-200">
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Learning Reflections Section */}
          <section>
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

            {/* Add Reflection */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
              <textarea
                value={newReflection}
                onChange={(e) => setNewReflection(e.target.value)}
                placeholder="Share your thoughts about the learning process..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={4}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">Mood:</span>
                  <div className="flex items-center space-x-2">
                    {(["happy", "neutral", "sad"] as const).map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={clsx(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200",
                          selectedMood === mood
                            ? "bg-slate-600"
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Save Reflection
                </button>
              </div>
            </div>

            {/* Reflections List */}
            <div className="space-y-6">
              {reflections.map((reflection) => (
                <div
                  key={reflection.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                        {getMoodIcon(reflection.mood)}
                      </div>
                      <span className="text-gray-400 text-sm">
                        {reflection.timestamp}
                      </span>
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
                  <p className="text-gray-300 leading-relaxed">
                    {reflection.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
