import React from "react";
import { LayoutGrid, User, BookOpen, BarChart, Sun, Moon } from "lucide-react";
import SideBarItem from "./AdminSideBarItem";
import { useTheme } from "../ThemeContext";

const AdminSideBarContent = () => {
  const { darkMode, setDarkMode } = useTheme(); // Use ThemeContext to manage darkMode

  const items = [
    {
      icon: <LayoutGrid size={24} />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: <User size={24} />,
      label: "Users",
      href: "/admin/users",
    },
    {
      icon: <BookOpen size={24} />,
      label: "Courses",
      href: "/admin/courses",
    },
    {
      icon: <BarChart size={24} />,
      label: "Leaderboard",
      href: "/admin/leaderboard",
    },
  ];

  return (
    <div
      className={`flex flex-col space-y-4 ${
        darkMode ? "text-secondary-foreground" : "text-light-foreground"
      }`} // Dynamically change text color
    >
      {/* Upper section without a divider */}
      {items.map((item) => (
        <SideBarItem key={item.label} {...item} />
      ))}

      {/* Divider */}
      <hr
        className={`my-4 ${
          darkMode ? "border-secondary-foreground" : "border-light-border"
        }`} // Change divider color dynamically
      />

      {/* Theme Toggle Section */}
      <div className="flex items-center justify-center">
        <label className="relative inline-block w-16 h-8">
          <input
            type="checkbox"
            checked={!darkMode}
            onChange={() => setDarkMode(!darkMode)} // Toggle theme using context
            className="peer sr-only"
          />
          {/* Background */}
          <span className="absolute inset-0 rounded-full bg-purple-600 peer-checked:bg-yellow-600 transition-all"></span>
          {/* Toggle Circle */}
          <span className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white flex items-center justify-center transition-all peer-checked:left-9">
            {darkMode ? (
              <Moon size={16} className="text-purple-600" />
            ) : (
              <Sun size={16} className="text-yellow-400" />
            )}
          </span>
        </label>
      </div>
    </div>
  );
};

export default AdminSideBarContent;
