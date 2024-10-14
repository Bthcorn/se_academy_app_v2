import React, { useContext } from "react";
import { useAuth } from "./useAuth";
import { Navigate, Outlet } from "react-router-dom";

function RouteGuard({ children }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default RouteGuard;
