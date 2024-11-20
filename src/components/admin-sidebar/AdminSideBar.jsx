import React from "react";
import Logo from "../Logo";
import SideBarContent from "./AdminSideBarContent";
import { useTheme } from "../ThemeContext"; // Import ThemeContext hook
import { Link } from "react-router-dom";

const AdminSideBar = ({ open, toggle }) => {
  const { darkMode } = useTheme(); // Access the theme state from ThemeContext

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 h-full w-64 flex-col shadow-lg transition ${
        open
          ? "duration-500 animate-in slide-in-from-left md:block"
          : "hidden duration-300 animate-out slide-out-to-left"
      } ${
        darkMode
          ? "bg-secondary text-secondary-foreground"
          : "bg-light-background text-light-foreground"
      }`} // Use Tailwind-configured colors
    >
      <div className="flex h-full flex-col overflow-y-auto border-r shadow-sm">
        {/* Logo Section */}
        <div
          className={`flex h-16 items-center justify-between px-4 lg:h-[60px] lg:px-6 ${
            darkMode ? "bg-secondary" : "bg-light-background"
          }`}
        >
          <div className="inline-flex items-center">
            <Logo />
            <p className="ml-2 text-lg font-semibold">SE Academy</p>
          </div>
        </div>

        <div className="p-4">
          <hr
            className={`my-4 ${
              darkMode ? "border-secondary-foreground" : "border-light-border"
            }`}
          />
        </div>

        {/* Sidebar Content */}
        <div className="mt-2 grid lg:mt-4">
          <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
            <SideBarContent />
          </nav>
        </div>

        {/* Footer Section */}
        <div
          className={`mt-auto border-t px-4 py-4 ${
            darkMode ? "border-secondary-foreground" : "border-light-border"
          }`}
        >
          <Link to="/profile">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full"
                src="https://avatar.iran.liara.run/public/42"
                alt="User Avatar"
              />
              <div className="ml-3">
                <p>Profile</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
