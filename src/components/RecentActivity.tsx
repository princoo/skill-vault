import { FaCheckCircle, FaPlus, FaEdit } from "react-icons/fa";

interface ActivityItem {
  id: string;
  type: "completed" | "added" | "reflection";
  title: string;
  skill: string;
  timestamp: string;
}

export function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      id: "1", // the is for design purrpose i will be getting this data from an api
      type: "completed",
      title: 'Completed "Build REST API endpoints"',
      skill: "Node.js API",
      timestamp: "2 hours ago",
    },
  ];

  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "completed":
        return <FaCheckCircle className="text-green" />;
      case "added":
        return <FaPlus className="text-blue" />;
      case "reflection":
        return <FaEdit className="text-purple" />;
    }
  };

  return (
    <div className="bg-foreground border border-gray rounded-lg p-6">
      <h2 className="text-white text-xl font-semibold mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gray rounded-lg flex items-center justify-center flex-shrink-0">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{activity.title}</p>
              <p className="text-gray-text text-sm">
                {activity.skill} • {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
