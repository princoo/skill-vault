"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import clsx from "clsx";
import { Skill } from "@/types/skills";
import Link from "next/link";
import { Status } from "@/enum/skill";
import { getSkillStatus } from "@/lib/utils/skill";
import { getStartedAgo } from "../lib/utils/dateUtils";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SkillCardProgressBar from "./SkillCardProgressBar";

export function SkillCard({ skill }: { skill: Skill }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/skill/${skill.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      const response = await data.json();
      if (response.success) {
        toast.success("Skill deleted successfully!");
        router.refresh();
      } else {
        const errorMessage = response.error || "Failed to delete skill.";
        toast.error(errorMessage);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error deleting skill");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Link href={`/vault/${skill.id}`} className="block">
      <div className="bg-foreground border border-gray/50 rounded-lg p-6 hover:border-gray">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold text-lg">{skill.title}</h3>
            <p className="text-gray-text text-sm">{skill.category}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-text hover:text-white0">
              <FaEdit className="text-sm" />
            </button>
            <button
              onClick={handleDeleteClick}
              className="text-gray-text hover:text-red-400"
            >
              {!isDeleting && <FaTrash className="text-sm" />}
            </button>
          </div>
        </div>
        <SkillCardProgressBar skill={skill} />
        <div className="flex items-center justify-between">
          <span className="text-gray-text text-xs">
            {getStartedAgo(skill.createdAt)}
          </span>
          <span
            className={clsx(
              "px-3 py-1 rounded-full text-xs",
              skill.status === Status.COMPLETED
                ? "bg-green/20 text-green"
                : "bg-yellow/20 text-yellow"
            )}
          >
            {getSkillStatus(skill)}
          </span>
        </div>
      </div>
    </Link>
  );
}
