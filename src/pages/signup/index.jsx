import React, { useState } from "react";
import "./style.css";
import { routes } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    console.log(userData);
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/register/",
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status === "success") {
          navigate(routes.login);
        } else {
          alert(
            response.data.error || "Registration failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="sign-up-container">
      <div className="sign-up-card">
        <h2>Sign Up Human!</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              placeholder="enter your full name here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
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
          <label>
            Confirm Password
            <input
              type="password"
              placeholder="re-enter password here"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link" onClick={() => navigate(routes.login)}>
          Already have an account? Login
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

export default SignUp;
