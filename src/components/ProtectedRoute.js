import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  return decodedToken.exp * 1000 < Date.now();
};

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token } = useSelector((state) => state.login);
  const storedToken = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  console.log("Token from Redux:", token);
  console.log("UserId from localStorage:", localStorage.getItem("userId"));

  // Check if the token is missing or expired
  if ((!token && !storedToken) || isTokenExpired(token || storedToken)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  // Check if the user role matches the required role
  if (requiredRole && !requiredRole.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
