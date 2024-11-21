import React from "react";
import Logo from "./Logo";
import SideBarContent from "./sidebar/SideBarContent";
import Button from "./Button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ toggle }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between text-white lg:h-[60px]">
        <div className="inline-flex">
          <Link to="/" className="inline-flex">
            <Logo />
            <div className="hidden md:flex">
              <p className="ml-4 text-lg font-semibold">SE ACADEMY</p>
            </div>
          </Link>
        </div>
        <div className="hidden gap-x-2 lg:flex">
          <SideBarContent />
        </div>
        <div className="flex lg:hidden">
          <Button
            label={<Menu size={24} />}
            onClick={toggle}
            variant="ghost"
            size={"icon"}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
