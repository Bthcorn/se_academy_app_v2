import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Config } from "../components/config";
import { Album, CircleUser, Users } from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = React.useState(null);
  const [courseImg, setCourseImg] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

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

      if (response.data) {
        setCourse(response.data);
      }
    } catch (error) {
      console.error("Error fetching course details:", courseId, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseImg = async (id) => {
    try {
      const response = await axios.get(
        Config.API_URL + `/course/get_course_img/${id}`,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        console.log("Course image:", response.data);
        setCourseImg(`data:image/jpeg;base64,${response.data}`);
      }
    } catch (error) {
      console.error("Error fetching course image:", courseId, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse(courseId);
    fetchCourseImg(courseId);
  }, []);

  if (!courseId) {
    return <div>Course not found</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-auto w-full flex-col items-center gap-4 rounded-md border bg-secondary-color4/50 p-2 sm:flex-col md:h-screen lg:grid lg:grid-cols-[320px_1fr] lg:p-4">
      <div className="flex h-full w-full flex-col items-start">
        {/* course image */}
        <img
          src={courseImg || "https://via.placeholder.com/150"}
          alt="Course Image"
          className="mb-2 h-48 w-full rounded-md drop-shadow-md"
        />
        <div className="mb-4 flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold text-yellow-400">{course.title}</h1>
          <span
            className={`rounded-lg px-2 py-1 text-xs font-semibold ${
              course.status === "active"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {course.status}
          </span>
        </div>
        <div className="inline-flex">
          <Album size={20} className="mr-2" />
          <p>Subject ID: {course.subjectid}</p>
        </div>
        <div className="inline-flex">
          <CircleUser size={20} className="mr-2" />
          <p>Lecturer: {course.lecturer}</p>
        </div>
        <div className="inline-flex">
          <Users size={20} className="mr-2" />
          <p>Total Enrolled: {course.enrolled} students</p>
        </div>
      </div>
      <div className="/bg-secondary flex h-full min-h-24 w-full rounded-md border md:flex">
        <nav className="flex h-full flex-col items-start gap-2 text-xs font-medium md:text-sm">
          <div className="grid w-full gap-2 p-2 text-accent-foreground lg:gap-4">
            <h2>Course Details</h2>
            <p>Course Id: {courseId}</p>
            <p>Description: {course.description}</p>
            <p>Category: {course.category_list.join(", ")}</p>
            <p>Year: {course.year}</p>
            <p className="inline-flex">
              Duration: {course.total_duration || 0} hours
            </p>

            {/* Rating */}
            <p>Rating: {course.rating || 5.0}</p>
          </div>
        </nav>
      </div>
    </div>
  );
}
