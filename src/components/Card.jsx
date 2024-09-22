import { BookOpen, Star } from "lucide-react";
import React from "react";
import Button from "./Button";

const Card = () => {
  return (
    <div className="group flex max-h-64 w-full rounded-md bg-secondary-color4/50 px-2 py-2 backdrop-blur duration-200 hover:scale-105 hover:shadow-md sm:h-auto sm:max-h-none sm:w-64 sm:flex-col sm:px-4">
      <div className="relative m-2 flex w-full sm:m-0 sm:mt-2 sm:flex-none">
        <img
          src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&q=80"
          alt="test"
          className="aspect-video overflow-hidden rounded-md object-cover"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-start sm:pt-2">
        <div className="line-clamp-2 w-full text-lg font-medium transition group-hover:text-primary sm:min-w-16 md:text-base">
          Title
        </div>
        <p className="text-xs text-muted-foreground">Category</p>
        {/* rate */}
        <div className="flex items-center gap-x-1 text-xs text-card-foreground">
          <Star size={16} />
          <span>4.5</span>
        </div>

        <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
          Duration: 2h 30m
        </div>

        <p className="text-xs text-muted-foreground">Lecturer: </p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-card-foreground">
            <BookOpen size={16} />
            <span>10 Chapters</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <Button label="Enroll" variant="primary" size="sm" />
        </div>
      </div>
    </div>
  );
};

export default Card;
