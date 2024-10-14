import React from "react";
import { useAuth } from "./useAuth";
import { Navigate } from "react-router-dom";

function AdminGuard({ children }) {
  const { isLoggedIn, isAdmin } = useAuth();

  return isLoggedIn && isAdmin ? children : <Navigate to="/login" replace />;
}

export default AdminGuard;
