import React, { useState } from "react";
import EditFieldModal from "./EditFieldModal";

const CourseDetailsModal = ({ selectedCourse, close, openQuiz }) => {
  const [editMode, setEditMode] = useState(false);
  const [editField, setEditField] = useState(null);

  const openEditModal = (field) => {
    setEditField({ name: field, value: selectedCourse[field] });
  };

  const closeEditModal = () => {
    setEditField(null);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 leading-tight">
      <div className="w-full max-w-xl rounded-lg bg-[#1E293B] p-8 text-white shadow-lg" style={{ maxHeight: '90vh' }}>
        <h2 className="mb-4 text-xl font-bold">
          {selectedCourse.course_title}
        </h2>
        {/* Scrollable content container with distinct background shade */}
        <div className="overflow-auto bg-[#16202A] rounded-lg p-3" style={{ maxHeight: '60vh' }}>
          <div className="space-y-4">
            {Object.keys(selectedCourse).map((key) =>
              key !== "quiz" && key !== "correctAnswers" && (
                <div
                  key={key}
                  className={`p-2 cursor-pointer ${editMode ? "border-2 border-yellow-400 rounded-lg shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
                  onClick={editMode ? () => openEditModal(key) : undefined}
                >
                  <p className="text-sm">
                    <strong>{key.replace(/_/g, " ")}:</strong> {selectedCourse[key]}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          <button
            onClick={toggleEditMode}
            className="w-full rounded-md bg-yellow-600 px-4 py-2 font-bold text-white hover:bg-yellow-700"
          >
            {editMode ? "Stop Editing" : "Edit Course Details"}
          </button>
          <button
            onClick={openQuiz}
            className="w-full rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            View Quiz
          </button>
          <button
            onClick={close}
            className="w-full rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
      {editField && (
        <EditFieldModal
          fieldName={editField.name}
          fieldValue={editField.value}
          onSave={(name, value) => { /* Save logic here */ }}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default CourseDetailsModal;
