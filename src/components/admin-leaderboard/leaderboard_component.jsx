import React, { useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react"; // Icons for the arrows
import { data } from "autoprefixer";

const LeaderboardComponent = ({ users, userImages }) => {
  const [activeTab, setActiveTab] = useState("score"); // Default sorting by score

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // PS. FROM SPOON // This should not be random, this is only for the sake of designing. Normally,it should compare wheather the rank had recently moved up or down, if that user's rank was moved up, the arrow is green otherwise red.
  const getRandomArrow = () =>
    Math.random() > 0.5 ? (
      <ArrowUpRight className="text-green-400" />
    ) : (
      <ArrowDownRight className="text-red-400" />
    );
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // Sort users based on active tab (level, score, study_hours)
  const sortedUsers = [...users].sort((a, b) => {
    if (activeTab === "level") return b.level - a.level;
    if (activeTab === "study_hours") return b.study_hours - a.study_hours;
    return b.score - a.score; // Default is score
  });

  // The user with the highest score is the first in sortedUsers
  const firstPlace = sortedUsers[0];
  const secondPlace = sortedUsers[1];
  const thirdPlace = sortedUsers[2];

  // Rest of the users for the leaderboard list
  const otherUsers = sortedUsers.slice(3);

  return (
    <div className="w-full rounded-lg bg-[#1E293B] p-6 text-white shadow-lg">
      {/* Tab Navigation */}
      <div className="mb-8 flex justify-center">
        {["score", "level", "study_hours"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mx-2 rounded-md px-4 py-2 ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-[#2E3A47] text-gray-400"
            }`}
          >
            {tab === "score"
              ? "Score"
              : tab === "level"
                ? "Level"
                : "Study Time"}
          </button>
        ))}
      </div>

      {/* Top 3 Users Section */}
      <div className="mb-8 flex items-end justify-center space-x-4">
        {/* Second place on the left */}
        <div className="flex h-48 w-32 flex-col items-center rounded-lg bg-[#2E3A47] p-4 text-center shadow-lg">
          <img
            src={userImages[secondPlace.id]}
            alt={secondPlace.username}
            className="mb-4 h-16 w-16 rounded-full"
          />
          <p className="text-xl font-bold text-blue-300">
            {activeTab === "score"
              ? secondPlace.score
              : activeTab === "level"
                ? secondPlace.level
                : secondPlace.study_hours.toFixed(2)}
          </p>
          <p className="text-sm text-gray-300">{secondPlace.username}</p>
          {/* {getRandomArrow()} */}
        </div>

        {/* First place in the middle */}
        <div className="relative flex h-64 w-40 scale-110 transform flex-col items-center rounded-lg bg-[#334155] p-6 text-center shadow-lg">
          <div className="absolute -top-6 flex items-center justify-center">
            <img
              src="https://img.icons8.com/emoji/48/000000/crown-emoji.png"
              alt="Crown"
              className="h-8 w-8"
            />
          </div>
          <img
            src={userImages[firstPlace.id]}
            alt={firstPlace.username}
            className="mb-4 h-24 w-24 rounded-full border-4 border-yellow-400"
          />
          <p className="text-2xl font-bold text-yellow-400">
            {activeTab === "score"
              ? firstPlace.score
              : activeTab === "level"
                ? firstPlace.level
                : firstPlace.study_hours.toFixed(2)}
          </p>
          <p className="text-sm text-gray-300">{firstPlace.username}</p>
          {/* {getRandomArrow()} */}
        </div>

        {/* Third place on the right */}
        <div className="flex h-48 w-32 flex-col items-center rounded-lg bg-[#2E3A47] p-4 text-center shadow-lg">
          <img
            src={userImages[thirdPlace.id]}
            alt={thirdPlace.username}
            className="mb-4 h-16 w-16 rounded-full"
          />
          <p className="text-xl font-bold text-green-300">
            {activeTab === "score"
              ? thirdPlace.score
              : activeTab === "level"
                ? thirdPlace.level
                : thirdPlace.study_hours.toFixed(2)}
          </p>
          <p className="text-sm text-gray-300">{thirdPlace.username}</p>
          {/* {getRandomArrow()} */}
        </div>
      </div>

      {/* Other Users Section */}
      <div className="rounded-lg bg-[#2E3A47] p-4 shadow-lg">
        {otherUsers.map((user, index) => (
          <div
            key={user.username}
            className="mb-4 flex items-center justify-between border-b border-gray-600 pb-2"
          >
            {/* Avatar and Username */}
            <div className="flex items-center">
              <img
                src={userImages[user.id]}
                alt={user.username}
                className="mr-4 h-12 w-12 rounded-full"
              />
              <div className="text-start">
                <h1 className="text-lg font-semibold">{user.username} </h1>
                <p className="text-lg font-semibold">
                  {user.firstname} {user.lastname}
                </p>
              </div>
            </div>
            {/* score/Level/Study Time */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                {activeTab === "score"
                  ? user.score
                  : activeTab === "level"
                    ? user.level
                    : user.study_hours.toFixed(2)}
              </p>
              {/* Random Arrow */}
              {/* {getRandomArrow()} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardComponent;
