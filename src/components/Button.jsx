import { Icon } from "lucide-react";
import React from "react";

const Button = ({ label, variant, size, icon, onClick }) => {
  const buttonStyles = {
    primary:
      "bg-primary hover:bg-primary/90 text-primary-foreground border border-border",
    secondary:
      "bg-secondary hover:bg-secondary/70 text-secondary-foreground border border-border",
    "outline-color": "border-2 border-primary text-primary-foreground",
    outline: "border-2 border-foreground text-foreground ",
    gradient: "bg-gradient text-primary-foreground border border-border",
    ghost: "hover:bg-accent hover:text-accent-foreground border border-border",
    link: "text-primary hover:underline",
  };

  const buttonSize = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 py-1",
    icon: "h-10 w-10",
  };

  const style = buttonStyles[variant] || buttonStyles.primary;
  const sizeStyle = buttonSize[size] || buttonSize.default;

  return (
    <button
      className={`${style} inline-flex ${sizeStyle} items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
