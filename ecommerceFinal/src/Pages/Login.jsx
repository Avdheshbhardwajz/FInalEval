import React, { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Components/authcontext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const emailRef = useRef();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/login",
        {
          email,
          password,
        }
      );
      login(email, response.data.token);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <div>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
