import axios from "axios";
import React, { useEffect, useState } from "react";
import { Config } from "../config";
import Toast from "../Toast";

const UpdateVideoModal = ({ isOpen, onClose, videoId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapter, setChapter] = useState(0);

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

      if (response.status === 200) {
        Toast("Video details updated successfully!", "success");
        console.log("Video details updated successfully.");
        onClose();
      } else {
        Toast("Error updating video details", "error");
        console.error("Error updating video details:", response.statusText);
      }
    } catch (error) {
      Toast("Error updating video details", "error");
      console.error("Error updating video details:", error);
    }
  };

  const fetchVideoDetails = async (id) => {
    try {
      const response = await axios.get(
        Config.API_URL + `/course/get_video_detail/${id}`,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        console.log("Video details:", response.data);
        setTitle(response.data.title);
        setDescription(response.data.video_description);
        setChapter(response.data.chapter);
      }
    } catch (error) {
      console.error("Error fetching video details:", id, error);
    }
  };

  useEffect(() => {
    fetchVideoDetails(videoId);
  }, [videoId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-[#1E293B] p-8 text-white shadow-lg">
        <h2 className="mb-4">Update Video Detail</h2>
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
        <div className="inline-flex gap-2">
          <button
            onClick={() => handleUpdateVideoDetails(videoId)}
            className="rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Update Video
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

export default UpdateVideoModal;
