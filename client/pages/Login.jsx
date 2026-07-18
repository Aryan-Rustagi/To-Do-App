import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../src/styles/auth.css';

function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [message, setMessage] = useState('');
    var navigate = useNavigate();

    useEffect(function() {
        var token = localStorage.getItem('token');
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

    async function handleLogin(event) {
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

        try {
            var response = await axios.post('http://localhost:5000/api/auth/login', {
                email: email,
                password: password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email || email);
            setMessage('Login successful!');
            navigate('/todo');
        } catch (err) {
            setMessage(
                (err.response && err.response.data && err.response.data.message)
                    ? err.response.data.message
                    : 'Login failed. Please check your credentials.'
            );
        }
    }

    var isSuccess = message === 'Login successful!';

    return (
        <div className="auth-page">
            <div className="auth-logo-wrap">
                <div className="auth-logo-icon">&#10003;</div>
                <span className="auth-logo-text">TaskFlow</span>
            </div>

            <div className="auth-card">
                <h2 className="auth-heading">Welcome back</h2>
                <p className="auth-subheading">Sign in to access your tasks</p>

                {message !== '' && (
                    <div className={'auth-message ' + (isSuccess ? 'success' : 'error')}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="login-email">Email address</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={handleEmailChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="btn-primary btn-full">Sign In</button>
                </form>

                <p className="auth-footer-text">
                    Don't have an account? <Link to="/signup" className="auth-link">Create one</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
