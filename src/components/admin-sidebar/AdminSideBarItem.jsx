import React from "react";
import { NavLink } from "react-router-dom";

const AdminSideBarItem = ({ icon, label, href }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) => {
        return `hover:bg-muted hover:text-primary-foreground flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
          isActive
            ? "bg-muted text-primary-foreground border-l-4 border-pink-500" // Pink bar on the left when active
            : "text-muted-foreground"
        }`;
      }}
    >
      {icon}
      {label}
    </NavLink>
  );
};

export default AdminSideBarItem;
