import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [isfetching, setIsfetching] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const validateForm = (e) => {
    let formIsValid = true;
    if (!user.username.match("^[a-zA-Z0-9_ ]*$")) {
      formIsValid = false;
      setError(true);
      setErrorMsg("Name must be alphabet");
    }

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      formIsValid = false;
      setError(true);
      setErrorMsg("Plase give a valid email");
    }

    if (user.password.length < 6) {
      formIsValid = false;
      setError(true);
      setErrorMsg("Password length should be greater than or equal to 6");
    }

    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.username === "" || user.email === "" || user.password === "") {
      setError(true);
      setErrorMsg("Please provide all the Details");
    } else if (!validateForm()) {
      setError(true);
    } else {
      setError(false);
      try {
        setIsfetching(true);
        const res = await axios.post(
          "https://blog-app-backend-pgpv.onrender.com/api/auth/register",
          user
        );
        res.data && navigate("/login");
        setIsfetching(false);
      } catch (err) {
        setError(true);
        setErrorMsg("Username or Email is already present");
        setIsfetching(false);
      }
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email..."
          className="registerInput"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          className="registerInput"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        {isfetching}
        <button className="registerButton" type="submit" disabled={isfetching}>
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
          {errorMsg}
        </span>
      )}
    </div>
  );
};

export default Register;
