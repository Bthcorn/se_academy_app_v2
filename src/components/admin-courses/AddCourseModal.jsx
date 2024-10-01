import React, { useState } from "react";

const AddCourseModal = ({ isOpen, onClose, onAddCourse }) => {
  const [courseTitle, setCourseTitle] = useState("");

  const handleAddCourse = () => { //adding a course title to the database frfr
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
        <h2 className="text-2xl font-bold mb-4">Add a New Course</h2>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Enter course title"
          className="w-full p-2 rounded-lg text-black mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={handleAddCourse}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Add Course
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
