import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Config } from "../components/config";
import CourseCard from "../components/CourseCard";
import Button from "../components/Button";

function Category() {
  const { categoryId } = useParams();
  const [courses, setCourses] = React.useState([]);
  const [courseImg, setCourseImg] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [category, setCategory] = React.useState({});

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        Config.API_URL + "/course/category/" + categoryId,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.status === 200) {
        setCategory(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchImages = async (courses) => {
    const images = {};
    for (const course of courses) {
      try {
        const response = await axios.get(
          `${Config.API_URL}/course/get_course_img/${course.id}`,
          {
            headers: {
              Authorization: Config.AUTH_TOKEN(),
            },
          },
        );
        images[course.id] = `data:image/jpeg;base64,${response.data}`; // Save base64 string
      } catch (error) {
        console.error("Error fetching image for course:", course.id, error);
      }
      // await delay(1000); // Delay to prevent rate limiting
    }
    setCourseImg(images); // Set all image data once fetched
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        Config.API_URL + "/course/get_courses_by_category/" + categoryId,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      await fetchCategory();

      if (response.status === 200) {
        setCourses(response.data);
        await fetchImages(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCourses();
  }, [categoryId]);

  if (loading) {
    return (
      <section className="flex h-96 items-center justify-center">
        <p className="text-lg font-light text-accent-foreground">Loading...</p>
      </section>
    );
  }

  return (
    <section className="relative flex w-full flex-col items-start justify-start gap-2 rounded-md px-4 py-8 sm:items-center md:py-12 md:pb-8 lg:py-12 lg:pb-10">
      <h1 className="text-3xl font-semibold leading-relaxed text-foreground md:text-5xl">
        {category.name || "Category"}
      </h1>
      <p className="text-sm font-light text-accent-foreground md:text-base">
        These are the courses in the category of {category.name || "Category"}
      </p>
      <div
        id="display-courses"
        className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-4 py-8 md:py-12 md:pb-8 lg:pb-10"
      >
        {courses.map((course) => (
          <CourseCard key={course.id} props={course} image={courseImg[course.id]} progress={null} />
        ))}
      </div>
    </section>
  );
}

export default Category;
