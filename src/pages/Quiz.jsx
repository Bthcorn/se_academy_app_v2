import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import QuizItem from "../components/QuizItem";
import Button from "../components/Button";

const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      {
        id: 1,
        text: "Paris",
      },
      {
        id: 2,
        text: "London",
      },
      {
        id: 3,
        text: "Berlin",
      },
      {
        id: 4,
        text: "Madrid",
      },
    ],
  },
  {
    id: 2,
    question: "What is the largest planet in our solar system?",
    options: [
      {
        id: 1,
        text: "Jupiter",
      },
      {
        id: 2,
        text: "Saturn",
      },
      {
        id: 3,
        text: "Neptune",
      },
      {
        id: 4,
        text: "Uranus",
      },
    ],
  },
  {
    id: 3,
    question: "What is the largest mammal?",
    options: [
      {
        id: 1,
        text: "Blue Whale",
      },
      {
        id: 2,
        text: "Elephant",
      },
      {
        id: 3,
        text: "Giraffe",
      },
      {
        id: 4,
        text: "Kangaroo",
      },
    ],
  },
];

const correctAnswers = [
  {
    id: 1,
    text: "Paris",
    answer: 1,
  },
  {
    id: 2,
    text: "Jupiter",
    answer: 1,
  },
  {
    id: 3,
    text: "Blue Whale",
    answer: 1,
  },
];

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
    //fetch request to submit answers
    //fetch get the correct answers
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
            state: state,
          }}
        >
          <Button label={"Back"}></Button>
        </Link>
        <h1>Quiz</h1>
      </div>
      <div className="flex flex-col gap-4">
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
                  [quiz.id]: e.target.value,
                });
              }}
            >
              <option value="">Select an answer</option>
              {quiz.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.text}
                </option>
              ))}
            </select>
            {showAnswer && (
              <div>
                <p className="text-secondary-color5">
                  Correct Answer: {correctAnswers[quiz.id - 1].text}
                </p>
              </div>
            )}
          </div>
        ))}
        {/* {showAnswer ? (
          <div>
            {correctAnswers.map((answer) => (
              <div key={answer.id}>
                <p>{answer.answer}</p>
                <h1>{answer.text}</h1>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )} */}
      </div>
      <div className="flex w-full justify-end">
        <Button label={"submit"} onClick={handleSubmit}></Button>
        <Button label={"reset"} onClick={handleReset}></Button>
      </div>
    </div>
  );
}

export default Quiz;
