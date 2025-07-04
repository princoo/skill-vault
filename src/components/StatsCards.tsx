import type React from "react";
import { FaBook, FaCheckCircle, FaClock, FaTasks } from "react-icons/fa";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
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

export function StatsCards() {
  // am using this just for the design i will be fetching this data from the api
  const stats = [
    {
      title: "Total Skills",
      value: 12, // am using this just for the design i will be fetching this data from the api
      icon: FaBook,
      color: "bg-blue",
    },
    {
      title: "Completed",
      value: 7, // am using this just for the design i will be fetching this data from the api
      icon: FaCheckCircle,
      color: "bg-green",
    },
    {
      title: "In Progress",
      value: 5, // am using this just for the design i will be fetching this data from the api
      icon: FaClock,
      color: "bg-yellow",
    },
    {
      title: "Total Tasks",
      value: 47, // am using this just for the design i will be fetching this data from the api
      icon: FaTasks,
      color: "bg-purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
