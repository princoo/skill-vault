import { Status } from "@/enum/skill";
import { totalCompletedSkillTasks } from "@/lib/utils/skill";
import { Skill } from "@/types/skills";
import clsx from "clsx";
import React from "react";

export default function SkillCardProgressBar({ skill }: { skill: Skill }) {
  const tasksCompleted = totalCompletedSkillTasks(skill);
  const totalTasks = skill.tasks.length;
  const progressPercentage =
    totalTasks === 0 ? 0 : (tasksCompleted / totalTasks) * 100;
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-text text-sm">Progress</span>
        <span className="text-white text-sm font-medium">
          {tasksCompleted}/{skill.tasks.length} tasks
        </span>
      </div>
      <div className="w-full bg-gray rounded-full h-2">
        <div
          className={clsx(
            "h-2 rounded-full transition-all duration-300",
            skill.status === Status.COMPLETED ? "bg-green" : "bg-blue"
          )}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
