import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const { dispatch, isFetching } = useContext(Context);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setLoginCredentials((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginCredentials.username === "" || loginCredentials.password === "") {
      setError(true);
      setErrorMsg("Please provide all the Details");
    } else {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          "https://blog-app-backend-pgpv.onrender.com/api/auth/login",
          loginCredentials
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        res.data && navigate("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setErrorMsg("Wrong Username or Password");
      }
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username..."
          className="loginInput"
          name="username"
          value={loginCredentials.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          className="loginInput"
          name="password"
          value={loginCredentials.password}
          onChange={handleChange}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>

        {error && (
          <span style={{ marginTop: "10px", fontWeight: "bold", color: "red" }}>
            {errorMsg}
          </span>
        )}
      </form>
      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
