import React, { useRef, useState } from "react";
import { Config } from "../config";
import axios from "axios";

const UpdateAchievementModal = ({
  isOpen,
  onClose,
  achievementId,
  course_id,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const imgRef = useRef(null);

  const handleUpdateachievementDetails = async (id) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (imgRef.current.files[0] !== undefined) {
        formData.append("badge", imgRef.current.files[0]);
      }

      if (course_id) {
        formData.append("course_id", course_id);
      }
      const response = await axios.put(
        Config.API_URL + "/achievement/update_achievement/" + id,
        formData,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.status === 200) {
        console.log("Achievement details updated successfully.");
        onClose();
      }
    } catch (error) {
      console.error("Error updating achievement details:", error);
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
            onClick={() => handleUpdateachievementDetails(achievementId)}
            className="rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Update
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

export default UpdateAchievementModal;
