import React from "react";
import CourseCard from "../components/CourseCard.jsx";
import Button from "../components/Button";
import {
  ArrowRightCircleIcon,
  ArrowRightSquareIcon,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard.jsx";

function Home() {
  return (
    <section className="relative flex h-full w-full flex-col gap-2 px-4 py-8 md:py-12 md:pb-8 lg:pb-10">
      <div className="flex w-auto flex-col items-center pb-8 sm:flex-row lg:pb-12">
        <div className="w-auto sm:w-1/2">
          <div className="flex flex-col gap-4 md:max-w-lg">
            <p className="text-xs text-accent-foreground md:text-sm">
              WELCOME TO SE ACADEMY
            </p>
            <h1 className="text-3xl font-semibold leading-relaxed text-foreground md:text-5xl">
              BEST ONLINE LEARNING PLATFORM FOR SE STUDENTS
            </h1>
            <p className="text-sm text-accent-foreground md:text-base">
              We offer a wide range of courses to help you excel in your
              software engineering career.
            </p>
            <div className="mt-8 flex items-center gap-2 sm:items-start lg:mb-10">
              <Button
                label="Get Started"
                icon={<ArrowRightSquareIcon size={20} className="mr-2" />}
                variant={"gradient"}
              />
              <Button
                label="View Courses"
                icon={<SquareArrowOutUpRight size={20} className="mr-2" />}
                variant={"secondary"}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex h-full w-full items-center justify-center p-8 sm:mt-0 sm:w-1/2">
          <img
            src="/images/online-learning.svg"
            alt="SE Academy"
            className="min-h-60 object-fill"
          ></img>
        </div>
      </div>
      <div className="mb-8 min-h-dvh items-center rounded-md bg-secondary/50 px-4 py-8 backdrop:blur supports-[backdrop-filter]:bg-secondary/20 lg:mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
          POPULAR COURSES
        </h2>
        <div className="flex flex-wrap items-center justify-start gap-4 lg:justify-evenly">
          {/* <CourseCard progress={null} />
          <CourseCard progress={null} />
          <CourseCard progress={null} /> */}
        </div>
      </div>
      <div className="mb-8 items-center rounded-md bg-secondary/50 px-4 py-8 backdrop-blur supports-[backdrop-filter]:bg-secondary/20 lg:mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
          LEADER BOARD
        </h2>
        <div className="flex flex-wrap items-center justify-start gap-4">
          <div className="rounded-md border p-2 duration-200 hover:scale-105">
            <img
              src="https://avatar.iran.liara.run/public/42"
              alt="Avatar"
              className="h-16 w-16 rounded-full"
            ></img>
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                John Doe
              </h3>
              <ul className="list-inside list-disc">
                <li className="text-xs font-bold text-primary">Rank: 1</li>
                <li className="text-xs text-accent-foreground">Points: 100</li>
                <li className="text-xs text-accent-foreground">Courses: 5</li>
                <li className="text-xs text-accent-foreground">Badges: 3</li>
                <li className="text-xs text-accent-foreground">Level: 5</li>
                <li className="text-xs text-accent-foreground">Quizzes: 100</li>
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <Button label="view" variant="link" size="sm" />
              <Button label="Message" variant="link" size="sm" />
            </div>
          </div>
          <div className="rounded-md border p-2 duration-200 hover:scale-105">
            <img
              src="https://avatar.iran.liara.run/public/42"
              alt="Avatar"
              className="h-16 w-16 rounded-full"
            ></img>
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                John Doe
              </h3>
              <ul className="list-inside list-disc">
                <li className="text-xs font-bold text-primary">Rank: 1</li>
                <li className="text-xs text-accent-foreground">Points: 100</li>
                <li className="text-xs text-accent-foreground">Courses: 5</li>
                <li className="text-xs text-accent-foreground">Badges: 3</li>
                <li className="text-xs text-accent-foreground">Level: 5</li>
                <li className="text-xs text-accent-foreground">Quizzes: 100</li>
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <Button label="view" variant="link" size="sm" />
              <Button label="Message" variant="link" size="sm" />
            </div>
          </div>
          {/* <div className="flex items-center gap-2">
              <Info size={24} />
              <h3 className="text-lg font-semibold text-foreground">
                No data available
              </h3>
            </div> */}
        </div>
      </div>
      <div className="mb-8 items-center rounded-md bg-secondary/50 px-4 py-8 backdrop:blur supports-[backdrop-filter]:bg-secondary/20 lg:mb-12">
        <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
          BROWSE ONLINE COURSES
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
        <div className="mt-4 flex justify-center">
          <Link to={"/courses"}>
            <Button
              label="View All Categories"
              variant="link"
              icon={<ArrowRightCircleIcon size={20} className="mr-2" />}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
