import React from "react";
import { Github, Instagram } from "lucide-react";

function About() {
  return (
    <section className="relative flex w-full flex-col items-start justify-start gap-2 rounded-md px-4 py-8 sm:items-center md:py-12 md:pb-8 lg:py-12 lg:pb-10">
      <div className="flex w-full flex-col items-center justify-center gap-2 md:pb-8 lg:pb-10">
        <h1 className="text-3xl font-semibold leading-relaxed text-foreground md:text-5xl">
          About Us
        </h1>
        <p className="text-sm font-light text-accent-foreground md:text-base">
          We are a team of passionate developers and designers
        </p>
      </div>
      <div className="mt-8 flex w-full max-w-5xl flex-col gap-4 sm:flex-row lg:mt-10">
        <div className="flex h-full w-full items-start justify-center sm:w-1/2">
          <img
            src="/images/team.svg"
            alt="team"
            className="max-h-60 w-full object-fill"
          />
        </div>
        <div className="flex w-full flex-col justify-start gap-4 sm:w-3/4">
          <h2 className="text-center text-2xl font-semibold leading-relaxed text-foreground md:text-start md:text-3xl">
            Benefits of Using Our Platform
          </h2>
          <div className="w-full rounded-md bg-secondary-color4/60 px-3 py-4 shadow-md duration-300 hover:scale-105">
            <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
              1. Exam Preparation Made Easy
            </h3>
            <p className="text-pretty text-xs font-light text-accent-foreground">
              Get access to curated exam prep resources tailored to software
              engineering courses. Our platform offers quizzes, sample
              questions, and detailed solutions to help you prepare effectively
              for your exams.
            </p>
          </div>
          <div className="w-full rounded-md bg-secondary-color4/60 px-3 py-4 shadow-md duration-300 hover:scale-105">
            <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
              2. Course Review and Summaries
            </h3>
            <p className="text-pretty text-xs font-light text-accent-foreground">
              Struggling to remember key concepts? Our comprehensive course
              summaries, organized by topics, make it easy to review the
              material from your classes, ensuring you&apos;re always ready for
              tests and assignments.
            </p>
          </div>
          <div className="w-full rounded-md bg-secondary-color4/60 px-3 py-4 shadow-md duration-300 hover:scale-105">
            <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
              3. Interactive Quizzes
            </h3>
            <p className="text-pretty text-xs font-light text-accent-foreground">
              Test your knowledge with interactive quizzes after each lesson or
              topic. These quizzes are designed to reinforce your learning and
              provide instant feedback, helping you identify areas for
              improvement.
            </p>
          </div>
        </div>
      </div>
      <div
        id="display-courses"
        className="flex w-full max-w-5xl flex-wrap items-center justify-start gap-4 py-8 md:py-12 md:pb-8 lg:pb-10"
      >
        <div className="w-full">
          <h2 className="text-center text-2xl font-semibold leading-relaxed text-foreground md:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="w-full rounded-md bg-secondary-color4/60 px-3 py-4 shadow-md duration-300 hover:scale-105">
          <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
            1. Who is this platform for?
          </h3>
          <p className="text-pretty text-xs font-light text-accent-foreground">
            <span className="text-bold">Answer: </span>
            Our platform is designed specifically for software engineering
            students who are looking to prepare for exams, review course
            materials, watch lecture videos, and test their knowledge through
            quizzes.
          </p>
        </div>
        <div className="w-full rounded-md bg-secondary-color4/60 px-3 py-4 shadow-md duration-300 hover:scale-105">
          <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
            2. What kind of courses are available?
          </h3>
          <p className="text-pretty text-xs font-light text-accent-foreground">
            <span className="text-bold">Answer: </span>
            We offer a variety of software engineering courses, including topics
            like algorithms, data structures, web development, databases, and
            more. All of the course materials are aligned with common college
            curricula to ensure relevance.
          </p>
        </div>
        <div className="w-full rounded-md bg-secondary-color4/60 px-3 py-4 shadow-md duration-300 hover:scale-105">
          <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
            3. Is there customer support if I have technical issues?
          </h3>
          <p className="text-pretty text-xs font-light text-accent-foreground">
            <span className="text-bold">Answer: </span>
            Absolutely! If you experience any technical issues or have
            questions, you can reach our support team via the “Contact Us” page.
            We aim to resolve issues as quickly as possible.
          </p>
        </div>
        <div className="w-full rounded-md bg-secondary-color4/60 px-3 py-4 shadow-md duration-300 hover:scale-105">
          <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
            4. What devices can I use to access the platform?
          </h3>
          <p className="text-pretty text-xs font-light text-accent-foreground">
            <span className="text-bold">Answer: </span>
            The platform is accessible on desktops, laptops, tablets, and
            smartphones. You can learn anytime, anywhere, as long as you have an
            internet connection.
          </p>
        </div>
        <div className="w-full rounded-md bg-secondary-color4/60 px-3 py-4 shadow-md duration-300 hover:scale-105">
          <h3 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
            5. Are there any live classes or interactive sessions with
            instructors?
          </h3>
          <p className="text-pretty text-xs font-light text-accent-foreground">
            <span className="text-bold">Answer: </span>
            At the moment, our platform focuses on pre-recorded lectures and
            quizzes. However, we plan to introduce live webinars and interactive
            Q&A sessions with instructors in the future.
          </p>
        </div>
      </div>
      <div className="flex w-full max-w-5xl flex-col items-center justify-start gap-4 py-8 md:py-12 md:pb-8 lg:pb-10">
        <h2 className="text-center text-2xl font-semibold leading-relaxed text-foreground md:text-start md:text-3xl">
          Developers
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="w-72 rounded-md border px-3 py-2 duration-200 hover:scale-105">
            <img
              src="https://avatar.iran.liara.run/public/42"
              alt="Avatar"
              className="h-16 w-16 rounded-full"
            ></img>
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                Bowornthat Chaingthong
              </h3>
              <p className="text-xs">Software Engineering</p>
              <p className="text-xs">2nd Year</p>
              <div className="inline-flex gap-2">
                <a href="/">
                  <Instagram size={24} />
                </a>
                <a href="/">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="w-72 rounded-md border px-3 py-2 duration-200 hover:scale-105">
            <img
              src="https://avatar.iran.liara.run/public/42"
              alt="Avatar"
              className="h-16 w-16 rounded-full"
            ></img>
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                Cusson Laohapatanawong
              </h3>
              <p className="text-xs">Software Engineering</p>
              <p className="text-xs">2nd Year</p>
              <div className="inline-flex gap-2">
                <a href="/">
                  <Instagram size={24} />
                </a>
                <a href="/">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="w-72 rounded-md border px-3 py-2 duration-200 hover:scale-105">
            <img
              src="https://avatar.iran.liara.run/public/42"
              alt="Avatar"
              className="h-16 w-16 rounded-full"
            ></img>
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                Authanee Supeeramongkolkul
              </h3>
              <p className="text-xs">Software Engineering</p>
              <p className="text-xs">2nd Year</p>
              <div className="inline-flex gap-2">
                <a href="/">
                  <Instagram size={24} />
                </a>
                <a href="/">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
