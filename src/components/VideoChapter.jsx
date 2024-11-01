import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import React from "react";
import { Config } from "./config";

const VideoChapter = ({ chapterId }) => {
  const [timeStart, setTimeStart] = React.useState(0);
  const [video, setVideo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  function onTimeUpdate(event) {
    // convert to seconds
    const currentTime = event.target.currentTime;
    console.log("time", currentTime);
  }

  const [videoSrc, setVideoSrc] = React.useState(null);
  const videoRef = React.useRef(null);

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

      await fetchVideoDetails(id);

      console.log("Video details:", response);

      const videoBlob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const videoUrl = URL.createObjectURL(videoBlob); // Create a local URL for the video blob
      setVideoSrc(videoUrl);
      console.log("Video URL:", videoUrl);
    } catch (error) {
      console.error("Error fetching video details:", id, error);
    } finally {
      setLoading(false);
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
      console.log("Video details:", response);
      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching video details:", id, error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchVideo(chapterId);
  }, [chapterId]);

  if (loading) {
    return <div>Loading video...</div>;
  }

  return (
    <div className="flex w-full flex-col items-center rounded-md border bg-secondary-color4/50 p-4">
      <div className="flex w-full items-center justify-center">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            // autoPlay
            loop
            width="100%"
            height="400"
            preload="auto"
            onTimeUpdate={() => console.log("Video playing...")}
          />
        ) : (
          <div>Loading video...</div>
        )}
      </div>
      <div className="mt-4 line-clamp-2 flex w-full max-w-[800px] flex-col justify-center">
        <h1 className="text-md mb-4 font-medium md:text-3xl">{video.title}</h1>
        <p className="text-sm md:text-lg">
          Description:{" "}
          {video && video.video_description
            ? video.video_description
            : "No description"}
        </p>
      </div>
    </div>
  );
};

export default VideoChapter;
