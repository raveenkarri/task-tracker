import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h1>Logo</h1>
      <button onClick={handleLogin}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Header;
