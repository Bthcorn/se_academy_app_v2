import { BookOpen, MousePointerClick, Star } from "lucide-react";
import Button from "./Button.jsx";
import React from "react";
import { Link } from "react-router-dom";
import Course from "../pages/Course.jsx";

const CourseCard = ({ props, progress, link }) => {
  if (props === undefined) {
    props = {
      title: "Course Title",
      category_list: ["Category"],
      total_duration: 0,
      enrolled: 0,
      lecturer: "Lecturer Name",
      total_video: 0,
    };
  }

  return (
    <div className="group flex h-auto w-full flex-col rounded-md border bg-secondary-color4/50 px-2 py-2 backdrop-blur duration-200 hover:scale-105 hover:shadow-md sm:h-auto sm:max-h-none sm:w-64 sm:px-4 sm:py-4">
      <div className="relative m-2 hidden w-full sm:m-0 sm:block">
        <img
          src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&q=80"
          alt="test"
          className="aspect-video overflow-hidden rounded-md object-cover"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-start sm:pt-2">
        <div className="line-clamp-1 w-full font-medium transition group-hover:text-primary sm:min-w-16 md:text-base">
          {props.title}
        </div>
        <p className="text-xs text-muted-foreground">
          Category: {props.category_list.join(", ") || "Category"}
        </p>
        {/* rate */}
        <div className="flex items-center gap-x-1 text-xs text-card-foreground">
          <Star size={16} />
          <span>4.5</span>
        </div>
        <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
          Duration:{" "}
          {props.total_duration > 3600
            ? `${Math.floor(props.total_duration / 3600)} hr ${Math.floor((props.total_duration % 3600) / 60)} min`
            : `${Math.floor(props.total_duration / 60)} min`}
        </div>

        <p className="text-xs text-muted-foreground">
          Enrolled: {props.enrolled || 0} students
        </p>

        <p className="text-xs text-muted-foreground">
          Lecturer: {props.lecturer || "Lecturer Name"}
        </p>
      </div>
      <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
        <div className="flex items-center gap-x-1 text-card-foreground">
          <BookOpen size={16} />
          <span>{props.total_video || 0}</span>
        </div>
      </div>
      {progress !== null ? (
        <div>
          <div className="flex w-full items-center">Complete %</div>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <div className="h-2 w-full rounded-full bg-secondary-color4">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex w-full items-center">
              <Link
                to={link}
                className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-sm bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-end">
          <Link
            to={`/course/${props.id}`}
            className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-sm bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <MousePointerClick size={20} className="mr-2" />
            Enroll
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
