import React from "react";

export default function ProgressBar({
  progressPercentage,
}: {
  progressPercentage: number;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">Overall Progress</span>
        <span className="text-white text-sm font-medium">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-3">
        <div
          className="bg-blue h-3 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
