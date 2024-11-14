import axios from "axios";
import React, { useRef, useState } from "react";
import { Config } from "../config";

const AddVideoModal = ({ isOpen, onClose, OnAddVideo, courseId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapter, setChapter] = useState(0);

  const handleAddVideo = async () => {
    //adding a video to the database frfr
    OnAddVideo();
    onClose(); // Close modal
  };
  const VideoRef = useRef(null);

  const handleUploadVideo = async () => {
    // Upload video to the server
    const formData = new FormData();
    formData.append("videos", VideoRef.current.files[0]);

    try {
      const response = await axios.post(
        Config.API_URL + "/course/upload_video/" + courseId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: Config.AUTH_TOKEN(),
          },
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            document.getElementById("videoProgress").value = progress;
          },
        },
      );

      if (response.ok) {
        console.log("Video uploaded successfully.");
        await handleUpdateVideoDetails();
        onClose();
      } else {
        console.error("Error uploading video:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleUpdateVideoDetails = async (id) => {
    // Update video details in the database
    try {
      const response = await axios.patch(
        Config.API_URL + "/course/update_video/" + id,
        {
          chapter: chapter,
          title: title,
          video_description: description,
        },
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.ok) {
        console.log("Video details updated successfully.");
        onClose();
      } else {
        console.error("Error updating video details:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating video details:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-[#1E293B] p-8 text-white shadow-lg">
        <h2 className="mb-4">Add a New Video</h2>
        <input
          type="number"
          placeholder="Enter chapter number"
          className="mb-4 w-full rounded-lg p-2 text-black"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter video title"
          className="mb-4 w-full rounded-lg p-2 text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter video description"
          className="mb-4 w-full rounded-lg p-2 text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="video/*"
          placeholder="Enter video URL"
          className="mb-4 w-full rounded-lg p-2"
          ref={VideoRef}
        />
        <progress
          id="videoProgress"
          value="0"
          max="100"
          className="mb-4 w-full"
        ></progress>
        <div className="inline-flex gap-2">
          <button
            onClick={handleUploadVideo}
            className="rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Add Video
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

export default AddVideoModal;
