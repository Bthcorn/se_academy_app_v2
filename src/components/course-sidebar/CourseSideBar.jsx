import React from "react";
import CourseSideBarContent from "./CourseSideBarContent";

const CourseSideBar = ({ title, courseId }) => {
  return (
    <div className="relative h-full w-full rounded-md border bg-secondary-color4/50 p-4 md:w-64">
      <h1>{title}</h1>
      <h2>Course Id: {courseId}</h2>
      <div className="mt-2 grid lg:mt-4">
        <nav className="grid items-start gap-2 text-xs font-medium md:text-sm">
          <CourseSideBarContent courseId={courseId} />
        </nav>
      </div>
    </div>
  );
};

export default CourseSideBar;
