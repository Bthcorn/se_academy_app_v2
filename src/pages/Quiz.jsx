import React from "react";
import { useParams } from "react-router-dom";

function Quiz() {
  const { quizId, courseId } = useParams();
  return (
    <div>
      <h1>Quiz</h1>
      <p>Quiz ID: {quizId}</p>
      <p>Course ID: {courseId}</p>
    </div>
  );
}

export default Quiz;
