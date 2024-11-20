import React from "react";
import { useAuth } from "./useAuth";
import { Navigate } from "react-router-dom";
import Toast from "../components/Toast";

function RouteGuard({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    Toast("You need to login first", "error");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RouteGuard;
