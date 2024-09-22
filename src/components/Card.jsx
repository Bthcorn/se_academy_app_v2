import { BookOpen } from "lucide-react";
import React from "react";

const Card = ({ bg, children, ...props }) => {
  return (
    <a>
      <div
        className={`bg-secondary ${bg} w-60 rounded-md border border-border px-4 py-2`}
        {...props}
      >
        <div className="relative mt-2 aspect-auto w-full overflow-hidden rounded-md object-cover">
          <img
            src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&q=80"
            alt="test"
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="line-clamp-2 text-lg font-medium transition group-hover:text-accent-foreground md:text-base">
            Title
          </div>
          <p className="text-xs text-muted-foreground">Category</p>
          <p className="text-xs text-muted-foreground">Lecturer</p>

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-card-foreground">
              <BookOpen size={16} />
              <span>10 Chapters</span>
            </div>
          </div>
        </div>

        {children}
      </div>
    </a>
  );
};

export default Card;
