import { BookTemplate } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCard = ({ icon, title, number, link }) => {
  return (
    <Link
      to={link}
      className="group flex w-full items-center justify-between gap-2 rounded-md border bg-secondary p-2 duration-200 hover:scale-105 hover:bg-secondary-color4 sm:min-h-48 sm:w-48 sm:flex-col sm:p-4"
    >
      <div className="inline-flex items-center sm:flex sm:flex-col">
        {icon || <BookTemplate size={24} className="text-accent-foreground" />}
        <h3 className="text-center text-base font-semibold text-foreground md:mt-4 md:text-lg">
          {title || "Category"}
        </h3>
      </div>
      <span className="rounded-md bg-secondary-color4 p-2 text-xs text-accent-foreground group-hover:bg-secondary">
        {number} Courses
      </span>
    </Link>
  );
};

export default CategoryCard;
