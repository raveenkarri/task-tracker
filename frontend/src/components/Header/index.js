import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("jwtToken"));

  const navigate = useNavigate();

  const handleLogin = () => {
    if (isLoggedIn) {
      Cookies.remove("jwtToken");
      setIsLoggedIn(false);
      navigate("/login", { replace: true });
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    setIsLoggedIn(!!Cookies.get("jwtToken"))
  },[]);

  return (
    <header className="header-bar">
      <div className="header-logo" onClick={() => navigate("/")}>
        <h1>Task Manager</h1>
      </div>

      <nav className="header-nav">
        {isLoggedIn && (
          <>
            <button className="header-nav-btn" onClick={() => navigate("/")}>
              Home
            </button>
            <button
              className="header-nav-btn"
              onClick={() => navigate("/taskForm")}
            >
              Add Task
            </button>
          </>
        )}
        <button className="header-login-btn" onClick={handleLogin}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
