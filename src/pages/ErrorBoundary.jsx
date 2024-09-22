import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="container flex min-h-screen">
      <div className="mx-auto inline-flex w-80 items-center justify-center gap-4 md:w-full">
        <h1 className="text-accent-foreground text-xl font-bold md:text-2xl">
          {error.status || "Error"}
        </h1>
        <div className="h-16 border"></div>
        <h2 className="text-accent-foreground text-lg font-medium leading-relaxed underline md:text-xl">
          {error.statusText || "Something went wrong"}
        </h2>
      </div>
    </div>
  );
};

export default ErrorBoundary;
