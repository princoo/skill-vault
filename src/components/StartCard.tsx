
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}
export default function StartCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
 
    <div className="bg-foreground border border-gray rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-text text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
        >
          <Icon className="text-white text-xl" />
        </div>
      </div>
    </div>
  );
}
