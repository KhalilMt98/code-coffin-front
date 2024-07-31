import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <nav className="navbar">
                <img src="http://localhost:3000/images/CodeCoffinLogo.png" alt="CodeCoffin Logo" className="logo" />
                <div className="auth-buttons">
                    <Link to="/signup" className="sign-up-button">Sign Up</Link>
                    <Link to="/login" className="login-button">Login</Link>
                </div>
            </nav>
            <header className="hero-section" style={{ backgroundImage: `url(http://localhost:3000/images/HeroImage.png)` }}>
                <div className="hero-content">
                    <h1 className="hero-title">CodeCoffin</h1>
                    <p className="hero-subtitle">Indent or Die!</p>
                </div>
            </header>
            <main className="content">
                <section className="welcome-section">
                    <h2 className="welcome-title">Welcome!</h2>
                    <p className="welcome-text">
                        Step into the eerie world of CodeCoffin™, where your Python skills are put to the ultimate test and every indentation could be your last.
                    </p>
                </section>
                <section className="features-section">
                    <h3 className="features-title">Haunting Features:</h3>
                    <ul className="features-list">
                        <li><strong>Serpentine Autocomplete:</strong> Our AI slithers through your code, offering suggestions and spectral completions that guide your way.</li>
                        <li><strong>Phantom Corrections:</strong> Errors are no match for our correction suggestions from the spirits of coders past.</li>
                        <li><strong>Creepy Compilation:</strong> Hit the Run button—shaped like a skull—and watch as your code comes to life... or descends into the depths of the underworld. Will you conquer the darkness, or will the shadows claim your logic?</li>
                        <li><strong>Personalize Your Haunt:</strong> Choose from a variety of creepy avatars to make this coding environment your own.</li>
                    </ul>
                </section>
                <section className="signup-section">
                    <p>Sign Up if you dare, and remember: Indent or Die!</p>
                </section>
            </main>
            <footer className="footer">
                <div className="footer-content">
                    <img src="http://localhost:3000/images/CodeCoffinLogo.png" alt="CodeCoffin Logo" className="footer-logo" />
                    <p>Follow Us on Social Media!</p>
                    <div className="social-icons">
                        <img src="http://localhost:3000/images/Facebook.png" alt="Facebook" className="social-icon" />
                        <img src="http://localhost:3000/images/Youtube.png" alt="YouTube" className="social-icon" />
                        <img src="http://localhost:3000/images/Twitter.png" alt="Twitter" className="social-icon" />
                        <img src="http://localhost:3000/images/Instagram.png" alt="Instagram" className="social-icon" />
                    </div>
                </div>
                <div className="footer-links">
                    <a href="#terms">Terms</a>
                    <a href="#privacy">Privacy</a>
                    <a href="#security">Security</a>
                    <a href="#contact">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
