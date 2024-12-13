import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useAppContext } from "../contexts/AppContext";

const ProtectedRoute = ({ children }) => {
  const { login } = useAuth();
  const token = localStorage.getItem("x-access-token");
  const { getUsername } = useAppContext();

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    login(token);
    getUsername(token);
    return children;
  }
};

export default ProtectedRoute;
