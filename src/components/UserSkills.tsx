import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { SkillCard } from "./SkillCard";

export default function UserSkills() {
  const skills = [
    {
      id: "1",
      title: "React Advanced",
      category: "Frontend Development",
      progress: { completed: 7, total: 10 },
      status: "In Progress" as const,
      lastActivity: "Started 3 weeks ago",
    },
  ];
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-semibold">Your Skills</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm">All Categories</span>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            <FaChevronDown className="text-sm" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <SkillCard key={index} {...skill} />
        ))}
        <SkillCard
          id="add-skill"
          title=""
          category=""
          progress={{ completed: 0, total: 0 }}
          status="In Progress"
          lastActivity=""
          isAddCard={true}
        />
      </div>
    </section>
  );
}
