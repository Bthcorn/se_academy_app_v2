import { Calculator } from "lucide-react";
import React from "react";

const CategoryCard = ({ icon, title, number }) => {
  return (
    <div className="group flex w-full items-center justify-between gap-2 rounded-md bg-secondary p-2 duration-200 hover:scale-105 hover:bg-secondary-color4 sm:min-h-48 sm:w-48 sm:flex-col sm:p-4">
      <div className="inline-flex items-center sm:flex sm:flex-col">
        <Calculator className="mr-2 size-6 sm:mr-0 sm:size-[60px]" />
        <h3 className="text-center text-base font-semibold text-foreground md:text-lg">
          Mathematice Courses
        </h3>
      </div>
      <span className="rounded-md bg-secondary-color4 p-2 text-xs text-accent-foreground group-hover:bg-secondary">
        10 Courses
      </span>
    </div>
  );
};

export default CategoryCard;
