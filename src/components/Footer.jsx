import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="flex min-h-[77px] items-center justify-center gap-4 border-t-2 bg-gradient p-2 text-primary-foreground">
      <Logo />
      <h3 className="text-center text-lg font-semibold text-foreground">
        SE ACADEMY
      </h3>
      <div className="h-full border border-accent-foreground"></div>
      <p className="text-center text-xs text-foreground">
        {/* Learn, Practice, and Grow */}
        Software can change the world.
      </p>
      <div className="h-full border border-accent-foreground"></div>
      <p>&copy; 2024 SE Academy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
