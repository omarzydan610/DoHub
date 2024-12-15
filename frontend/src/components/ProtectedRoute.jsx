import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("x-access-token");
  const { getUsername } = useAppContext();

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    console.log(token);
    getUsername(token);
    return children;
  }
};

export default ProtectedRoute;
