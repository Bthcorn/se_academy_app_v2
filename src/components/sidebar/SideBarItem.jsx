import React from "react";
import { NavLink } from "react-router-dom";

const SideBarItem = ({ icon, label, href }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive, isPending }) => {
        return `flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-muted hover:text-primary-foreground ${isActive ? "bg-muted text-primary-foreground" : "text-muted-foreground"}`;
      }}
    >
      {icon}
      {label}
    </NavLink>
  );
};

export default SideBarItem;
