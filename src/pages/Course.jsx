import React, { useEffect } from "react";
import Button from "../components/Button";
import CourseCard from "../components/CourseCard.jsx";
import CategoryCard from "../components/CategoryCard";
import axios from "axios";
import { Config } from "../components/config.js";

function Course() {
  const [courses, setCourses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(Config.API_URL + "/course/get_courses", {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });

      if (response.data) {
        setCourses(response.data);
      }

      const responseCategories = await axios.get(
        Config.API_URL + "/course/category",
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (responseCategories.data) {
        console.log(responseCategories.data);
        setCategories(responseCategories.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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
        EXPLORE OUR COURSES
      </h1>
      <p className="text-sm font-light text-accent-foreground md:text-base">
        We offer a wide range of courses to help you excel in your software
        engineering career.
      </p>
      <div className="mt-8 inline-flex lg:mt-10">
        <input
          id="search"
          type="text"
          placeholder="Search for courses"
          className="mr-2 h-10 w-full rounded-md border border-none border-gray-300 bg-secondary-color4/50 p-2 text-foreground"
        />
        <Button label="Search" variant="gradient" />
      </div>
      <div className="flex flex-wrap gap-2">
        {/* category badge */}

        <Button label="All" variant="link" size={"sm"} />
        <Button label="Web Development" variant="link" size={"sm"} />
        <Button label="Mobile Development" variant="link" size={"sm"} />
        <Button label="Data Science" variant="link" size={"sm"} />
        <Button label="Machine Learning" variant="link" size={"sm"} />
      </div>
      <div
        id="display-courses"
        className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-4 py-8 md:py-12 md:pb-8 lg:pb-10"
      >
        {courses.map((course) => (
          <CourseCard key={course.id} props={course} progress={null} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button label="Previous" variant="link" size={"sm"} />
        <Button label="1" variant="link" size={"sm"} />
        <Button label="2" variant="link" size={"sm"} />
        <Button label="Next" variant="link" size={"sm"} />
      </div>
      <div className="mb-8 items-center rounded-md bg-secondary/50 px-4 py-8 backdrop:blur supports-[backdrop-filter]:bg-secondary/20 lg:mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
          Categories
        </h2>
        <div className="flex max-w-5xl flex-wrap items-center justify-center gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.name}
              link={`/category/${category.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Course;
