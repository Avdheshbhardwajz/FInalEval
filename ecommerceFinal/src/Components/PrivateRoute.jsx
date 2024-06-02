import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authcontext";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  return auth.isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
