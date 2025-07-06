import { Mood } from "@/enum/reflection";
import { Category, Status } from "@/enum/skill";

export interface SkillCardProps {
  id: string;
  title: string;
  category: string;
  progress: {
    completed: number;
    total: number;
  };
  status: "In Progress" | "Completed";
  lastActivity: string;
  isAddCard?: boolean;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: Status;
  userId: string;
  tasks: Task[];
  reflections: Reflection[];
  createdAt: string;
  updatedAt: string;
}
export interface Task {
  id: string;
  name: string;
  dueDate: string;
  completed: boolean;
  skillId: Status;
}
export interface Reflection {
  id: string;
  content: string;
  mood: Mood;
  skillId: Status;
}

export interface CreateSkillPayload {
  title: string;
  description: string;
  category: Category;
  status: Status;
  userId: string;
}
