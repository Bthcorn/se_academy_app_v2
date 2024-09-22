import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function UCousesDetails() {
  const { courseId } = useParams();

  useEffect(() => {
    console.log(courseId);
  });

  return <div>UCousesDetails {courseId}</div>;
}

export default UCousesDetails;
