import React, { useState } from "react";
import { Check, Trash2 } from "lucide-react";

const AddQuizModal = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([{ id: Date.now(), text: "" }]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [correctAnswerMode, setCorrectAnswerMode] = useState(false);
  const [removeChoiceMode, setRemoveChoiceMode] = useState(false);

  if (!isOpen) return null;

  const handleAddChoice = () => {
    const newChoice = { id: Date.now(), text: "" };
    setChoices([...choices, newChoice]);
  };

  const handleChoiceChange = (id, newText) => {
    const updatedChoices = choices.map((choice) =>
      choice.id === id ? { ...choice, text: newText } : choice,
    );
    setChoices(updatedChoices);
  };

  const handleSetCorrectAnswer = (id) => {
    setCorrectAnswer(id);
  };

  const handleRemoveChoice = (id) => {
    if (removeChoiceMode) {
      setChoices(choices.filter((choice) => choice.id !== id));
    }
  };

  const toggleCorrectAnswerMode = () => {
    setCorrectAnswerMode(!correctAnswerMode);
    if (removeChoiceMode) setRemoveChoiceMode(false); // Exit remove mode if active
  };

  const toggleRemoveChoiceMode = () => {
    setRemoveChoiceMode(!removeChoiceMode);
    if (correctAnswerMode) setCorrectAnswerMode(false); // Exit correct answer mode if active
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ question, choices, correctAnswer }); // Now includes the correct answer
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-[#1E293B] p-8 text-white shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Add Quiz Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="font-bold">
              Question:
            </label>
            <input
              type="text"
              id="question"
              className="mt-2 w-full rounded-md p-2 text-black"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Choices:</label>
            {choices.map((choice) => (
              <div key={choice.id} className="mt-2 flex items-center">
                <input
                  type="text"
                  className={`w-full rounded-md p-2 text-black ${choice.id === correctAnswer ? "bg-green-500" : ""} ${correctAnswerMode ? "border-2 border-green-500" : ""} ${removeChoiceMode ? "border-2 border-red-500" : ""}`}
                  value={choice.text}
                  onChange={(e) =>
                    handleChoiceChange(choice.id, e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  className="ml-2 text-yellow-500"
                  onClick={() => handleSetCorrectAnswer(choice.id)}
                  style={{ display: correctAnswerMode ? "block" : "none" }}
                >
                  <Check
                    size={24}
                    className={`${choice.id === correctAnswer ? "text-green-500" : "text-gray-300"}`}
                  />
                </button>
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveChoice(choice.id)}
                  style={{ display: removeChoiceMode ? "block" : "none" }}
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 flex w-full items-center justify-center rounded-lg border-2 border-dotted border-gray-400 p-2 text-lg font-bold text-gray-300 shadow-lg transition-shadow duration-200 hover:shadow-xl"
              onClick={handleAddChoice}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m-7-7h14"
                />
              </svg>
              Add Choice
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              className="rounded-md bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
              onClick={toggleCorrectAnswerMode}
            >
              {correctAnswerMode ? "Save" : "Choose Answer"}
            </button>
            <button
              type="button"
              className="rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
              onClick={toggleRemoveChoiceMode}
            >
              {removeChoiceMode ? "Save" : "Remove"}
            </button>
          </div>
          <button
            type="submit"
            className="mt-10 w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Save Quiz
          </button>
          <button
            type="button"
            className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={onClose}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuizModal;
