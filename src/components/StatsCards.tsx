// import { getUserSkills } from "@/lib/data/skills";
import type React from "react";
import { FaBook, FaCheckCircle, FaClock, FaTasks } from "react-icons/fa";
import StartCard from "./StartCard";
import { Skill } from "@/types/skills";
// import { Status } from "@/enum/skill";
import { totalSkills, totalSkillsCompleted, totalSkillsInProgress, totalSkillsTasks } from "@/lib/utils/skill";

export async function StatsCards({skills}:{skills:Skill[]}) {
  // const res = await getUserSkills();
  // const skills: Skill[] = res.data;
  // const totalSkills = skills.length;
  // const completed = skills.filter(
  //   (skill) => skill.status === Status.COMPLETED
  // ).length;
  // const inProgress = skills.filter(
  //   (skill) => skill.status === Status.IN_PROGRESS
  // ).length;
  // const totalTasks = skills.flatMap((skill) => skill.tasks ?? []).length;

  const stats = [
    {
      title: "Total Skills",
      value: totalSkills(skills),
      icon: FaBook,
      color: "bg-blue",
    },
    {
      title: "Completed",
      value: totalSkillsCompleted(skills),
      icon: FaCheckCircle,
      color: "bg-green",
    },
    {
      title: "In Progress",
      value: totalSkillsInProgress(skills),
      icon: FaClock,
      color: "bg-yellow",
    },
    {
      title: "Total Tasks",
      value: totalSkillsTasks(skills),
      icon: FaTasks,
      color: "bg-purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StartCard key={index} {...stat} />
      ))}
    </div>
  );
}
