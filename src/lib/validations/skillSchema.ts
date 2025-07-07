import { Category } from "@/enum/skill";
import { z } from "zod";

export const createSkillSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.nativeEnum(Category),
});

export const updateSkillSchema = createSkillSchema.partial();
export type SkillFormData = z.infer<typeof createSkillSchema>