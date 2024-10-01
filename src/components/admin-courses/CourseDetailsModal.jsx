import React, { useState } from "react";
import EditFieldModal from "./EditFieldModal";
import { Pencil } from "lucide-react";

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

  const saveField = (name, value) => {
    // update the value in the database according to the name field fr man I'm broke asf I want money
    closeEditModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 leading-loose">
      <div className="w-full max-w-3xl rounded-lg bg-[#1E293B] p-8 text-white shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          {selectedCourse.course_title}
        </h2>
        {Object.keys(selectedCourse).map(
          (key) =>
            key !== "quiz" &&
            key !== "correctAnswers" && ( // Exclude non-editable or complex fields
              <div key={key} className="mb-2 flex items-center justify-between">
                <p>
                  <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                  {selectedCourse[key]}
                </p>
                {editMode && (
                  <button
                    onClick={() => openEditModal(key)}
                    className="text-yellow-400"
                  >
                    <Pencil size={18} />
                  </button>
                )}
              </div>
            ),
        )}
        <button
          onClick={toggleEditMode}
          className="mt-4 w-full rounded-md bg-yellow-600 px-4 py-2 font-bold text-white hover:bg-yellow-700"
        >
          {editMode ? "Stop Editing" : "Edit Course Details"}
        </button>
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
      {editField && (
        <EditFieldModal
          fieldName={editField.name}
          fieldValue={editField.value}
          onSave={saveField}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default CourseDetailsModal;
