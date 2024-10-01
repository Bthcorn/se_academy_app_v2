import { Lock, Unlock } from "lucide-react";
import React from "react";
import CourseSideBarItem from "./CourseSideBarItem";

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

const CourseSideBarContent = ({ courseId }) => {
  const [enrolled, setEnrolled] = React.useState(false);
  return (
    <>
      {content.map((item) => (
        <CourseSideBarItem
          key={item.label}
          {...item}
          href={`${item.quizId ? `quiz/${item.quizId}` : `chapter/${item.chapterId}`}`}
        />
      ))}
    </>
  );
};

export default CourseSideBarContent;
