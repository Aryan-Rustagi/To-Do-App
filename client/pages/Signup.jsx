import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import axios from 'axios';
import '../src/styles/auth.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(function() {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/todo');
        }
    }, [navigate]);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
    }

    function togglePassword(){
        setShowPassword(!showPassword);
    }

    function toggleConfirmPassword(){
        setShowConfirmPassword(!showConfirmPassword);
    }

    async function handleSignup(event) {
        event.preventDefault();
        setMessage('');

        if (email === '') {
            setMessage('Please enter your email');
            return;
        }

        if (password === '') {
            setMessage('Please enter your password');
            return;
        }

        if (confirmPassword === '') {
            setMessage('Please confirm your password');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        var API_BASE = import.meta.env.DEV ? 'http://localhost:5000' : 'https://to-do-app-erhn.onrender.com';

        try {
            var response = await axios.post(API_BASE + '/api/auth/register', {
                email: email,
                password: password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email || email);
            setMessage('Account created! Redirecting...');
            navigate('/todo');
        } catch (err) {
            setMessage(
                (err.response && err.response.data && err.response.data.message)
                    ? err.response.data.message
                    : 'Registration failed. Please try again.'
            );
        }
    }

    var isSuccess = message.indexOf('Account created') !== -1;

    return (
        <div className="auth-page">
            <div className="auth-logo-wrap">
                <div className="auth-logo-icon">&#10003;</div>
                <span className="auth-logo-text">TaskFlow</span>
            </div>

            <div className="auth-card">
                <h2 className="auth-heading">Create your account</h2>
                <p className="auth-subheading">Start organizing your tasks for free</p>

                {message !== '' && (
                    <div className={'auth-message ' + (isSuccess ? 'success' : 'error')}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSignup} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="signup-email">Email address</label>
                        <input
                            id="signup-email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={handleEmailChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
    <label htmlFor="signup-password">Password</label>

    <input
        id="signup-password"
        type={showPassword ? "text" : "password"}
        placeholder="Create a password"
        value={password}
        onChange={handlePasswordChange}
        className="form-input"
    />

    <button
        type="button"
        onClick={togglePassword}
    >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
</div>
                  <div className="form-group">
    <label htmlFor="signup-confirm">Confirm Password</label>

    <input
        id="signup-confirm"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        className="form-input"
    />

    <button
        type="button"
        onClick={toggleConfirmPassword}
    >
        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
</div>
                    <button type="submit" className="btn-primary btn-full">Create Account</button>
                </form>

                <p className="auth-footer-text">
                    Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;