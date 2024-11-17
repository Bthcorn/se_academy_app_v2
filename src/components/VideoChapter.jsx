import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import React, { useRef } from "react";
import { Config } from "./config";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

const VideoChapter = ({ chapterId }) => {
  const [timeStart, setTimeStart] = React.useState(0);
  const [video, setVideo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [videoDuration, setVideoDuration] = React.useState(0);
  const [videoProgress, setVideoProgress] = React.useState(0);
  const [videoEnded, setVideoEnded] = React.useState(false);
  const { userId } = useAuth();
  const [videoSrc, setVideoSrc] = React.useState(null);
  const videoRef = React.useRef(null);
  const timeoutRef = useRef(null);

  const onTimeUpdate = (event) => {
    const currentTime = event.target.currentTime;
    setVideoProgress(currentTime);

    // Clear any previous timeout to reset the delay
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to call the API after 5 seconds
    timeoutRef.current = setTimeout(() => {
      if (currentTime > 0) {
        handleVideoProgress(currentTime);
      }
    }, 5000); // Adjust the delay as needed
  };

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
      console.log("Error fetching video details:", id, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledVideoDetails = async (userId, chapterId) => {
    try {
      const response = await axios.get(
        Config.API_URL +
          "/enrolled_course/get_enrolled_course_video_detail/" +
          userId +
          "/" +
          chapterId,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        setVideoProgress(parseFloat(response.data.timestamp));
        setVideoEnded(response.data.status);
      }
    } catch (error) {
      console.error("Error fetching enrolled video details:", error);
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

      await fetchEnrolledVideoDetails(userId, id);
      console.log("Video details:", response);
      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching video details:", id, error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoProgress = async (videoProgress) => {
    try {
      await axios.put(
        Config.API_URL +
          "/enrolled_course/update_enrolled_course_video/" +
          userId +
          "/" +
          chapterId,
        {
          timestamp: videoProgress,
          status: false,
        },
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );
      console.log("Video progress updated", videoProgress);
    } catch (error) {
      console.error("Error updating video progress:", error);
    }
  };

  const handleVideoEnded = async () => {
    try {
      await axios.put(
        Config.API_URL +
          "/enrolled_course/update_enrolled_course_video/" +
          userId +
          "/" +
          chapterId,
        {
          timestamp: videoProgress,
          status: true,
        },
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );
      console.log("Video progress updated", videoProgress);
    } catch (error) {
      console.error("Error updating video progress:", error);
    }
  };

  React.useEffect(() => {
    fetchVideo(chapterId);
    if (videoRef.current) {
      videoRef.current.currentTime = videoProgress;
    }
    return () => clearTimeout(timeoutRef.current);
  }, [chapterId]);

  if (loading) {
    return <div>Loading video...</div>;
  }

  return (
    <div className="flex w-full flex-col items-center rounded-md border bg-secondary-color4/50 p-4">
      <div className="flex w-full items-center justify-center">
        {videoSrc ? (
          <MuxPlayer
            ref={videoRef}
            src={videoSrc}
            controls
            // autoPlay
            startTime={videoProgress}
            width="100%"
            height="400"
            preload="auto"
            onEnded={handleVideoEnded}
            onTimeUpdate={onTimeUpdate}
            onPause={(e) => handleVideoProgress(e.target.currentTime)}
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
        <div>
          {videoEnded ? (
            <p className="text-sm text-accent-foreground">
              You have completed this video
            </p>
          ) : (
            <Button
              label="Mark as completed"
              onClick={() => handleVideoEnded()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoChapter;
