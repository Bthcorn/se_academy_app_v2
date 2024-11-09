import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import QuizItem from "../components/QuizItem";
import Button from "../components/Button";

const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswers: 0,
  },
  {
    id: 2,
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Mars", "Earth"],
    correctAnswers: 2,
  },
  {
    id: 3,
    question: "What is the largest mammal?",
    options: ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"],
    correctAnswers: 0,
  },
];

// const correctAnswers = [
//   {
//     id: 1,
//     text: "Paris",
//     answer: 1,
//   },
//   {
//     id: 2,
//     text: "Jupiter",
//     answer: 1,
//   },
//   {
//     id: 3,
//     text: "Blue Whale",
//     answer: 1,
//   },
// ];

function Quiz() {
  const { quizId, courseId } = useParams();
  const [answers, setAnswers] = React.useState({});
  const [showAnswer, setShowAnswer] = React.useState(false);
  // const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const { state } = useLocation();

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAnswer(true);
    console.log(answers);
    // fetch request to submit answers
    // fetch get the correct answers or compare the answers
    // result the score and show the correct answers
    // store the submission in the database
  };

  const handleReset = () => {
    setAnswers({});
    setShowAnswer(false);
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/* breadcrum */}
      <div className="flex w-full justify-between md:hidden">
        <Link
          to={{
            pathname: `/course/${courseId}`,
          }}
        >
          <Button variant={"link"} label={"Back"}></Button>
        </Link>
      </div>
      <div className="hidden w-full justify-between md:flex">
        <h1 className="text-2xl font-semibold">Quiz</h1>
        <p className="text-secondary-color5">
          Total Questions: {quizData.length}
        </p>
        <p className="text-secondary-color5">Recent score: 0/3</p>
      </div>
      <div className="mb-4 mt-4 flex flex-col gap-4">
        {quizData.map((quiz) => (
          <div key={quiz.id} className="w-full">
            <h1>{quiz.question}</h1>
            <select
              name="quiz"
              id="quiz"
              className="w-full rounded border border-gray-300 bg-secondary-color4/50 p-2 md:p-3"
              value={answers[quiz.id]}
              onChange={(e) => {
                setAnswers({
                  ...answers,
                  [quiz.id]: parseInt(e.target.value),
                });
              }}
            >
              <option value="">Select an answer</option>
              {quiz.options.map((option, index) => (
                <option key={index} value={index}>
                  {option}
                </option>
              ))}
            </select>
            {showAnswer && (
              <div>
                <p className="text-secondary-color5">
                  Your Answer: {quiz.options[answers[quiz.id]]}
                </p>
                <p className="text-secondary-color5">
                  Correct Answer: {quiz.options[quiz.correctAnswers]}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex w-full justify-end gap-4">
        <Button
          label={"submit"}
          variant={"gradient"}
          onClick={handleSubmit}
        ></Button>
        <Button
          label={"reset"}
          variant={"outline"}
          onClick={handleReset}
        ></Button>
      </div>
    </div>
  );
}

export default Quiz;
