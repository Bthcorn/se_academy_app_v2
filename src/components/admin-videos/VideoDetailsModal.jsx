import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Config } from "../config";

const VideoDetailsModal = ({ isOpen, onClose, id }) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);

  const fetchVideo = async (id) => {
    try {
      const response = await axios.get(
        Config.API_URL + `/course/get_video/${id}`,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
          responseType: "blob",
        },
      );
      console.log("Video details:", response);

      const videoBlob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const videoUrl = URL.createObjectURL(videoBlob); // Create a local URL for the video blob
      setVideoSrc(videoUrl);
      console.log("Video URL:", videoUrl);
    } catch (error) {
      console.error("Error fetching video details:", id, error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchVideo(id);
    }
  }, [id, isOpen]);

  // const handlePlay = () => {
  //   if (videoRef.current) {
  //     videoRef.current.play(); // Use the ref to access the play method
  //   }
  // };

  // // Example function to pause the video
  // const handlePause = () => {
  //   if (videoRef.current) {
  //     videoRef.current.pause(); // Use the ref to access the pause method
  //   }
  // };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg p-6 text-white shadow-lg">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            autoPlay
            loop
            width="100%"
            height="400"
            preload="auto"
            onTimeUpdate={() => console.log("Video playing...")}
          />
        ) : (
          <div>Loading video...</div>
        )}
        <button
          onClick={onClose}
          className="absolute right-0 top-0 p-4 text-white"
        >
          <X size={24} />
        </button>
        {/* <div className="mt-4">
          <button onClick={handlePlay} className="mr-2 bg-green-500 p-2">
            Play
          </button>
          <button onClick={handlePause} className="bg-red-500 p-2">
            Pause
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default VideoDetailsModal;
