// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { FiMail, FiLock } from 'react-icons/fi'; // Import icons

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await apiClient.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/add-expense');
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Log In</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <FiMail className="icon" />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required />
                    </div>
                    <div className="input-group">
                        <FiLock className="icon" />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <button type="submit">Login to your account</button>
                </form>
                <div className="form-footer">
                    <p>New here? <Link to="/register">Sign up!</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;