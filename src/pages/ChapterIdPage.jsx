import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";

function ChapterIdPage() {
    const { chapterId, courseId } = useParams();
    const pathname = useLocation();

    useEffect(() => {
        console.log(pathname);
    })

    return (
        <div>
            {courseId}
            <br/>
            {chapterId}
        </div>
    );
};

export default ChapterIdPage;