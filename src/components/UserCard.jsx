import React from "react";

const UserCard = ({ prop }) => {
  return (
    <div className="flex h-auto w-full flex-wrap gap-4 rounded-md border bg-secondary-color4/50 p-2 duration-200 hover:scale-105 md:w-60">
      <div className="relative">
        <img
          src="https://avatar.iran.liara.run/public/42"
          alt="Avatar"
          className="h-16 w-16 rounded-full"
        />
        <h3 className="text-lg font-semibold text-foreground">
          {prop.firstname} {prop.lastname}
        </h3>
      </div>
      <div className="flex flex-col items-start">
        <ul className="list-inside list-disc">
          <li className="text-xs font-bold text-primary">Rank: 1</li>
          <li className="text-xs text-foreground">Score: {prop.score}</li>
          <li className="text-xs text-foreground">Courses: 5</li>
          <li className="text-xs text-foreground">Level: {prop.level}</li>
          <li className="text-xs text-foreground">
            Studytime: {prop.study_hours}
          </li>
        </ul>
      </div>
      {/* <div className="flex items-center gap-2">
              <Button label="view" variant="link" size="sm" />
              <Button label="Message" variant="link" size="sm" />
            </div> */}
    </div>
  );
};

export default UserCard;
