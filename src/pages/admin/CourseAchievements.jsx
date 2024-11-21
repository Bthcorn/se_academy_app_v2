import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Config } from "../../components/config";
import { Edit, Plus, Trash } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import AddAchievementModal from "../../components/admin-achievement/AddAchievementModal";
import UpdateAchievementModal from "../../components/admin-achievement/UpdateAchievementModal";

function CourseAchievements() {
  const { courseId } = useParams();
  const [achievements, setAchievements] = useState([]);
  const [course, setCourse] = useState({});
  const [showAddAchievementModal, setShowAddAchievementModal] = useState(false);
  const [showUpdateAchievementModal, setShowUpdateAchievementModal] =
    useState(false);
  const [achievementId, setAchievementId] = useState("");
  const [img, setImg] = useState({});
  const { userId } = useAuth();
  const [badges, setBadges] = useState({});

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
        fetchAchievements();
      }
    } catch (error) {
      console.error("Error fetching course details:", courseId, error);
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(
        Config.API_URL + `/achievement/get_achievements/${courseId}`,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        console.log("Achievements:", response.data);
        setAchievements(response.data);
        for (let i = 0; i < response.data.length; i++) {
          const badge = await axios.get(
            Config.API_URL +
              "/achievement/get_achievement/" +
              response.data[i].id,
            {
              headers: {
                Authorization: Config.AUTH_TOKEN(),
              },
            },
          );

          if (badge.data) {
            console.log("badge", badge.data);
            setBadges({ ...badges, [badge.data.id]: badge.data.badge });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching videos for course:", courseId, error);
    }
  };

  const handleDeleteachievement = async (id) => {
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

  const fetchImages = async () => {
    const images = {};
    for (const achievement of achievements) {
      try {
        const response = await axios.get(
          `${Config.API_URL}/achievement/get_achievement_badge/${achievement.id}`,
          {
            headers: {
              Authorization: Config.AUTH_TOKEN(),
            },
          },
          {
            responseType: "blob",
          },
        );

        const url = URL.createObjectURL(response.data);
        console.log("Image URL:", url);
        images[achievement.id] = url;
      } catch (error) {
        console.error(
          "Error fetching image for course:",
          achievement.id,
          error,
        );
      }
      // await delay(1000); // Delay to prevent rate limiting
    }
    setImg(images); // Set all image data once fetched
    console.log("Images:", images);
  };

  const handleUpdateModal = (id) => {
    setShowUpdateAchievementModal(true);
    setAchievementId(id);
  };

  useEffect(() => {
    fetchCourse();
    fetchImages();
    return () => {
      Object.values(img).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className="w-full rounded-lg bg-[#1E293B] p-6 text-white shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Course Achievements</h2>
      <h3 className="mb-6 text-xl font-bold text-yellow-400">
        Title: {course.title}
      </h3>
      <div className="flex w-full">
        <button
          onClick={() => setShowAddAchievementModal(true)}
          className="flex h-auto w-full flex-col items-center justify-center rounded-lg border-2 border-dotted border-gray-400 p-2 shadow-lg transition-shadow duration-200 hover:shadow-xl"
        >
          <div className="flex h-8 items-center justify-center gap-4 text-xl">
            <Plus size={24} />
            <span className="text-md font-bold text-gray-300">
              Add Achievement
            </span>
          </div>
        </button>
      </div>
      <div className="flex flex-col items-center">
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="my-2 flex w-full items-center justify-between rounded-lg bg-[#2E3A47] p-4 transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={"data:image/png;base64," + badges[achievement.id]}
                  alt={achievement.title}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              </div>
              <div className="flex w-1/3 items-center gap-4">
                <span className="text-lg font-bold">{achievement.title}</span>
              </div>
              <span className="text-gray-400">{achievement.created_at}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleUpdateModal(achievement.id)}
                  className="text-yellow-400 hover:text-yellow-500"
                >
                  <Edit size={24} />
                </button>
                <button
                  onClick={() => handleDeleteachievement(achievement.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash size={24} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No achievements found.</p>
        )}
      </div>

      {/* Add Video Modal */}
      {showAddAchievementModal && (
        <AddAchievementModal
          isOpen={showAddAchievementModal}
          onClose={() => setShowAddAchievementModal(false)}
          courseId={courseId}
        />
      )}

      {showUpdateAchievementModal && (
        <UpdateAchievementModal
          isOpen={showUpdateAchievementModal}
          onClose={() => setShowUpdateAchievementModal(false)}
          courseId={courseId}
          achievementId={achievementId}
        />
      )}
    </div>
  );
}

export default CourseAchievements;
