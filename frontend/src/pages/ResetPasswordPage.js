// src/pages/ResetPasswordPage.js
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { FiLock } from 'react-icons/fi';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const res = await apiClient.post(`/auth/reset-password/${token}`, { password });
            setMessage(res.data.message);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError('Failed to reset password. The link may be invalid or expired.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>New Password</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FiLock className="icon" />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter new password" required />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
                 <div className="form-footer">
                    <p><Link to="/login">Back to Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;