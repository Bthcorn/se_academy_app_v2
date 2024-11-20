import React, { useCallback } from "react";
import Button from "../components/Button";
import CourseCard from "../components/CourseCard.jsx";
import { useAuth } from "../hooks/useAuth.js";
import axios from "axios";
import { Config } from "../components/config.js";

function MyCourses() {
  const { userId } = useAuth();
  const [courses, setCourses] = React.useState([]);
  const [progress, setProgress] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchEnrolledCourses = async (id) => {
    try {
      const response = await axios.get(
        Config.API_URL + "/enrolled_course/get_enrolled_course/" + id,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );
      const enrolledCourses = [];
      if (response.data) {
        console.log("Enrolled courses:", response.data);
        for (const course of response.data) {
          const courseResponse = await axios.get(
            Config.API_URL + "/course/get_course/" + course.course_id,
            {
              headers: {
                Authorization: Config.AUTH_TOKEN(),
              },
            },
          );

          console.log("Course details:", courseResponse.data);

          const progressResponse = await axios.get(
            Config.API_URL +
              "/enrolled_course/get_enrolled_course_progress/" +
              course.id,
            {
              headers: {
                Authorization: Config.AUTH_TOKEN(),
              },
            },
          );

          console.log("Course progress:", progressResponse.data);

          if (progressResponse.data) {
            const num =
              parseFloat(progressResponse.data.progress) /
              parseFloat(progressResponse.data.total_video);
            progress.push(num);
          }

          if (courseResponse.data) {
            enrolledCourses.push(courseResponse.data);
          }
        }
        setCourses(enrolledCourses);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const search = async (searchTerm) => {
    try {
      const response = await axios.get(
        Config.API_URL + "/enrolled/search_enrolled_courses",
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
          params: {
            user_id: userId,
            course_name: searchTerm,
          },
        },
      );

      if (response.status === 200) {
        setCourses(response.data);
        console.log("search", courses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }

  // debounced search function
  const debouncedSearch = useCallback(debounce(search, 500), []);

  React.useEffect(() => {
    fetchEnrolledCourses(userId);
  }, [userId]);

  if (loading) {
    return (
      <section className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="relative flex w-full flex-col items-start justify-start gap-2 rounded-md px-4 py-8 sm:items-center md:py-12 md:pb-8 lg:py-12 lg:pb-10">
      <h1 className="text-3xl font-semibold leading-relaxed text-foreground md:text-5xl">
        MY ENROLLED COURSES
      </h1>
      <p className="text-sm font-light text-accent-foreground md:text-base">
        You have enrolled in {courses.length || 0} courses
      </p>
      {/* <div className="mt-8 inline-flex lg:mt-10">
        <input
          id="search"
          type="text"
          placeholder="Search for courses"
          className="mr-2 h-10 w-full rounded-md border border-none border-gray-300 bg-secondary-color4/50 p-2 text-foreground"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <Button label="Search" variant="gradient" />
      </div> */}
      <div className="flex flex-wrap gap-2">
        {/* category badge */}

        {/* <Button label="All" variant="link" size={"sm"} />
        <Button label="Web Development" variant="link" size={"sm"} />
        <Button label="Mobile Development" variant="link" size={"sm"} />
        <Button label="Data Science" variant="link" size={"sm"} />
        <Button label="Machine Learning" variant="link" size={"sm"} /> */}
      </div>
      <div
        id="display-courses"
        className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-4 py-8 md:py-12 md:pb-8 lg:pb-10"
      >
        {courses.map((course, index) => (
          <CourseCard
            key={course.id}
            props={course}
            progress={progress[index] * 100}
            link={"/course/" + course.id}
          />
        ))}
      </div>
      {/* <div className="flex items-center justify-center gap-4">
        <Button label="Previous" variant="link" size={"sm"} />
        <Button label="1" variant="link" size={"sm"} />
        <Button label="2" variant="link" size={"sm"} />
        <Button label="Next" variant="link" size={"sm"} />
      </div> */}
    </section>
  );
}

export default MyCourses;
