import React, { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import CourseSideBar from "../components/course-sidebar/CourseSideBar";

function CourseIdPage() {
  const { courseId } = useParams();

  useEffect(() => {
    console.log(courseId);
  });

  if (!courseId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col-reverse gap-4 md:grid md:h-screen md:grid-cols-[256px_1fr]">
      <CourseSideBar title={"Computer Programming"} courseId={courseId} />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default CourseIdPage;
