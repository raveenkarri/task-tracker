import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

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
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", margin: "8px 0", padding: "10px" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", margin: "8px 0", padding: "10px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          Login
        </button>
        <button onClick={()=> navigate("/register")}>If not Registerd Click here</button>
      </form>
    </div>
  );
};

export default Login;
