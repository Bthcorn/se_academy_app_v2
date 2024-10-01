import React from "react";

const QuizItem = () => {
  return (
    <div className="flex w-full rounded-md bg-secondary-color4/50 px-3 py-2">
      <div className="flex w-full flex-col items-center justify-between">
        <div className="inline-flex items-center">
          <h1 className="ml-2 text-lg font-semibold">Quiz 1</h1>
        </div>
        <div>
          <div>
            <input type="radio" name="quiz" id="quiz1" />
            <label htmlFor="quiz1">Option 1</label>
          </div>
          <div>
            <input type="radio" name="quiz" id="quiz2" />
            <label htmlFor="quiz2">Option 2</label>
          </div>
          <div>
            <input type="radio" name="quiz" id="quiz3" />
            <label htmlFor="quiz3">Option 3</label>
          </div>
          <div>
            <input type="radio" name="quiz" id="quiz4" />
            <label htmlFor="quiz4">Option 4</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizItem;
