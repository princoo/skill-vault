import ProgressBar from "@/components/ProgressBar";
import { getSkillById } from "@/lib/data/skills";
import { totalCompletedSkillTasks } from "@/lib/utils/skill";

export default async function SkillOverviewPage({
  params,
}: {
  params: Promise<{ skill: string }>;
}) {
  const { skill } = await params;
  const res = await getSkillById(skill);
  const skillData = res.data;
  const totalTasks = skillData.tasks.length;
  const completedTasks = totalCompletedSkillTasks(skillData);
  const progressPercentage =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div className="flex-1 overflow-auto">
      <div>
        {/* Progress Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Progress</h3>

            {/* Progress Bar */}
            <ProgressBar progressPercentage={progressPercentage} />

            {/* Stats */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Tasks Completed</span>
                <span className="text-white font-medium">
                  {totalCompletedSkillTasks(skillData)} /{" "}
                  {skillData.tasks.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Reflections</span>
                <span className="text-white font-medium">
                  {skillData.reflections.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
