import React, { useState } from "react";

const AddCourseModal = ({ isOpen, onClose, onAddCourse }) => {
  const [courseTitle, setCourseTitle] = useState("");

  const handleAddCourse = async () => {
    //adding a course title to the database frfr
    if (courseTitle) {
      onAddCourse(courseTitle);
      setCourseTitle(""); // Clear the input after adding
      onClose(); // Close modal
    } else {
      alert("Please enter a course title.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-[#1E293B] p-8 text-white shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Add a New Course</h2>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Enter course title"
          className="mb-4 w-full rounded-lg p-2 text-black"
        />
        <div className="flex justify-between">
          <button
            onClick={handleAddCourse}
            className="rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Add Course
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
