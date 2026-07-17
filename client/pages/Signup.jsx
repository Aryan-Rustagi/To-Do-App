import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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

    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setMessage("");

        // Validation
        if (!email.trim()) {
            setMessage("Please enter your email");
            setIsLoading(false);
            return;
        }
        if (!password.trim()) {
            setMessage("Please enter your password");
            setIsLoading(false);
            return;
        }
        if (!confirmpassword.trim()) {
            setMessage("Please confirm your password");
            setIsLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            setMessage("Passwords do not match!");
            setIsLoading(false);
            return;
        }
        if (password.length < 6) {
            setMessage("Password must be at least 6 characters");
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(function() {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setMessage("Signup successful! 🎉");
            setIsLoading(false);
            alert("Account created successfully!");
            // navigate('/login');
        }, 1000);
    }

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h1>Don't have an account?</h1>
            <h3>Create your account here</h3>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={handleEmailChange}
                        required
                        style={{ 
                            width: '100%', 
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        style={{ 
                            width: '100%', 
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmpassword}
                        onChange={handleConfirmPasswordChange}
                        required
                        style={{ 
                            width: '100%', 
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{ 
                        width: '100%', 
                        padding: '10px',
                        background: isLoading ? '#ccc' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        fontSize: '16px'
                    }}
                >
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                </button>

                {message && (
                    <p style={{ 
                        marginTop: '10px', 
                        color: message.includes('successful') ? 'green' : 'red',
                        textAlign: 'center'
                    }}>
                        {message}
                    </p>
                )}

                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;