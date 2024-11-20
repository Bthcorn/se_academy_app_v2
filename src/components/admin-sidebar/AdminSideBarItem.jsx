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
                  ? "bg-muted text-primary-foreground border-l-4 border-pink-500" // Dark mode active state
                  : "bg-light-accent text-light-foreground border-l-4 border-[#ff3bb2]" // Light mode active state
              }`
            : `${
                darkMode
                  ? "text-secondary-foreground hover:bg-muted hover:text-white" // Dark mode hover state
                  : "text-light-foreground hover:bg-light-accent hover:text-black" // Light mode hover state
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
