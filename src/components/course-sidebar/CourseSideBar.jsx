import React from "react";
import CourseSideBarContent from "./CourseSideBarContent";
import { MousePointer } from "lucide-react";
import Button from "../Button";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { Config } from "../config";
import Toast from "../Toast";

const CourseSideBar = ({ title, courseId, isEnrolled, enrolledCourseId }) => {
  const [enrolled, setEnrolled] = React.useState(isEnrolled || false);
  const { userId } = useAuth();
  const [ended, setEnded] = React.useState(false);

  const handleEnroll = async () => {
    try {
      const response = await axios.post(
        Config.API_URL + "/enrolled_course/create_enrolled_course",
        {
          user_id: userId,
          course_id: courseId,
        },
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.status === 200) {
        Toast("Enrolled successfully!", "success");
        console.log("Enrolled course:", courseId);
      } else {
        Toast("Error enrolling course", "error");
      }
    } catch (error) {
      Toast("Error enrolling course", "error");
      console.error("Error enrolling course:", courseId, error);
    } finally {
      setEnrolled(true);
    }
  };

  const handleCheckFinish = async () => {
    try {
      const response = await axios.get(
        Config.API_URL +
          "/enrolled_course/check_enrolled_course_ended/" +
          enrolledCourseId,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        console.log("Course finished:", enrolledCourseId, response.data.ended);
        setEnded(response.data.ended);
        if (response.data.ended === true) {
          const response = await axios.put(
            Config.API_URL +
              `/enrolled_course/update_enrolled_course/${enrolledCourseId}`,
            {
              ended: true,
            },
            {
              headers: {
                Authorization: Config.AUTH_TOKEN(),
              },
            },
          );

          if (response.status === 200) {
            console.log("Course marked as finished:", enrolledCourseId);
            Toast("Course marked as finished!", "success");
          } else {
            Toast("Error marking course as finished", "error");
          }
        } else {
          Toast("Course not finished yet", "error");
        }
      }
    } catch (error) {
      console.error("Error checking course finish:", enrolledCourseId, error);
      Toast("Error checking course finish", "error");
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col rounded-md border bg-secondary-color4/50 p-4 md:w-80">
      <h1>Title: {title}</h1>
      <h2>Course Id: {courseId}</h2>
      <div className="mt-2 h-full lg:mt-4">
        <nav className="flex h-full flex-col items-start gap-2 text-xs font-medium md:text-sm">
          <div className="grid w-full gap-2">
            <CourseSideBarContent courseId={courseId} isEnrolled={enrolled} />
          </div>
          {enrolled ? (
            <div className="mt-auto flex cursor-not-allowed flex-col items-start gap-2">
              <span>You have enrolled in this course.</span>
              <Button
                variant={"gradient"}
                onClick={() => handleCheckFinish()}
                label={"Check Finish"}
                icon={<MousePointer size={20} className="mr-2" />}
              />
            </div>
          ) : (
            <Button
              variant={"gradient"}
              onClick={() => handleEnroll()}
              label={"Enroll First!"}
              icon={<MousePointer size={20} className="mr-2" />}
            />
          )}
        </nav>
      </div>
    </div>
  );
};

export default CourseSideBar;
