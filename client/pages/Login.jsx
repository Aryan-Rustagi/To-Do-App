import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === "") {
            setMessage("Please enter the email");
            return;
        } else if (password === "") {
            setMessage("Please enter the password");
            return;
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    email,
                    password
                });
                
                localStorage.setItem('token', response.data.token);
                setEmail("");
                setPassword("");
                setMessage("Login successful!");
                navigate('/todo');
            } catch (err) {
                setMessage(err.response?.data?.message || "Login failed. Please check your credentials.");
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    title='Email'
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    title='Password'
                    type='password'
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
                <p>{message}</p>
            </form>
            <div style={{ marginTop: '10px' }}>
                <Link to="/signup">Don't have an account? Sign up</Link>
                <br /><br />
                <Link to="/">Back to Landing</Link>
            </div>
        </div>
    );
}

export default Login;
