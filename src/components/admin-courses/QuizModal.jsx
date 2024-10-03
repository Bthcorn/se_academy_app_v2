import React, {useState} from "react";
import AddQuizModal from "./AddQuizModal";

const QuizModal = ({ isOpen, close, quizzes, correctAnswers, onAddQuestion }) => {
  const [showAddQuiz, setShowAddQuiz] = useState(false);  // State to control the AddQuizModal

  if (!isOpen) return null;

  // Function to find the correct answer ID for a given question
  const getCorrectAnswer = (questionId) => {
    const answer = correctAnswers.find((answer) => answer.id === questionId);
    return answer ? answer.answer : null;
  };

  const handleAddQuiz = () => {
    setShowAddQuiz(true);  // Open the AddQuizModal
  };

  const handleAddQuizClose = () => {
    setShowAddQuiz(false);  // Close the AddQuizModal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-[#1E293B] p-8 text-white shadow-lg">
        <h2 className="mb-6 text-2xl font-bold">Quiz</h2>

        {/* Display existing quizzes */}
        <div className="overflow-auto max-h-[600px] mb-4">
        {quizzes.map((quiz, index) => (
          <div key={quiz.id} className="mb-6">
            <p className="mb-2 font-bold">{index + 1}. {quiz.question}</p>
            <div className="flex flex-col space-y-2">
              {quiz.options.map((option) => (
                <div key={option.id} className={`rounded-md p-2 ${
                  option.id === getCorrectAnswer(quiz.id) ? "bg-green-500" : "bg-[#2E3A47]"
                }`}>
                  {option.text}
                </div>
              ))}
            </div>
          </div>
        ))}
        </div>

        {/* Button to trigger new question addition */}
        <button
          className="mt-4 w-full flex flex-col items-center justify-center rounded-lg border-2 border-dotted border-gray-400 p-4 shadow-lg transition-shadow duration-200 hover:shadow-xl"
          onClick={handleAddQuiz}
        >
          <div className="flex items-center justify-center text-xl text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-300">Add Question</span>
        </button>

        {/* Close button */}
        <button
          onClick={close}
          className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Close
        </button>
      </div>
      {showAddQuiz && (
        <AddQuizModal
          isOpen={showAddQuiz}
          onClose={handleAddQuizClose}
        />
      )}
    </div>
  );
};

export default QuizModal;
