import React from "react";
import { useAuth } from "./useAuth";
import { Navigate } from "react-router-dom";
import Toast from "../components/Toast";

function AdminGuard({ children }) {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) {
    Toast("You need to login first", "error");
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    Toast("Access denied. Admins only.", "error");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminGuard;
