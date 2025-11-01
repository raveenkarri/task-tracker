import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import './index.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = Cookies.get("jwtToken");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        username,
        password,
      });

      const token = response.data.jwtToken;

      if (token) {
        Cookies.set("jwtToken", token, { expires: 30 });
        navigate("/", { replace: true });
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-btn">
          Login
        </button>

        <button
          type="button"
          className="login-register-btn"
          onClick={() => navigate("/register")}
        >
          Not Registered? Click Here
        </button>
      </form>
    </div>
  );
};

export default Login;
