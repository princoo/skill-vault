import { FaEdit, FaTrash } from "react-icons/fa";
import clsx from "clsx";
import { SkillCardProps } from "@/types/skills";
import NewSkillCard from "./NewSkillCard";

export function SkillCard({
  title,
  category,
  progress,
  status,
  lastActivity,
  isAddCard,
}: SkillCardProps) {
  if (isAddCard) {
    return <NewSkillCard />;
  }

  const progressPercentage = (progress.completed / progress.total) * 100;

  return (
    <div className="bg-foreground border border-gray/50 rounded-lg p-6 hover:border-gray">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <p className="text-gray-text text-sm">{category}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-text hover:text-white0">
            <FaEdit className="text-sm" />
          </button>
          <button className="text-gray-text hover:text-red-400">
            <FaTrash className="text-sm" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        {/* progress div */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-text text-sm">Progress</span>
          <span className="text-white text-sm font-medium">
            {progress.completed}/{progress.total} tasks
          </span>
        </div>
        <div className="w-full bg-gray rounded-full h-2">
          <div
            className={clsx(
              "h-2 rounded-full transition-all duration-300",
              status === "Completed" ? "bg-green" : "bg-blue"
            )}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-text text-sm">{lastActivity}</span>
        <span
          className={clsx(
            "px-3 py-1 rounded-full text-xs font-medium",
            status === "Completed"
              ? "bg-green/20 text-green"
              : "bg-yellow/20 text-yellow"
          )}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
