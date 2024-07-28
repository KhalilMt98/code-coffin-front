import React, { useEffect, useState } from "react";
import "./style.css";
import { routes } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    }
  }, [navigate]);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === "success") {
        const userRole = response.data.user.role;
        if (userRole === "user") {
          navigate("/user");
        } else {
          navigate("/admin");
        }
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Token verification error:", error);
      localStorage.removeItem("token");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {email, password };
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
          console.log(response)
          localStorage.setItem("token",response.data.authorisation.token);
          if(response.data.user.role ==="user"){
            navigate("/user");}
          else{
            navigate("/admin")
          }
        } else {
          alert(
            response.data.error || "Registration failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Registration error:", error);
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
        <p className="login-link" onClick={() => navigate(routes.signup)}>
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
