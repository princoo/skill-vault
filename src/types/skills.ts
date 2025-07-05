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
