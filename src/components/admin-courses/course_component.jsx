import React, { useState } from 'react';

const CourseComponent = ({ courses, onAddCourse }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // For filtering courses

  // Function to open the modal with the selected course
  const viewCourseDetails = (course) => {
    setSelectedCourse(course);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedCourse(null);
  };

  // Filtered and searched courses
  const filteredCourses = courses
    .filter((course) =>
      course.course_title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((course) => {
      if (filterStatus === 'All') return true;
      return course.course_status === filterStatus;
    });

  return (
    <div className="p-6 text-white bg-[#1E293B] rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-6">Courses</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by course title..."
        className="w-full p-2 mb-4 rounded-lg text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label className="mr-4">Filter by status:</label>
        <select
          className="p-2 rounded-lg text-black"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add Course Button with Dotted Border (Moved to the front) */}
        <button
          onClick={onAddCourse}
          className="border-2 border-dotted border-gray-400 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center justify-center h-81"
        >
          <div className="flex items-center justify-center text-xl text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-300 mb-2"
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

        {/* Render filtered courses */}
        {filteredCourses.map((course) => (
          <div
            key={course.course_id}
            className="bg-[#2E3A47] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            {/* Course Image */}
            <img
              src={course.course_image}
              alt={course.course_title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            {/* Course Info (Title and Status on the same line) */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-yellow-400">
                {course.course_title}
              </h3>
              <span
                className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                  course.course_status === 'Available'
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
              >
                {course.course_status}
              </span>
            </div>

            <p className="text-sm text-gray-400">{course.subjectID}</p>

            {/* Year and Duration */}
            <div className="flex justify-between items-center text-sm text-gray-300 mb-4 mt-4">
              <span>{course.year}</span>
              <span>{course.duration} hours</span>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="text-yellow-400 mr-2">{course.rating}</div>
              <div className="text-gray-400">★</div>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => viewCourseDetails(course)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full"
            >
              View Course Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal for course details */}
      {selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 leading-loose">
          <div className="bg-[#1E293B] p-8 rounded-lg shadow-lg text-white max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
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

            {/* Close button */}
            <button
              onClick={closeModal}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-4"
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
