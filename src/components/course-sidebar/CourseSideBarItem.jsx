import { Lock, Unlock } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const CourseSideBarItem = ({ enrolled, label, href }) => {
  if (!enrolled) {
    return (
      <div className="flex cursor-not-allowed items-center rounded-md px-3 py-2 text-muted-foreground">
        <Lock size={20} className="mr-2" />
        {label}
      </div>
    );
  }

  return (
    <NavLink
      to={href}
      className={({ isActive }) => {
        return `flex items-center rounded-md px-3 py-2 transition-all hover:bg-muted hover:text-primary-foreground ${isActive ? "bg-muted text-primary-foreground" : "text-muted-foreground"} ${enrolled ? "cursor-pointer" : "cursor-not-allowed"}`;
      }}
    >
      <Unlock size={20} className="mr-2" />
      {label}
    </NavLink>
  );
};

export default CourseSideBarItem;
