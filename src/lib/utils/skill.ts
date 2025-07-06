import { Status } from "@/enum/skill";
import { Skill } from "@/types/skills";

export const totalSkills = (skills: Skill[]) => {
  return skills.length;
};
export const totalSkillsCompleted = (skills: Skill[]) => {
  return skills.filter((skill) => skill.status === Status.COMPLETED).length;
};
export const totalSkillsInProgress = (skills: Skill[]) => {
  return skills.filter((skill) => skill.status === Status.IN_PROGRESS).length;
};
export const totalSkillsTasks = (skills: Skill[]) => {
  return skills.flatMap((skill) => skill.tasks ?? []).length;
};
export const totalSkillTasks = (skill: Skill) => {
  return skill.tasks.length;
};
export const totalCompletedSkillTasks = (skill: Skill) => {
  return skill.tasks.filter((task) => task.completed).length;
};
export const getSkillStatus = (skill: Skill) => {
  return skill.status === Status.COMPLETED ? "Completed" : skill.status === Status.IN_PROGRESS ? "In Progress" : "Not Started";
};
