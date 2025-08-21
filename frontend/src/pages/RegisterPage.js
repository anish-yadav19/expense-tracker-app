// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await apiClient.post('/auth/register', { username, email, password });
            navigate('/login');
        } catch (err) {
            setError('Failed to register. Email or username may already be taken.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Create Account</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <FiUser className="icon" />
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                    </div>
                    <div className="input-group">
                        <FiMail className="icon" />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required />
                    </div>
                    <div className="input-group">
                        <FiLock className="icon" />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <div className="form-footer">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;