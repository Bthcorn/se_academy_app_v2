import React, { useContext } from "react";
import { AuthContext, useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function RouteGuard({ children, roles }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default RouteGuard;
