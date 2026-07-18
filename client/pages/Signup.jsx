import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
    }

    async function handleSignup(event) {
        event.preventDefault();
        
        if (email === "") {
            setMessage("Please enter your email");
            return;
        } else if (password === "") {
            setMessage("Please enter your password");
            return;
        } else if (confirmpassword === "") {
            setMessage("Please confirm your password");
            return;
        } else if (password !== confirmpassword) {
            setMessage("Passwords do not match!");
            return;
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/register', {
                    email: email,
                    password: password
                });

                localStorage.setItem('token', response.data.token);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setMessage("Signup successful! 🎉");
                navigate('/login');
            } catch(err) {
                setMessage(err.response?.data?.message || "Registration failed. Please try again.");
            }
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input 
                    title='Email'
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={handleEmailChange}
                />

                <input
                    title='Password'
                    type='password'
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />

                <input
                    title='Confirm Password'
                    type='password'
                    placeholder="Confirm Password"
                    value={confirmpassword}
                    onChange={handleConfirmPasswordChange}
                />

                <button type="submit">Sign Up</button>
                <p>{message}</p>
            </form>
            <div style={{ marginTop: '10px' }}>
                <Link to="/login">Already have an account? Log in</Link>
                <br /><br />
                <Link to="/">Back to Landing</Link>
            </div>
        </div>
    );
}

export default Signup;