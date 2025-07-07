import { StatsCards } from "@/components/StatsCards";
import UserSkills from "@/components/UserSkills";
import { getUserSkills } from "@/lib/data/skills";

export default async function DashboardPage() {
  const res = await getUserSkills();
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto">
        <main className="p-6 space-y-8">
          <StatsCards skills={res.data}/>
          <UserSkills skills={res.data}/>
        </main>
      </div>
    </div>
  );
}
