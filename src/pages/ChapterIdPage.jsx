import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import VideoChapter from "../components/VideoChapter";

function ChapterIdPage() {
  const { chapterId, courseId } = useParams();
  const pathname = useLocation();

  useEffect(() => {
    console.log(pathname);
  });

  return (
    <div className="flex h-full w-full">
      <VideoChapter chapter={chapterId} />
    </div>
  );
}

export default ChapterIdPage;
