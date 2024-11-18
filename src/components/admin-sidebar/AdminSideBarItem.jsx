import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Import ThemeContext

const AdminSideBarItem = ({ icon, label, href }) => {
  const { darkMode } = useTheme(); // Access the dark mode state

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
          isActive
            ? `${
                darkMode
                  ? "bg-muted text-primary-foreground border-l-4 border-pink-500"
                  : "bg-yellow-600 text-light-foreground border-l-4 border-green-500"
              }`
            : `${
                darkMode
                  ? "text-secondary-foreground hover:bg-secondary hover:text-white"
                  : "text-light-foreground hover:bg-light-background hover:text-black"
              }`
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default AdminSideBarItem;
