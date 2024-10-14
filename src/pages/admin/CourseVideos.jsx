import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Config } from "../../components/config";
import { Edit, FileVideo, Plus, Trash } from "lucide-react";
import AddVideoModal from "../../components/admin-videos/AddVideoModal";
import VideoDetailsModal from "../../components/admin-videos/VideoDetailsModal";
import { useAuth } from "../../hooks/useAuth";
import UpdateVideoModal from "../../components/admin-videos/UpdateVideoModal";

function CourseVideos() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [course, setCourse] = useState({});
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showViewVideoModal, setShowViewVideoModal] = useState(false);
  const [showUpdateVideoModal, setShowUpdateVideoModal] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { userId } = useAuth();

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        Config.API_URL + `/course/get_course/${courseId}`,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        // Fetch videos for the course
        console.log("Course details:", response.data);
        setCourse(response.data);
        fetchVideos();
      }
    } catch (error) {
      console.error("Error fetching course details:", courseId, error);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        Config.API_URL + `/course/get_videos_detail/${courseId}`,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        setVideos(response.data);
      }
    } catch (error) {
      console.error("Error fetching videos for course:", courseId, error);
    }
  };

  const handleDeleteVideo = async (id) => {
    // Delete video from the database
    try {
      const response = await axios.delete(
        Config.API_URL + "/course/delete_video/" + id,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.ok) {
        console.log("Video deleted successfully.");
      } else {
        console.error("Error deleting video:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
    console.log("userId:", userId);
  }, []);

  return (
    <div className="w-full rounded-lg bg-[#1E293B] p-6 text-white shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Course Videos</h2>
      <h3 className="mb-6 text-xl font-bold text-yellow-400">
        Title: {course.title}
      </h3>
      <div className="flex w-full">
        <button
          onClick={() => setShowAddVideoModal(true)}
          className="flex h-auto w-full flex-col items-center justify-center rounded-lg border-2 border-dotted border-gray-400 p-2 shadow-lg transition-shadow duration-200 hover:shadow-xl"
        >
          <div className="flex h-8 items-center justify-center gap-4 text-xl">
            <Plus size={24} />
            <span className="text-md font-bold text-gray-300">Add Video</span>
          </div>
        </button>
      </div>
      <div className="flex flex-col items-center">
        {videos.map((video) => (
          <div
            key={video.id}
            className="my-2 flex w-full items-center justify-between rounded-lg bg-[#2E3A47] p-4 transition-shadow duration-200 hover:shadow-lg"
            onClick={() => console.log("Video clicked:", video)}
            onMouseOver={() => console.log("Video hovered:", video)}
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold">{video.chapter}</span>
            </div>
            <div className="flex w-1/3 items-center gap-4">
              <span className="text-lg font-bold">{video.title}</span>
            </div>
            <span className="text-gray-400">
              {video.duration && video.duration > 60
                ? `${Math.floor(video.duration / 60)} m ${Math.floor(
                    video.duration % 60,
                  )} s`
                : `${video.duration} s`}
            </span>
            <span className="text-gray-400">{video.created_at}</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setShowUpdateVideoModal(true);
                  setVideoId(video.id);
                }}
                className="text-yellow-400 hover:text-yellow-500"
              >
                <Edit size={24} />
              </button>
              <button
                onClick={() => {
                  setShowViewVideoModal(true);
                  setVideoId(video.id);
                }}
                className="text-blue-400 hover:text-blue-500"
              >
                <FileVideo size={24} />
              </button>
              <button
                onClick={() => handleDeleteVideo(video.id)}
                className="text-red-400 hover:text-red-500"
              >
                <Trash size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Video Modal */}
      {showAddVideoModal && (
        <AddVideoModal
          isOpen={showAddVideoModal}
          onClose={() => setShowAddVideoModal(false)}
          courseId={courseId}
          onAddVideo={() => fetchVideos()}
        />
      )}

      {showViewVideoModal && (
        <VideoDetailsModal
          isOpen={showViewVideoModal}
          id={videoId}
          onClose={() => setShowViewVideoModal(false)}
        />
      )}

      {showUpdateVideoModal && (
        <UpdateVideoModal
          isOpen={showUpdateVideoModal}
          onClose={() => setShowUpdateVideoModal(false)}
          courseId={courseId}
          videoId={videoId}
        />
      )}
    </div>
  );
}

export default CourseVideos;
