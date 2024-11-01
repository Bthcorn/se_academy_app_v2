import { Lock, Unlock } from "lucide-react";
import React from "react";
import CourseSideBarItem from "./CourseSideBarItem";
import axios from "axios";
import { Config } from "../config";

const content = [
  {
    enrolled: true,
    label: "Chapter 1",
    chapterId: "1",
  },
  {
    enrolled: false,
    label: "Chapter 2",
    chapterId: "2",
  },
  {
    enrolled: false,
    label: "Chapter 3",
    chapterId: "3",
  },
  {
    enrolled: false,
    label: "Chapter 4",
    chapterId: "4",
  },
  {
    enrolled: false,
    label: "Chapter 5",
    chapterId: "5",
  },
  {
    enrolled: true,
    label: "Quiz",
    quizId: "quiz",
  },
];

const CourseSideBarContent = ({ courseId, isEnrolled }) => {
  // const [enrolled, setEnrolled] = React.useState(isEnrolled);
  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchVideoItems = async (id) => {
    try {
      const response = await axios.get(
        Config.API_URL + `/course/get_videos_detail/${id}`,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        setContent(response.data);
      }
    } catch (error) {
      console.error("Error fetching videos for course:", courseId, error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchVideoItems(courseId);
  }, [courseId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {content.map((item) => (
        <CourseSideBarItem
          key={item.id}
          enrolled={isEnrolled || item.chapter === 0}
          label={item.title}
          {...item}
          href={`chapter/${item.id}`}
        />
      ))}
      <CourseSideBarItem label="Quiz" href="quiz" enrolled={isEnrolled} />
    </>
  );
};

export default CourseSideBarContent;
