"use client";

import Link from "next/link";
import {
  FaBookOpen,
  FaHome,
  FaPlus,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import clsx from "clsx";

interface SidebarProps {
  activeItem?: string;
}

export function SideBar({ activeItem = "dashboard" }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FaHome, href: "/vault" },
    { id: "add-skill", label: "Add Skill", icon: FaPlus, href: "/vault/add" },
    { id: "profile", label: "Profile", icon: FaUser, href: "/vault/profile" },
    { id: "settings", label: "Settings", icon: FaCog, href: "/vault/settings" },
  ];

  return (
    <div className="w-64 bg-foreground border-r border-gray flex flex-col h-screen">
      <div className="p-6 border-b border-gray">
        {" "}
        {/* the logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue rounded-lg flex items-center justify-center">
            <FaBookOpen className="text-white text-sm" />
          </div>
          <span className="text-white font-semibold text-lg">SkillVault</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        {" "}
        {/* this is the navigation */}
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={clsx(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200",
                  activeItem === item.id
                    ? "bg-blue text-white"
                    : "text-gray-text hover:bg-gray hover:text-white"
                )}
              >
                <item.icon className="text-sm" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray">
        {/* profile of the bottom user */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
            <FaUser className="text-gray-text text-sm" />
          </div>
          <div>
            <p className="text-white font-medium">John Doe</p>
            <p className="text-gray-text text-sm">Developer</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 text-gray-text hover:text-white">
          <FaSignOutAlt className="text-sm" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
