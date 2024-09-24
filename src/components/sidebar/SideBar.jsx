import React from "react";
import Logo from "../Logo";
import Button from "../Button";
import SideBarContent from "./SideBarContent";
import { X } from "lucide-react";
import("tailwindcss-animate");

const SideBar = ({ open, toggle }) => {
  // const [isOpen, setIsOpen] = React.useState(open);
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 h-full w-3/4 flex-col shadow-lg transition ${open ? "duration-500 animate-in slide-in-from-left md:block" : "hidden duration-300 animate-out slide-out-to-left"}`}
    >
      <div className="flex h-full flex-col overflow-y-auto border-r bg-secondary shadow-sm">
        <div className="flex h-14 items-center justify-between px-4 lg:h-[60px] lg:px-6">
          <div className="inline-flex">
            <Logo />
            <p className="ml-2 text-lg font-semibold">SE ACADEMY</p>
          </div>
          <Button
            label={<X size={24} />}
            onClick={toggle}
            variant={"ghost"}
            size={"icon"}
          />
        </div>
        <div className="mt-2 grid lg:mt-4">
          <nav className="grid items-start gap-2 space-y-4 px-2 text-sm font-medium lg:px-4">
            <SideBarContent />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
