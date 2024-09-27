import React, { useState } from "react";

const CourseComponent = ({ courses, onAddCourse, onAddQuiz }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Function to open the modal with the selected course
  const viewCourseDetails = (course) => {
    setSelectedCourse(course);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="w-full rounded-lg bg-[#1E293B] p-6 text-white shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Courses</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by course title..."
        className="mb-4 w-full rounded-lg p-2 text-black"
        // value={searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label className="mr-4">Filter by status:</label>
        <select className="rounded-lg p-2 text-black">
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add Course Button with Dotted Border (Moved to the front) */}
        <button
          onClick={onAddCourse}
          className="h-81 flex flex-col items-center justify-center rounded-lg border-2 border-dotted border-gray-400 p-4 shadow-lg transition-shadow duration-200 hover:shadow-xl"
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
            key={course.course_id}
            className="rounded-lg bg-[#2E3A47] p-4 shadow-lg transition-shadow duration-200 hover:shadow-xl"
          >
            {/* Course Image */}
            <img
              src={course.course_image}
              alt={course.course_title}
              className="mb-4 h-40 w-full rounded-lg object-cover"
            />

            {/* Course Info (Title and Status on the same line) */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-yellow-400">
                {course.course_title}
              </h3>
              <span
                className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                  course.course_status === "Available"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {course.course_status}
              </span>
            </div>

            <p className="text-sm text-gray-400">{course.subjectID}</p>

            {/* Year and Duration */}
            <div className="mb-4 mt-4 flex items-center justify-between text-sm text-gray-300">
              <span>{course.year}</span>
              <span>{course.duration} hours</span>
            </div>

            {/* Rating */}
            <div className="mb-4 flex items-center">
              <div className="mr-2 text-yellow-400">{course.rating}</div>
              <div className="text-gray-400">★</div>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => viewCourseDetails(course)}
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              View Course Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal for course details */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 leading-loose">
          <div className="w-full max-w-md rounded-lg bg-[#1E293B] p-8 text-white shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">
              {selectedCourse.course_title}
            </h2>
            <p>
              <strong>Subject ID:</strong> {selectedCourse.subjectID}
            </p>
            <p>
              <strong>Course ID:</strong> {selectedCourse.course_id}
            </p>
            <p>
              <strong>Year:</strong> {selectedCourse.year}
            </p>
            <p>
              <strong>Lecturer:</strong> {selectedCourse.lecturer}
            </p>
            <p>
              <strong>Duration:</strong> {selectedCourse.duration} hours
            </p>
            <p>
              <strong>Rating:</strong> {selectedCourse.rating} ★
            </p>
            <p>
              <strong>Capacity:</strong> {selectedCourse.capacity}
            </p>
            <p>
              <strong>Video Quantity:</strong> {selectedCourse.video_quantity}
            </p>
            <p>
              <strong>Category ID:</strong> {selectedCourse.category_id}
            </p>
            <p>
              <strong>Created At:</strong> {selectedCourse.created_at}
            </p>
            <p>
              <strong>Status:</strong> {selectedCourse.course_status}
            </p>
            <p className="mt-4">
              <strong>Description:</strong> {selectedCourse.description}
            </p>

            {/* Add Quiz Button */}
            <button
              onClick={() => onAddQuiz(selectedCourse)}
              className="mt-4 w-full rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
              Add Quiz
            </button>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
