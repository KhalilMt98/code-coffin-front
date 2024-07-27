import React from 'react';
import './style.css';
const SignUp = () => {
  return (
    <div className="sign-up-container">
      <div className="sign-up-card">
        <h2>Sign Up Human!</h2>
        <form>
          <label>
            Full Name
            <input type="text" placeholder="enter your full name here" required/>
          </label>
          <label>
            Email
            <input type="email" placeholder="enter your email here" required/>
          </label>
          <label>
            Password
            <input type="password" placeholder="enter a password here" required />
          </label>
          <label>
            Confirm Password
            <input type="password" placeholder="re-enter password here" required />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      <img src={`${process.env.PUBLIC_URL}/images/snake.png`} alt="snake" className="snake-image" />
    </div>
  );
}

export default SignUp;
