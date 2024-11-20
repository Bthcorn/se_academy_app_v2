import React from "react";
import CourseSideBarContent from "./CourseSideBarContent";
import { MousePointer } from "lucide-react";
import Button from "../Button";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { Config } from "../config";
import Toast from "../Toast";

const CourseSideBar = ({ title, courseId, isEnrolled }) => {
  const [enrolled, setEnrolled] = React.useState(isEnrolled || false);
  const { userId } = useAuth();

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

  return (
    <div className="relative h-full w-full rounded-md border bg-secondary-color4/50 p-4 md:w-80">
      <h1>Subject: {title}</h1>
      {/* <h2>Course Id: {courseId}</h2> */}
      <div className="mt-2 grid lg:mt-4">
        <nav className="grid items-start gap-2 text-xs font-medium md:text-sm">
          <CourseSideBarContent courseId={courseId} isEnrolled={enrolled} />
          {enrolled ? (
            <div className="flex cursor-not-allowed items-center rounded-md px-3 py-2">
              <span>Enrolled</span>
            </div>
          ) : (
            <Button
              variant={"gradient"}
              onClick={() => handleEnroll()}
              label={"Enroll First!"}
              icon={<MousePointer size={20} className="mr-2" />}
            ></Button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default CourseSideBar;
