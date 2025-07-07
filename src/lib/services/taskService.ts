import { prisma } from "../db";
import { CreateTaskPayload } from "@/types/task";

export async function createTask(data: CreateTaskPayload) {
  const skill = await prisma.task.create({ data });
  return skill;
}
export async function removeTask(id: string) {
  const skill = await prisma.task.delete({ where: { id } });
  return skill;
}
