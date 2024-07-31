import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    console.log(userData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        console.log(response);
        localStorage.setItem("token", response.data.authorisation.token);
        localStorage.setItem("username", response.data.user.name);  // Store the username
        //
        //localStorage.setItem("user_id", response.data.user.id);
        //
        navigate("/profile");
      } else {
        alert(response.data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-card">
        <h2>Sign Up Human!</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="enter a password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Log In</button>
        </form>
        <p className="login-link" onClick={() => navigate("/signup")}>
          Don't have an account? Signup
        </p>
      </div>
      <img
        src={`http://localhost:3000/images/snake.png`}
        alt="snake"
        className="snake-image"
      />
    </div>
  );
};

export default Login;
