import React from "react";
import Button from "../components/Button";
import CourseCard from "../components/CourseCard.jsx";

function MyCourses() {
  return (
    <section className="relative flex w-full flex-col items-start justify-start gap-2 rounded-md px-4 py-8 sm:items-center md:py-12 md:pb-8 lg:py-12 lg:pb-10">
      <h1 className="text-3xl font-semibold leading-relaxed text-foreground md:text-5xl">
        MY ENROLLED COURSES
      </h1>
      <p className="text-sm font-light text-accent-foreground md:text-base">
        You have enrolled in 4 courses
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
        <CourseCard progress={true} />
        <CourseCard progress={true} />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button label="Previous" variant="link" size={"sm"} />
        <Button label="1" variant="link" size={"sm"} />
        <Button label="2" variant="link" size={"sm"} />
        <Button label="Next" variant="link" size={"sm"} />
      </div>
    </section>
  );
}

export default MyCourses;
