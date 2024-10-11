import React, { useEffect } from "react";
import CourseComponent from "../../components/admin-courses/course_component";
import axios from "axios";
import { Config } from "../../components/config";

const sampleCourses = [
  {
    id: "C101",
    title: "React Basics",
    subjectid: "WEB101",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&q=80",
    rating: 4.5,
    total_duration: 20,
    status: "active",
    description:
      "Learn the fundamentals of React, including components, state, and props.",
    enrolled: 100,
    total_video: 15,
    lecturer: "John Doe",
    category_list: ["Development", "Web Development"],
    created_at: "2023-01-01",
    quiz: [
      {
        id: 1,
        question: "What is JSX?",
        options: [
          { id: 1, text: "A JavaScript syntax extension" },
          { id: 2, text: "A CSS framework" },
          { id: 3, text: "A database language" },
          { id: 4, text: "A React component" },
        ],
      },
      {
        id: 2,
        question: "Which method is used to update state in a React component?",
        options: [
          { id: 1, text: "setState" },
          { id: 2, text: "updateState" },
          { id: 3, text: "renderState" },
          { id: 4, text: "changeState" },
        ],
      },
    ],
    correctAnswers: [
      { id: 1, text: "A JavaScript syntax extension", answer: 1 },
      { id: 2, text: "setState", answer: 1 },
    ],
  },
  {
    id: "C103",
    title: "Advanced JavaScript",
    subjectid: "JS301",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&q=80",
    rating: 4.9,
    total_duration: 30,
    status: "Not Available",
    description:
      "Master JavaScript with advanced concepts like closures, promises, and async/await.",
    enrolled: 80,
    total_video: 20,
    lecturer: "Alice Johnson",
    category_list: "DEV301",
    created_at: "2022-05-10",
    quiz: [
      {
        id: 1,
        question: "What is a closure in JavaScript?",
        options: [
          { id: 1, text: "A block of code" },
          { id: 2, text: "A function combined with its lexical environment" },
          { id: 3, text: "A way to write asynchronous code" },
          { id: 4, text: "A data structure" },
        ],
      },
    ],
    correctAnswers: [
      {
        id: 1,
        text: "A function combined with its lexical environment",
        answer: 2,
      },
    ],
  },
  {
    id: "",
    title: "Example Course Template (After Add Course)",
    subjectid: "",
    year: "",
    image: "",
    rating: 0,
    total_duration: 0,
    status: "",
    description: "",
    enrolled: 0,
    total_video: 0,
    lecturer: "",
    category_list: "",
    created_at: "",
    quiz: [],
    correctAnswers: [],
  },
  {
    id: "",
    title: "Many question test",
    subjectid: "",
    year: "",
    image: "",
    rating: 0,
    total_duration: 0,
    status: "",
    description: "",
    enrolled: 0,
    total_video: 0,
    lecturer: "",
    category_list: "",
    created_at: "",
    quiz: [
      {
        id: 1,
        question: "What is JSX?",
        options: [
          { id: 1, text: "A JavaScript syntax extension" },
          { id: 2, text: "A CSS framework" },
          { id: 3, text: "A database language" },
          { id: 4, text: "A React component" },
        ],
      },
      {
        id: 2,
        question: "Which method is used to update state in a React component?",
        options: [
          { id: 1, text: "setState" },
          { id: 2, text: "updateState" },
          { id: 3, text: "renderState" },
          { id: 4, text: "changeState" },
        ],
      },
      {
        id: 1,
        question: "What is JSX?",
        options: [
          { id: 1, text: "A JavaScript syntax extension" },
          { id: 2, text: "A CSS framework" },
          { id: 3, text: "A database language" },
          { id: 4, text: "A React component" },
        ],
      },
      {
        id: 2,
        question: "Which method is used to update state in a React component?",
        options: [
          { id: 1, text: "setState" },
          { id: 2, text: "updateState" },
          { id: 3, text: "renderState" },
          { id: 4, text: "changeState" },
        ],
      },
      {
        id: 1,
        question: "What is JSX?",
        options: [
          { id: 1, text: "A JavaScript syntax extension" },
          { id: 2, text: "A CSS framework" },
          { id: 3, text: "A database language" },
          { id: 4, text: "A React component" },
        ],
      },
      {
        id: 2,
        question: "Which method is used to update state in a React component?",
        options: [
          { id: 1, text: "setState" },
          { id: 2, text: "updateState" },
          { id: 3, text: "renderState" },
          { id: 4, text: "changeState" },
        ],
      },
      {
        id: 1,
        question: "What is JSX?",
        options: [
          { id: 1, text: "A JavaScript syntax extension" },
          { id: 2, text: "A CSS framework" },
          { id: 3, text: "A database language" },
          { id: 4, text: "A React component" },
        ],
      },
      {
        id: 2,
        question: "Which method is used to update state in a React component?",
        options: [
          { id: 1, text: "setState" },
          { id: 2, text: "updateState" },
          { id: 3, text: "renderState" },
          { id: 4, text: "changeState" },
        ],
      },
      {
        id: 1,
        question: "What is JSX?",
        options: [
          { id: 1, text: "A JavaScript syntax extension" },
          { id: 2, text: "A CSS framework" },
          { id: 3, text: "A database language" },
          { id: 4, text: "A React component" },
        ],
      },
      {
        id: 2,
        question: "Which method is used to update state in a React component?",
        options: [
          { id: 1, text: "setState" },
          { id: 2, text: "updateState" },
          { id: 3, text: "renderState" },
          { id: 4, text: "changeState" },
        ],
      },
    ],
    correctAnswers: [],
  },
];
export default function Courses() {
  const [courses, setCourses] = React.useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(Config.API_URL + "/course/get_courses", {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });

      if (response.status === 200) {
        setCourses(response.data);
        console.log("fetchCourses", courses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddCourse = async (courseTitle) => {
    try {
      const response = await axios.post(
        Config.API_URL + "/course/create_course",
        { title: courseTitle },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.status === 200) {
        setCourses([...courses, response.data]);
        console.log("onAddCourse", courses);
        fetchCourses();
        console.log("Course added successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterByStatus = async (status) => {
    try {
      const response = await axios.get(
        Config.API_URL + "/course/filter_courses_by_status",
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
          params: {
            status: status,
          },
        },
      );

      if (response.status === 200) {
        setCourses(response.data);
        console.log("filterByStatus", courses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const search = async (searchTerm, status = "all") => {
    try {
      const response = await axios.get(
        Config.API_URL + "/course/search_courses",
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
          params: {
            course_name: searchTerm,
            status: status,
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

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseComponent
      courses={courses}
      onAddCourse={onAddCourse}
      filter={filterByStatus}
      search={search}
    />
  );
}
