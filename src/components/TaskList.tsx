import { Task } from "@/types/skills";
import clsx from "clsx";
import React from "react";
import { FaCheck, FaCircle, FaEdit, FaTrash } from "react-icons/fa";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center space-x-4 p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors duration-200"
        >
          <button
            // onClick={() => toggleTask(task.id)}
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
              task.completed ? "text-gray-400 line-through" : "text-white"
            )}
          >
            {task.name}
          </p>
          <span className="text-gray-400 text-sm">Due: {task.dueDate}</span>
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
  );
}
