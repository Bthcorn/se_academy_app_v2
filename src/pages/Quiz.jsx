import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import QuizItem from "../components/QuizItem";
import Button from "../components/Button";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Config } from "../components/config";
import Toast from "../components/Toast";

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
  const [quizData, setQuizData] = React.useState([]);
  const [userSubmission, setUserSubmission] = React.useState([]);
  const [allSubmissions, setAllSubmissions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { userId } = useAuth();
  const { state } = useLocation();

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAnswer(true);
    console.log(answers);
    submitQuiz();
  };

  const handleReset = () => {
    setAnswers({});
    setShowAnswer(false);
  };

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(
        Config.API_URL + `/quiz/get_quiz_all/${courseId}`,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.status === 200) {
        setQuizData(response.data);
        console.log(response.data);
        // setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = async () => {
    try {
      const response = await axios.post(
        Config.API_URL + `/quiz/submit_quiz`,
        {
          user_id: userId,
          course_id: courseId,
          quiz_answers: answers,
        },
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.status === 200) {
        console.log(response.data);
        fetchUserSubmission(response.data.quiz_submission_id);
        Toast("Quiz submitted successfully", "success");
      } else {
        Toast("Error submitting quiz", "error");
      }
    } catch (error) {
      console.log(error);
      Toast("Error submitting quiz", "error");
    }
  };

  const fetchUserSubmission = async (submissionId) => {
    try {
      const response = await axios.get(
        Config.API_URL + `/quiz/get_quiz_submission/${submissionId}`,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.status === 200) {
        setUserSubmission(response.data);
        console.log(response.data);
        fetchUserSubmissions();
        // setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserSubmissions = async () => {
    try {
      const response = await axios.get(
        Config.API_URL +
          `/quiz/get_quiz_submission_course/${userId}/${courseId}`,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.status === 200) {
        setAllSubmissions(response.data);
        console.log(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
    fetchUserSubmissions();
  }, []);

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
        {/* <p className="text-secondary-color5">Recent score: </p> */}
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
                  [quiz.id]: parseInt(e.target.value) || 0,
                });
              }}
            >
              <option value="">Select an answer</option>
              {quiz.choices.map((option, index) => (
                <option key={index} value={index}>
                  {option}
                </option>
              ))}
            </select>
            {showAnswer && (
              <div>
                {/* <p className="text-secondary-color5">
                  Your Answer: {quiz.choices[answers[quiz.id]]}
                </p> */}
                {/* <p className="text-secondary-color5">
                  Correct Answer: {quiz.choices[quiz.correctAnswers]}
                </p> */}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        {userSubmission && (
          <div>
            <h1>Quiz Submission</h1>
            <p>Score: {userSubmission.scores}</p>
            <p>
              Correct Answers: {userSubmission.scores || 0}/{quizData.length}
            </p>
            <p>
              Incorrect Answers: {quizData.length - userSubmission.scores || 0}/
              {quizData.length}
            </p>
          </div>
        )}
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
      <h1 className="text-2xl">Recent Submissions</h1>
      <div className="mt-4 h-56 gap-4 overflow-y-auto sm:h-80">
        {allSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="mb-2 w-full rounded border border-gray-300 bg-secondary-color4/50 p-2 text-sm md:p-3"
          >
            <h1>Quiz Submission</h1>
            <p>Score: {submission.scores}</p>
            <p>
              Correct Answers: {submission.scores || 0}/{quizData.length}
            </p>
            <p>
              Incorrect Answers: {quizData.length - submission.scores || 0}/
              {quizData.length}
            </p>
            <time>{new Date(submission.submitted_at).toLocaleString()}</time>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
