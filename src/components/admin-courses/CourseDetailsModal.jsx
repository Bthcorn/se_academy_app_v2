import React from "react";

const CourseDetailsModal = ({ selectedCourse, close, openQuiz }) => {
  return (
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
          <strong>Status:</strong> {selectedCourse.course_status}
        </p>
        <p className="mt-4">
          <strong>Description:</strong> {selectedCourse.description}
        </p>
        <button
          onClick={openQuiz}
          className="mt-4 w-full rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          Add Quiz
        </button>
        <button
          onClick={close}
          className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
