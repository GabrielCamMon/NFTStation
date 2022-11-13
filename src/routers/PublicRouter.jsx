import React from "react";
import { Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";

export const PublicRouter = ({
  isAuthenticated = true,
  redirectPath = "/",
  children,
}) => {
  return !isAuthenticated ? <Navigate to={redirectPath} /> : children;
};

export default PublicRouter;
