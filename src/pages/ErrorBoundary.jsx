import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="container flex min-h-screen">
      <div className="mx-auto inline-flex w-80 items-center justify-center gap-4 md:w-full">
        <h1 className="text-xl font-bold text-accent-foreground md:text-2xl">
          {error.status || "Error"}
        </h1>
        <div className="h-16 border"></div>
        <h2 className="text-lg font-medium leading-relaxed text-accent-foreground underline md:text-xl">
          {error.statusText || "Something went wrong"}
        </h2>
        <p className="text-sm font-normal text-accent-foreground md:text-base">
          {error.message || "Please try again later"}
        </p>
      </div>
    </div>
  );
};

export default ErrorBoundary;
