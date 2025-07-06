import { CreateSkillPayload } from "@/types/skills";
import { prisma } from "../db";

export async function createSkill(data: CreateSkillPayload) {
  const skill = await prisma.skill.create({ data });
  return skill;
}
export async function getSkillsByUserId(id: string) {
  const skill = await prisma.skill.findMany({
    where: { userId: id },
    include: { tasks: true, reflections: true },
  });
  return skill;
}
export async function getSkillById(id: string) {
  const skill = await prisma.skill.findUnique({
    where: { id },
    include: { tasks: true, reflections: true },
  });
  return skill;
}

export async function removeSkill(id: string) {
  const skill = await prisma.skill.delete({ where: { id } });
  return skill;
}
