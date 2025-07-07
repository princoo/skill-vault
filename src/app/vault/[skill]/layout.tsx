import SkillTabs from "@/components/SkillTabs";
import { getSkillById } from "@/lib/data/skills";
import { getStartedAgo } from "@/lib/utils/dateUtils";
import { getSkillStatus } from "@/lib/utils/skill";
import { FaEdit, FaTrash } from "react-icons/fa";

export default async function SkillLayout({
  params,
  children,
}: {
  params: Promise<{ skill: string }>;
  children: React.ReactNode;
}) {
  const { skill } = await params;
  const res = await getSkillById(skill);
  const skillData = res.data;
  return (
    <div className="flex h-screen bg-slate-900">
      <div className="flex-1">
        <header className="bg-slate-800 border-b border-slate-700 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-white text-3xl font-bold mb-2">
                {skillData.title}
              </h1>
              <p className="text-gray-400 text-lg mb-4 max-w-3xl">
                {skillData.description}
              </p>
              <div className="flex items-center space-x-4">
                <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  {getSkillStatus(skillData)}
                </span>
                <span className="text-gray-400 text-sm">
                  {getStartedAgo(skillData.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200">
                <FaEdit className="text-sm" />
                <span>Edit</span>
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200">
                <FaTrash className="text-sm" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </header>

        {/* nav */}
        <SkillTabs skill={skill} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
