import React, { useEffect } from "react";
import {Navigate, Outlet, useParams} from "react-router-dom";

function CourseIdPage() {
  const { courseId } = useParams();

  if (!courseId) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    console.log(courseId);
  });

  return <div>
    See {courseId}
    <div>
      <Outlet />
    </div>
  </div>;
}

export default CourseIdPage;
