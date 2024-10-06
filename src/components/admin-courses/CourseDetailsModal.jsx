import React, { useRef, useState } from "react";
import EditFieldModal from "./EditFieldModal";
import axios from "axios";
import { Config } from "../config";

const parseIntField = ["enrolled", "total_video", "year"];
const parseFloatField = ["rating", "total_duration"];

const CourseDetailsModal = ({ selectedCourse, close, openQuiz }) => {
  const [editMode, setEditMode] = useState(false);
  const [editField, setEditField] = useState(null);
  const imgRef = useRef(null);
  const [imgFile, setImgFile] = useState(null);

  const openEditModal = (field) => {
    setEditField({ name: field, value: selectedCourse[field] });
  };

  const closeEditModal = () => {
    setEditField(null);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const onSave = async (id, name, value) => {
    try {
      if (parseIntField.includes(name)) {
        value = parseInt(value);
      } else if (parseFloatField.includes(name)) {
        value = parseFloat(value);
      } else if (name === "category_list") {
        value = value.split(",").map((category) => category.trim());
        console.log(value);
      }

      const response = await axios.patch(
        Config.API_URL + "/course/update_course/" + id,
        {
          [name]: value,
        },
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (id) => {
    try {
      const formData = new FormData();
      formData.append("image", imgRef.current.files[0]);
      const response = await axios.put(
        Config.API_URL + "/course/update_course_image/" + id,
        formData,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 leading-tight">
      <div
        className="w-full max-w-xl rounded-lg bg-[#1E293B] p-8 text-white shadow-lg"
        style={{ maxHeight: "90vh" }}
      >
        <h2 className="mb-4 text-xl font-bold">{selectedCourse.title}</h2>
        {/* Scrollable content container with distinct background shade */}
        <div
          className="overflow-auto rounded-lg bg-[#16202A] p-3"
          style={{ maxHeight: "60vh" }}
        >
          <div className="space-y-4">
            <div
              key={"id"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("title") : undefined}
            >
              <p className="text-sm">
                <strong>id:</strong> {selectedCourse.id}
              </p>
            </div>

            <div
              key={"title"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("title") : undefined}
            >
              <p className="text-sm">
                <strong>title:</strong> {selectedCourse.title}
              </p>
            </div>

            <div
              key={"description"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={
                editMode ? () => openEditModal("description") : undefined
              }
            >
              <p className="text-sm">
                <strong>description:</strong> {selectedCourse.description}
              </p>
            </div>

            <div
              key={"subjectid"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("subjectid") : undefined}
            >
              <p className="text-sm">
                <strong>subjectid:</strong> {selectedCourse.subjectid}
              </p>
            </div>

            <div
              key={"lecturer"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("lecturer") : undefined}
            >
              <p className="text-sm">
                <strong>lecturer:</strong> {selectedCourse.lecturer}
              </p>
            </div>

            <div
              key={"year"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("year") : undefined}
            >
              <p className="text-sm">
                <strong>year:</strong> {selectedCourse.year}
              </p>
            </div>

            <div
              key={"total_duration"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={
                editMode ? () => openEditModal("total_duration") : undefined
              }
            >
              <p className="text-sm">
                <strong>total duration:</strong> {selectedCourse.total_duration}
              </p>
            </div>

            {/* <div
              key={"rating"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("rating") : undefined}
            >
              <p className="text-sm">
                <strong>rating:</strong> {selectedCourse.rating}
              </p>
            </div> */}

            <div
              key={"status"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("status") : undefined}
            >
              <p className="text-sm">
                <strong>status:</strong> {selectedCourse.status}
              </p>
            </div>

            <div
              key={"enrolled"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("enrolled") : undefined}
            >
              <p className="text-sm">
                <strong>enrolled:</strong> {selectedCourse.enrolled}
              </p>
            </div>

            <div
              key={"total_video"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={
                editMode ? () => openEditModal("video_quantity") : undefined
              }
            >
              <p className="text-sm">
                <strong>total video:</strong> {selectedCourse.total_video}
              </p>
            </div>

            <div
              key={"category_list"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={
                editMode ? () => openEditModal("category_list") : undefined
              }
            >
              <p className="text-sm">
                <strong>category list:</strong>{" "}
                {selectedCourse.category_list.join(", ")}
              </p>
            </div>

            <div
              key={"image"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              // onClick={
              //   editMode ? () => openEditModal("category_list") : undefined
              // }
            >
              <p className="text-sm">
                <strong>image:</strong>
              </p>
              {editMode ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImgFile(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                    ref={imgRef}
                  />
                  <img
                    src={imgFile ? URL.createObjectURL(imgFile) : ""}
                    alt="course_image"
                    className="h-40 w-full rounded-lg object-cover"
                  />
                  <button
                    onClick={() => handleImageUpload(selectedCourse.id)}
                    className="rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
                  >
                    Save Image
                  </button>
                </div>
              ) : (
                <img
                  src={Config.API_URL + "/" + selectedCourse.course_image}
                  alt={selectedCourse.title}
                  className="h-40 w-full rounded-lg object-cover"
                />
              )}
            </div>

            <div className="cursor-pointer p-2">
              <p className="text-sm">
                <strong>created At: </strong>
                {new Date(selectedCourse.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col space-y-4">
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
          id={selectedCourse.id}
          fieldName={editField.name}
          fieldValue={editField.value}
          onSave={onSave}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default CourseDetailsModal;
