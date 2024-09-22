import React from "react";
import {
  BoxIcon,
  CircleHelp,
  GalleryVerticalEnd,
  House,
  LibraryBig,
  Send,
  UserCircle2,
} from "lucide-react";
import SideBarItem from "./SideBarItem";

const Item = [
  {
    icon: <House size={24} />,
    label: "Home",
    href: "/",
  },
  {
    icon: <GalleryVerticalEnd size={24} />,
    label: "Courses",
    href: "/courses",
  },
  {
    icon: <LibraryBig size={24} />,
    label: "My Courses",
    href: "/my-courses",
  },
  {
    icon: <CircleHelp size={24} />,
    label: "About",
    href: "/about",
  },
  {
    icon: <Send size={24} />,
    label: "Contact",
    href: "/contact",
  },
  {
    icon: <UserCircle2 size={24} />,
    label: "Profile",
    href: "/profile",
  },
];

const SideBarContent = () => {
  return (
    <>
      {Item.map((item) => (
        <SideBarItem key={item.label} {...item} />
      ))}
    </>
  );
};

export default SideBarContent;
