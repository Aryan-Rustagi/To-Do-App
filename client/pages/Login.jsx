import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "") {
            setMessage("Please enter the email");
            return;
        } else if (password === "") {
            setMessage("Please enter the password");
            return;
        } else {
            setEmail("");
            setPassword("");
            setMessage("");
            alert("Login succesful");
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
            <Link to="/">Back to Landing</Link>
        </div>
    );
}

export default Login;
