import React from "react";
import Logo from "../Logo";
import Button from "../Button";
import SideBarContent from "./AdminSideBarContent";
import { Search } from "lucide-react";

const AdminSideBar = ({ open, toggle }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 h-full w-64 flex-col bg-[#0F172A] shadow-lg transition ${open ? "animate-in slide-in-from-left duration-500 md:block" : "animate-out slide-out-to-left hidden duration-300"}`}
    >
      <div className="bg-secondary flex h-full flex-col overflow-y-auto border-r shadow-sm">
        {/* Logo Section */}
        <div className="flex h-16 items-center justify-between px-4 lg:h-[60px] lg:px-6">
          <div className="inline-flex items-center">
            <Logo />
            <p className="ml-2 text-lg font-semibold text-white">SE Academy</p>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center rounded-md bg-[#1E293B]">
            <Search size={18} className="mx-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for..."
              className="w-full bg-[#1E293B] p-2 text-white placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        <div className="mt-2 grid lg:mt-4">
          <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
            <SideBarContent />
          </nav>
        </div>

        <div className="mt-auto border-t border-gray-700 px-4 py-4">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src="https://avatar.iran.liara.run/public/42"
              alt="User Avatar"
            />
            <div className="ml-3">
              <p className="text-white">John Carter</p>
              <p className="text-sm text-gray-400">Account settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
