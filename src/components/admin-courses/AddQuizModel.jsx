import React, { useState } from "react";
import { Check, Trash2 } from "lucide-react";  // Importing the Check and Trash2 icons for interaction

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
      choice.id === id ? { ...choice, text: newText } : choice
    );
    setChoices(updatedChoices);
  };

  const handleSetCorrectAnswer = (id) => {
    if (correctAnswerMode) {
      setCorrectAnswer(id);
    }
  };

  const handleRemoveChoice = (id) => {
    if (removeChoiceMode) {
      setChoices(choices.filter(choice => choice.id !== id));
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
        <h2 className="text-2xl font-bold mb-4">Add Quiz Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="font-bold">Question:</label>
            <input
              type="text"
              id="question"
              className="w-full mt-2 p-2 rounded-md text-black"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Choices:</label>
            {choices.map((choice, index) => (
              <div key={choice.id} className="flex items-center mt-2">
                <input
                  type="text"
                  className={`w-full p-2 rounded-md text-black ${
                    choice.id === correctAnswer ? "bg-green-500" : ""
                  }`}
                  value={choice.text}
                  onChange={(e) => handleChoiceChange(choice.id, e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="ml-2 text-yellow-500"
                  onClick={() => handleSetCorrectAnswer(choice.id)}
                  style={{ display: correctAnswerMode ? 'block' : 'none' }}
                >
                  <Check size={24} className={`${choice.id === correctAnswer ? "text-green-500" : "text-gray-300"}`} />
                </button>
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveChoice(choice.id)}
                  style={{ display: removeChoiceMode ? 'block' : 'none' }}
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 text-blue-600"
              onClick={handleAddChoice}
            >
              Add Choice
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={toggleCorrectAnswerMode}
            >
              {correctAnswerMode ? 'Exit Correct Answer Mode' : 'Enter Correct Answer Mode'}
            </button>
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={toggleRemoveChoiceMode}
            >
              {removeChoiceMode ? 'Exit Remove Choice Mode' : 'Enter Remove Choice Mode'}
            </button>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Save Quiz
          </button>
          <button
            type="button"
            className="ml-4 mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
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
