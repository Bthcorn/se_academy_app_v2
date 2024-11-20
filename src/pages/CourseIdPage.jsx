import React, { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import CourseSideBar from "../components/course-sidebar/CourseSideBar";
import axios from "axios";
import { Config } from "../components/config";
import { useAuth } from "../hooks/useAuth";

function CourseIdPage({ title }) {
  const { courseId } = useParams();
  const [course, setCourse] = React.useState(null);
  const [enrolledCourseId, setEnrolledCourseId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [enrolled, setEnrolled] = React.useState(false);
  const { userId } = useAuth();

  const fetchCourse = async (id) => {
    try {
      const response = await axios.get(
        Config.API_URL + `/course/get_course/${id}`,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      await fetchEnrolledCourses(userId, id);

      if (response.data) {
        setCourse(response.data);
      }
    } catch (error) {
      console.error("Error fetching course details:", courseId, error);
    } finally {
      setLoading(false);
    }
  };

  // check if user is enrolled in the course
  const fetchEnrolledCourses = async (userId, courseId) => {
    try {
      const response = await axios.get(
        Config.API_URL +
          "/enrolled_course/check_enrolled/" +
          userId +
          "/" +
          courseId,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        setEnrolledCourseId(response.data.enrolled_course_id);
        setEnrolled(response.data.success);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  useEffect(() => {
    fetchCourse(courseId);
  }, []);

  if (!courseId) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col-reverse gap-4 md:grid md:h-screen md:grid-cols-[320px_1fr]">
      <CourseSideBar
        title={course.title}
        courseId={courseId}
        enrolledCourseId={enrolledCourseId}
        isEnrolled={enrolled}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default CourseIdPage;
