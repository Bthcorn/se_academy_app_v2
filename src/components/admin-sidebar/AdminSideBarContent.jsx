import React from "react";
import {
  LayoutGrid,
  User,
  MessageSquare,
  BookOpen,
  BarChart,
  Sliders,
  Brush,
} from "lucide-react";
import SideBarItem from "./AdminSideBarItem";

const AdminSideBarContent = () => {
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
    {
      icon: <MessageSquare size={24} />,
      label: "Feedback",
      href: "/admin/feedback",
    },
  ];

  const lowerItems = [
    {
      icon: <Sliders size={24} />,
      label: "Settings",
      href: "/admin/settings",
    },
    {
      icon: <Brush size={24} />,
      label: "Themes",
      href: "/admin/themes",
    },
  ];

  return (
    <div className="flex flex-col space-y-4">
      {/* Upper section without a divider */}
      {items.map((item) => (
        <SideBarItem key={item.label} {...item} />
      ))}

      {/* Divider */}
      <hr className="my-4 border-t border-gray-700" />

      {/* Lower section with a divider */}
      {lowerItems.map((item) => (
        <SideBarItem key={item.label} {...item} />
      ))}
    </div>
  );
};

export default AdminSideBarContent;
