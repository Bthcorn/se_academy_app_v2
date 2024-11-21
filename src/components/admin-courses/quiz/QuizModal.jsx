import React, { useEffect, useState } from "react";
import AddQuizModal from "./AddQuizModal";

const quiz = [
  {
    id: 1,
    question: "What is the capital of France?",
    choice: ["Paris", "London", "Berlin", "Madrid"],
    correct_answer: 0,
  },
  {
    id: 2,
    question: "What is the capital of Germany?",
    choice: ["Paris", "London", "Berlin", "Madrid"],
    correct_answers: 2,
  },
  {
    id: 3,
    question: "What is the capital of Spain?",
    choice: ["Paris", "London", "Berlin", "Madrid"],
    correct_answers: 3,
  },
];

const QuizModal = ({
  isOpen,
  close,
  quizzes,
  onAddQuestion,
  onEditQuestion,
  courseId,
}) => {
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const [editQuiz, setEditQuiz] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [quiz, setQuiz] = useState(quizzes || []);
  const [localCourseId, setLocalCourseId] = useState(null);

  // Function to find the correct answer ID for a given question
  // const getCorrectAnswer = (index) => {
  //   const answer = correctAnswers.find((answer) => answer.id === questionId);
  //   return answer ? answer.answer : null;
  // };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const openEditQuiz = (quiz) => {
    setEditQuiz(quiz);
    setShowAddQuiz(true);
  };

  useEffect(() => {
    setQuiz(quizzes || []);
    setLocalCourseId(courseId);
  }, [quizzes]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="w-full max-w-lg rounded-lg bg-[#1E293B] p-8 text-white shadow-lg"
        style={{ maxHeight: "95vh" }}
      >
        <h2 className="mb-6 text-2xl font-bold">Quiz</h2>

        <div
          className="mb-4 overflow-auto rounded-lg bg-[#16202A] p-4"
          style={{ maxHeight: "40vh" }}
        >
          {quiz.length > 0 ? (
            quiz.map((quiz, index) => (
              <div
                key={index}
                className={`mb-6 cursor-pointer p-4 ${editMode ? "rounded-xl border-4 border-yellow-400 shadow-md transition-all duration-300 ease-in-out" : "border border-transparent"}`}
                onClick={editMode ? () => openEditQuiz(quiz) : null}
              >
                <p className="font-bold">
                  {index + 1}. {quiz.question}
                </p>
                <div className="flex flex-col space-y-2">
                  {quiz.choices.map((option, index) => (
                    <div
                      key={index}
                      className={`rounded-md p-2 ${
                        index === quiz.correct_answer
                          ? "bg-green-500"
                          : "bg-[#404956]"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-300">No questions added</div>
          )}
        </div>

        <button
          className="mt-4 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dotted border-gray-400 p-4 shadow-lg transition-shadow duration-200 hover:shadow-xl"
          onClick={() => setShowAddQuiz(true)}
        >
          <div className="flex items-center justify-center text-xl text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14m-7-7h14" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-300">Add Question</span>
        </button>

        <button
          onClick={toggleEditMode}
          className="mb-4 mt-10 w-full rounded bg-yellow-600 px-4 py-2 font-bold text-white hover:bg-yellow-700"
        >
          {editMode ? "Stop Editing" : "Edit Quiz"}
        </button>

        <button
          onClick={close}
          className="w-full rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Close
        </button>
      </div>

      {showAddQuiz && (
        <AddQuizModal
          isOpen={showAddQuiz}
          quiz={editQuiz}
          correctAnswer={editQuiz ? quiz[editQuiz.correct_answer] : null}
          onClose={() => {
            setShowAddQuiz(false);
            setEditQuiz(null);
          }}
          onSave={editQuiz ? onEditQuestion : onAddQuestion}
          courseId={localCourseId}
        />
      )}
    </div>
  );
};

export default QuizModal;
