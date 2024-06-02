import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    email: null,
  });

  const navigate = useNavigate();

  const login = (email, token) => {
    setAuth({ isAuthenticated: true, token, email });
    navigate("/home");
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, token: null, email: null });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
