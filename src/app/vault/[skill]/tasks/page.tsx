import { getSkillById } from "@/lib/data/skills";
import TaskList from "@/components/TaskList";
import AddTaskForm from "@/components/AddTaskForm";

export default async function SkillTasksPage({
  params,
}: {
  params: Promise<{ skill: string }>;
}) {
  const { skill } = await params;
  const res = await getSkillById(skill);
  const skillData = res.data;
  return (
    <main className="p-6 space-y-8">
      <section>
        <div>
          <h2 className="text-white text-xl font-semibold">Tasks</h2>
        </div>
        <AddTaskForm skillId={skill}/>
        <TaskList tasks={skillData.tasks} />
      </section>
    </main>
  );
}
