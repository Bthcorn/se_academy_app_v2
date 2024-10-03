import React, { useState } from "react";
import AddQuizModal from "./AddQuizModal";

const QuizModal = ({
  isOpen,
  close,
  quizzes,
  correctAnswers,
  onAddQuestion,
  onEditQuestion,
}) => {
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const [editQuiz, setEditQuiz] = useState(null);
  const [editMode, setEditMode] = useState(false);

  if (!isOpen) return null;

  // Function to find the correct answer ID for a given question
  const getCorrectAnswer = (questionId) => {
    const answer = correctAnswers.find((answer) => answer.id === questionId);
    return answer ? answer.answer : null;
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const openEditQuiz = (quiz) => {
    setEditQuiz(quiz);
    setShowAddQuiz(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-[#1E293B] p-8 text-white shadow-lg">
        <h2 className="mb-6 text-2xl font-bold">Quiz</h2>

        <div className="mb-4 max-h-[600px] overflow-auto">
          {quizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className={`mb-6 p-4 cursor-pointer ${editMode ? "border-4 border-yellow-400 rounded-xl shadow-md transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditQuiz(quiz) : null}
            >
              <p className="font-bold">
                {index + 1}. {quiz.question}
              </p>
              <div className="flex flex-col space-y-2">
                {quiz.options.map((option) => (
                  <div
                    key={option.id}
                    className={`rounded-md p-2 ${
                      option.id === getCorrectAnswer(quiz.id)
                        ? "bg-green-500"
                        : "bg-[#2E3A47]"
                    }`}
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
          className="mt-10 w-full mb-4 rounded bg-yellow-600 px-4 py-2 font-bold text-white hover:bg-yellow-700"
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
          correctAnswer={editQuiz ? getCorrectAnswer(editQuiz.id) : null}
          onClose={() => {
            setShowAddQuiz(false);
            setEditQuiz(null);
          }}
          onSave={editQuiz ? onEditQuestion : onAddQuestion}
        />
      )}
    </div>
  );
};

export default QuizModal;
