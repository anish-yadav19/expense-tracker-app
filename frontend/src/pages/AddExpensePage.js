// src/pages/AddExpensePage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

const AddExpensePage = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddExpense = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await apiClient.post('/expenses', {
                description,
                amount: parseFloat(amount),
                category,
                expense_date: new Date().toISOString().slice(0, 10),
            });
            navigate('/view-expenses');
        } catch (err) {
            setError('Failed to add expense. Please check your inputs.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="content-wrapper">
            <header className="navbar">
                <h1>Add Expense</h1>
                <nav className="navbar-nav">
                    <Link to="/view-expenses">View Expenses</Link>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </nav>
            </header>
            
            <div className="form-container">
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleAddExpense} className="expense-form">
                    
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input 
                            type="text" 
                            id="description"
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            placeholder="e.g., Lunch with client" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount">Amount (₹)</label>
                        <input 
                            type="number" 
                            id="amount"
                            step="0.01" 
                            value={amount} 
                            onChange={e => setAmount(e.target.value)} 
                            placeholder="e.g., 500.00" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <button type="submit">Add Expense</button>
                </form>
            </div>
        </div>
    );
};

export default AddExpensePage;