import React from "react";
import CourseCard from "../components/CourseCard.jsx";
import Button from "../components/Button";
import {
  ArrowRightCircleIcon,
  ArrowRightSquareIcon,
  Book,
  Crown,
  Hand,
  LogIn,
  PackagePlus,
  SquareArrowOutUpRight,
  Star,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard.jsx";
import UserCard from "../components/UserCard.jsx";
import axios from "axios";
import { Config } from "../components/config.js";

const steps = [
  {
    icon: <LogIn size={48} className="text-accent-foreground" />,
    title: "Sign Up",
    description: "Create an account to get started",
  },
  {
    icon: <PackagePlus size={48} className="text-accent-foreground" />,
    title: "Enroll in Courses",
    description: "Choose from a wide range of courses",
  },
  {
    icon: <Book size={48} className="text-accent-foreground" />,
    title: "Study and Learn",
    description: "Study and learn at your own pace",
  },
  {
    icon: <Crown size={48} className="text-accent-foreground" />,
    title: "Take Quizzes",
    description: "Test your knowledge with quizzes",
  },
  {
    icon: <Star size={48} className="text-accent-foreground" />,
    title: "Earn Points",
    description: "Earn points and level up",
  },
];

const cores = [
  {
    title: "Quality Content",
    description: "Our courses are designed by experts in the field",
    icon: <ThumbsUp size={48} className="text-accent-foreground" />,
  },
  {
    title: "Interactive Quizzes",
    description: "Test your knowledge with interactive quizzes",
    icon: <Hand size={48} className="text-accent-foreground" />,
  },
  {
    title: "Study Materials",
    description: "Get access to curated study materials",
    icon: <Book size={48} className="text-accent-foreground" />,
  },
];

function Home() {
  const [categories, setCategories] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [courseImg, setCourseImg] = React.useState({});
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(Config.API_URL + "/course/category", {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });

      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularCourse = async () => {
    try {
      const response = await axios.get(Config.API_URL + "/course/top_courses", {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });

      if (response.data) {
        setCourses(response.data);
        await fetchImages(response.data);
      }
    } catch (error) {
      console.error("Error fetching popular courses:", error);
    } finally {
      setLoading(false);
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

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(
        Config.API_URL + "/user/top/get_leaderboard",
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        setLeaderboard(response.data);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategories();
    fetchPopularCourse();
    fetchLeaderboard();
  }, []);

  return (
    <section className="relative flex h-full w-full flex-col gap-2 px-4 py-8 md:py-12 md:pb-8 lg:pb-10">
      <div className="flex w-auto flex-col items-center pb-8 sm:flex-row lg:pb-12">
        <div className="flex w-auto justify-center sm:w-1/2">
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
              <Link to={"/signup"}>
                <Button
                  label="Get Started"
                  icon={<ArrowRightSquareIcon size={20} className="mr-2" />}
                  variant={"gradient"}
                />
              </Link>
              <Link to={"/course"}>
                <Button
                  label="View Courses"
                  icon={<SquareArrowOutUpRight size={20} className="mr-2" />}
                  variant={"secondary"}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex h-full w-full items-center justify-center p-8 sm:mt-0 sm:w-1/2">
          <img
            src="/images/online-learning.svg"
            alt="SE Academy"
            className="h-80 min-h-60 object-fill"
          ></img>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 md:pb-8 lg:pb-10">
        <h2 className="text-2xl font-semibold leading-relaxed text-foreground md:text-3xl">
          WHY CHOOSE US?
        </h2>
        <p className="text-sm font-light text-accent-foreground md:text-base">
          We offer a wide range of courses to help you excel in your software
          engineering career.
        </p>
      </div>
      <div className="mb-8 flex w-full flex-col items-center justify-center gap-4 px-4 py-8 sm:flex-row">
        {cores.map((core, index) => (
          <div
            key={index}
            className="flex h-auto w-full flex-col items-center justify-center gap-2 rounded-md bg-secondary p-4 sm:h-full sm:w-1/4 md:w-1/5"
          >
            {core.icon}
            <h3 className="text-center text-base font-semibold text-foreground md:text-lg">
              {core.title}
            </h3>
            <p className="text-xs font-light text-accent-foreground">
              {core.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 md:pb-8 lg:pb-10">
        <h2 className="text-2xl font-semibold leading-relaxed text-foreground md:text-3xl">
          HOW IT WORKS
        </h2>
        <p className="text-sm font-light text-accent-foreground md:text-base">
          Get started in 5 easy steps
        </p>
      </div>
      <div className="mb-8 flex w-full flex-col items-center justify-center gap-4 px-4 py-8 sm:flex-row">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-secondary p-4 sm:w-1/4 md:w-1/5"
          >
            {step.icon}
            <h3 className="text-center text-base font-semibold text-foreground md:text-lg">
              {step.title}
            </h3>
            <p className="text-xs font-light text-accent-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-2 md:pb-8 lg:pb-10">
        <h2 className="items-center text-center text-2xl font-semibold text-foreground md:text-3xl">
          POPULAR COURSES
        </h2>
        <p className="text-sm font-light text-accent-foreground md:text-base">
          Our most popular courses
        </p>
      </div>
      <div className="mb-8 items-center rounded-md px-4 py-8 lg:mb-12">
        <div className="flex flex-wrap items-center justify-start gap-4 lg:justify-center">
          {/* fetch three courses those have the most number of enrollment */}
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              props={course}
              image={courseImg[course.id]}
              progress={null}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 md:pb-8 lg:pb-10">
        <h2 className="items-center text-center text-2xl font-semibold text-foreground md:text-3xl">
          LEADER BOARD
        </h2>
        <p className="text-sm font-light text-accent-foreground md:text-base">
          Top students on SE Academy
        </p>
      </div>
      <div className="mb-8 items-center rounded-md px-4 py-8 lg:mb-12">
        <div className="flex flex-wrap items-center justify-start gap-4 lg:justify-center">
          {/* Ordered by points from backend */}
          {leaderboard.map((user, index) => (
            <UserCard key={index} prop={user} />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 md:pb-8 lg:pb-10">
        <h2 className="items-center text-center text-2xl font-semibold text-foreground md:text-3xl">
          BROWSE BY CATEGORY
        </h2>
        <p className="text-sm font-light text-accent-foreground md:text-base">
          Explore courses by category
        </p>
      </div>
      <div className="mb-8 items-center rounded-md px-4 py-8 lg:mb-12">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.name}
              link={`/category/${category.id}`}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Link to={"/course"}>
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
