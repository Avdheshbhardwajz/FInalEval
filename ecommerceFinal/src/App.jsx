import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, AuthContext } from "./Components/authcontext";
import PrivateRoute from "./Components/PrivateRoute";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Error from "./Pages/Error";
import Details from "./Pages/Details";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav>
      {auth.isAuthenticated ? (
        <>
          <span>{auth.email}</span>
          <Link to="/home">Home</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <PrivateRoute>
                <Details />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
