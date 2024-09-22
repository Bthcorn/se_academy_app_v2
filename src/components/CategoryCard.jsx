import { Calculator } from "lucide-react";
import React from "react";

const CategoryCard = () => {
  return (
    <div className="group flex min-h-48 w-48 flex-col items-center gap-2 rounded-md bg-secondary p-4 duration-200 hover:scale-105 hover:bg-secondary-color4">
      <Calculator size={60} />
      <h3 className="text-center text-lg font-semibold text-foreground">
        Mathematice Courses
      </h3>
      <span className="rounded-md bg-secondary-color4 p-2 text-xs text-accent-foreground group-hover:bg-secondary">
        10 Courses
      </span>
    </div>
  );
};

export default CategoryCard;
