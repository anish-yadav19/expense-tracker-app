// src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { FiMail } from 'react-icons/fi';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const res = await apiClient.post('/auth/forgot-password', { email });
            setMessage(res.data.message);
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Reset Password</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FiMail className="icon" />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
                    </div>
                    <button type="submit">Send Reset Link</button>
                </form>
                <div className="form-footer">
                    <p>Remembered your password? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;