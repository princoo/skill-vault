import React from "react";
import { SkillCard } from "./SkillCard";
import { Skill } from "@/types/skills";
import NewSkillCard from "./NewSkillCard";

export default function UserSkills({skills}:{skills:Skill[]}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-semibold">Your Skills</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
        <NewSkillCard />
      </div>
    </section>
  );
}
