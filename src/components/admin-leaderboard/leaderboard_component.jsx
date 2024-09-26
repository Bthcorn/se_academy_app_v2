import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'; // Icons for the arrows

const LeaderboardComponent = ({ users }) => {
  const [activeTab, setActiveTab] = useState('points'); // Default sorting by points

  
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // PS. FROM SPOON // This should not be random, this is only for the sake of designing. Normally,it should compare wheather the rank had recently moved up or down, if that user's rank was moved up, the arrow is green otherwise red.
  const getRandomArrow = () => (Math.random() > 0.5 ? <ArrowUpRight className="text-green-400" /> : <ArrowDownRight className="text-red-400" />);
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



  // Sort users based on active tab (level, points, total_studytime)
  const sortedUsers = [...users].sort((a, b) => {
    if (activeTab === 'level') return b.level - a.level;
    if (activeTab === 'studytime') return b.total_studytime - a.total_studytime;
    return b.points - a.points; // Default is points
  });

  // The user with the highest score is the first in sortedUsers
  const firstPlace = sortedUsers[0];
  const secondPlace = sortedUsers[1];
  const thirdPlace = sortedUsers[2];

  // Rest of the users for the leaderboard list
  const otherUsers = sortedUsers.slice(3);

  return (
    <div className="p-6 text-white bg-[#1E293B] rounded-lg shadow-lg w-full">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        {['points', 'level', 'studytime'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 mx-2 rounded-md ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-[#2E3A47] text-gray-400'
            }`}
          >
            {tab === 'points' ? 'Points' : tab === 'level' ? 'Level' : 'Study Time'}
          </button>
        ))}
      </div>

      {/* Top 3 Users Section */}
      <div className="flex justify-center items-end space-x-4 mb-8">
        {/* Second place on the left */}
        <div className="flex flex-col items-center bg-[#2E3A47] p-4 rounded-lg shadow-lg w-32 h-48 text-center">
          <img
            src={secondPlace.avatar_image}
            alt={secondPlace.username}
            className="w-16 h-16 rounded-full mb-4"
          />
          <p className="text-xl font-bold text-blue-300">
            {activeTab === 'points'
              ? secondPlace.points
              : activeTab === 'level'
              ? secondPlace.level
              : secondPlace.total_studytime}
          </p>
          <p className="text-sm text-gray-300">{secondPlace.username}</p>
          {getRandomArrow()}
        </div>

        {/* First place in the middle */}
        <div className="relative flex flex-col items-center bg-[#334155] p-6 rounded-lg shadow-lg w-40 h-64 text-center transform scale-110">
          <div className="absolute -top-6 flex justify-center items-center">
            <img
              src="https://img.icons8.com/emoji/48/000000/crown-emoji.png"
              alt="Crown"
              className="w-8 h-8"
            />
          </div>
          <img
            src={firstPlace.avatar_image}
            alt={firstPlace.username}
            className="w-24 h-24 rounded-full mb-4 border-4 border-yellow-400"
          />
          <p className="text-2xl font-bold text-yellow-400">
            {activeTab === 'points'
              ? firstPlace.points
              : activeTab === 'level'
              ? firstPlace.level
              : firstPlace.total_studytime}
          </p>
          <p className="text-sm text-gray-300">{firstPlace.username}</p>
          {getRandomArrow()}
        </div>

        {/* Third place on the right */}
        <div className="flex flex-col items-center bg-[#2E3A47] p-4 rounded-lg shadow-lg w-32 h-48 text-center">
          <img
            src={thirdPlace.avatar_image}
            alt={thirdPlace.username}
            className="w-16 h-16 rounded-full mb-4"
          />
          <p className="text-xl font-bold text-green-300">
            {activeTab === 'points'
              ? thirdPlace.points
              : activeTab === 'level'
              ? thirdPlace.level
              : thirdPlace.total_studytime}
          </p>
          <p className="text-sm text-gray-300">{thirdPlace.username}</p>
          {getRandomArrow()}
        </div>
      </div>

      {/* Other Users Section */}
      <div className="bg-[#2E3A47] p-4 rounded-lg shadow-lg">
        {otherUsers.map((user, index) => (
          <div
            key={user.username}
            className="flex items-center justify-between mb-4 pb-2 border-b border-gray-600"
          >
            {/* Avatar and Username */}
            <div className="flex items-center">
              <img
                src={user.avatar_image}
                alt={user.username}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="text-center">
                <p className="text-lg font-semibold">{user.username}</p>
              </div>
            </div>
            {/* Points/Level/Study Time */}
            <div className="flex items-center">
              <p className="text-lg font-semibold mr-2">
                {activeTab === 'points'
                  ? user.points
                  : activeTab === 'level'
                  ? user.level
                  : user.total_studytime}
              </p>
              {/* Random Arrow */}
              {getRandomArrow()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardComponent;
