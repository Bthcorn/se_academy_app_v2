import React, { useRef, useState } from "react";
import { Config } from "../config";
import axios from "axios";

const AddAchievementModal = ({ isOpen, onClose, courseId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const imgRef = useRef(null);

  const handleUploadVideo = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imgRef.current.files[0]) {
      formData.append("badge", imgRef.current.files[0]);
    }

    if (courseId) {
      formData.append("course_id", courseId);
    }

    try {
      console.log(formData);
      const response = await axios.post(
        Config.API_URL + "/achievement/create_achievement",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.ok) {
        console.log("Achievement added successfully.");
        onClose();
      } else {
        console.error("Error adding achievement:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding achievement:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-[#1E293B] p-8 text-white shadow-lg">
        <h2 className="mb-4">Add a New Achievement</h2>
        <input
          type="text"
          placeholder="Enter achievement title"
          className="mb-4 w-full rounded-lg p-2 text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter achievement description"
          className="mb-4 w-full rounded-lg p-2 text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          placeholder="Enter image URL"
          className="mb-4 w-full rounded-lg p-2"
          ref={imgRef}
        />
        <div className="inline-flex gap-2">
          <button
            onClick={handleUploadVideo}
            className="rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Add Achievement
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

export default AddAchievementModal;
