import React, { useCallback, useEffect, useState } from "react";
import AddQuizModal from "./QuizModal";
import CourseDetailsModal from "./CourseDetailsModal";
import AddCourseModal from "./AddCourseModal";
import { Config } from "../config";
import axios from "axios";

const CourseComponent = ({ courses, onAddCourse, search, filter }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // For filtering courses
  const [img, setImg] = useState({});

  // Function to open the modal with the selected course
  const viewCourseDetails = (course) => {
    setSelectedCourse(course);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedCourse(null);
    setShowQuiz(false);
    window.location.reload();
  };

  // Function to display the quiz modal
  const openQuiz = () => {
    setShowQuiz(true);
  };

  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // fetch images for all courses
  const fetchImages = async () => {
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
    setImg(images); // Set all image data once fetched
  };

  // handle debouncing for search
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

  useEffect(() => {
    fetchImages();
  }, [courses]);

  return (
    <div className="w-full rounded-lg bg-[#1E293B] p-6 text-white shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Courses</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by course title..."
        className="mb-4 w-full rounded-lg p-2 text-black"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          debouncedSearch(e.target.value, filterStatus);
        }}
      />

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label className="mr-4">Filter by status:</label>
        <select
          className="rounded-lg p-2 text-black"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            filter(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add Course Button with Dotted Border */}
        <button
          onClick={() => setShowAddCourseModal(true)}
          className="flex h-auto flex-col items-center justify-center rounded-lg border-2 border-dotted border-gray-400 p-4 shadow-lg transition-shadow duration-200 hover:shadow-xl"
        >
          <div className="flex items-center justify-center text-xl text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mb-2 h-12 w-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-300">Add Course</span>
        </button>

        {/* Render existing courses */}
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex h-full min-h-96 flex-col rounded-lg bg-[#2E3A47] p-4 shadow-lg transition-shadow duration-200 hover:shadow-xl"
          >
            {/* Course Image */}
            <img
              src={img[course.id]}
              alt={course.title}
              className="mb-4 h-40 w-full rounded-lg object-cover"
            />

            {/* Course Info (Title and Status on the same line) */}
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-xl font-bold text-yellow-400">
                {course.title}
              </h3>
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

            <p className="text-sm text-gray-400">{course.subjectid}</p>

            {/* Year and Duration */}
            <div className="mb-4 mt-4 flex items-center justify-between text-sm text-gray-300">
              <span>Year {course.year}</span>
              <span>
                {Math.floor(course.total_duration / 3600).toFixed(2)} hours
              </span>
            </div>

            {/* Rating */}
            <div className="mb-4 flex items-center">
              <div className="mr-2 text-yellow-400">
                {(course.rating || 5.0).toFixed(1)}
              </div>
              <div className="text-gray-400">★</div>
            </div>

            {/* View Details Button */}
            <div className="mt-auto">
              <button
                onClick={() => viewCourseDetails(course)}
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                View Course Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding a new course */}
      <AddCourseModal
        isOpen={showAddCourseModal}
        onClose={() => setShowAddCourseModal(false)}
        onAddCourse={onAddCourse}
      />

      {/* Modal for course details */}
      {selectedCourse && (
        <CourseDetailsModal
          selectedCourse={selectedCourse}
          close={closeModal}
          openQuiz={openQuiz}
        />
      )}

      {/* Modal for quiz */}
      <div className="w-full rounded-lg bg-[#1E293B] p-6 text-white shadow-lg">
        {/* Course content and modals */}
        {selectedCourse && (
          <AddQuizModal
            isOpen={showQuiz}
            close={() => setShowQuiz(false)}
            quizzes={selectedCourse.quiz}
            correctAnswers={selectedCourse.correctAnswers}
            // onAddQuestion={addQuestion}
          />
        )}
      </div>
    </div>
  );
};

export default CourseComponent;
