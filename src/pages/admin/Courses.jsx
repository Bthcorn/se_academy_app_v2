import React from "react";
import CourseComponent from "../../components/admin-courses/course_component";

export default function Courses() {
  const sampleCourses = [
    {
      course_id: "C101",
      course_title: "React Basics",
      subjectID: "WEB101",
      year: "2024",
      course_image:
        "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&q=80",
      rating: 4.5,
      duration: 20,
      course_status: "Available",
      description:
        "Learn the fundamentals of React, including components, state, and props.",
      capacity: 100,
      video_quantity: 15,
      lecturer: "John Doe",
      category_id: "DEV101",
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
          question:
            "Which method is used to update state in a React component?",
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
      course_id: "C103",
      course_title: "Advanced JavaScript",
      subjectID: "JS301",
      year: "2022",
      course_image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&q=80",
      rating: 4.9,
      duration: 30,
      course_status: "Not Available",
      description:
        "Master JavaScript with advanced concepts like closures, promises, and async/await.",
      capacity: 80,
      video_quantity: 20,
      lecturer: "Alice Johnson",
      category_id: "DEV301",
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
  ];

  return <CourseComponent courses={sampleCourses} />;
}
