import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/styles/landing.css';

function Landing() {
    var navigate = useNavigate();

    function goToLogin() {
        navigate('/login');
    }

    function goToSignup() {
        navigate('/signup');
    }

    return (
        <div className="landing-container">
            <header className="landing-header">
                <div className="logo-wrap">
                    <div className="logo-icon">&#10003;</div>
                    <span className="logo-text">TaskFlow</span>
                </div>
                <nav className="landing-nav">
                    <button className="btn-outline" onClick={goToLogin}>Sign In</button>
                    <button className="btn-primary" onClick={goToSignup}>Get Started</button>
                </nav>
            </header>

            <main className="landing-main">
                <div className="landing-hero">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Simple. Focused. Productive.
                    </div>
                    <h1 className="hero-title">
                        Organize your work<br />
                        <span className="hero-accent">effortlessly.</span>
                    </h1>
                    <p className="hero-subtitle">
                        TaskFlow helps you stay focused and accomplish your daily goals.
                        Create a free account or sign in to start tracking now.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary btn-lg" onClick={goToSignup}>Create Free Account</button>
                        <button className="btn-outline btn-lg" onClick={goToLogin}>Sign In</button>
                    </div>
                </div>

                <div className="landing-features">
                    <div className="feature-card">
                        <div className="feature-icon">&#9998;</div>
                        <h3>Create Tasks</h3>
                        <p>Add tasks with a title and description in seconds.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">&#10003;</div>
                        <h3>Track Progress</h3>
                        <p>Mark tasks complete and stay on top of your goals.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">&#128274;</div>
                        <h3>Secure Account</h3>
                        <p>Your data is protected with secure authentication.</p>
                    </div>
                </div>
            </main>

            <footer className="landing-footer">
                &copy; {new Date().getFullYear()} TaskFlow Inc. All rights reserved.
            </footer>
        </div>
    );
}

export default Landing;