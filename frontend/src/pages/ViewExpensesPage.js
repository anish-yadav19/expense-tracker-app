// src/pages/ViewExpensesPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

const ViewExpensesPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchExpenses = useCallback(async () => {
        try {
            const res = await apiClient.get('/expenses');
            setExpenses(res.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                handleLogout();
            } else {
                setError('Failed to fetch expenses.');
            }
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);
    
    const handleDelete = async (id) => {
        try {
            await apiClient.delete(`/expenses/${id}`);
            fetchExpenses();
        } catch (err) {
            setError('Failed to delete expense.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    
    const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    return (
        <div className="page-container">
            <header className="navbar">
                <h1>Your Expenses</h1>
                <nav className="navbar-nav">
                    <Link to="/add-expense">Add Expense</Link>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </nav>
            </header>
            
            <div className="expense-list-container">
                <div className="expense-list-header">
                     <h3>All Recorded Expenses</h3>
                     <div className="total-expenses">Total: ₹{totalExpenses.toFixed(2)}</div>
                </div>
                 {error && <p className="error-message">{error}</p>}
                <ul className="expense-list">
                    {expenses.length > 0 ? expenses.map(exp => (
                        <li key={exp.id} className="expense-item">
                            <span className="expense-date">{new Date(exp.expense_date).toLocaleDateString()}</span>
                            <span className="expense-desc">{exp.description}</span>
                            <span className="expense-category">{exp.category}</span>
                            <span className="expense-amount">₹{parseFloat(exp.amount).toFixed(2)}</span>
                            <button onClick={() => handleDelete(exp.id)} className="delete-button">X</button>
                        </li>
                    )) : <p>No expenses recorded yet. <Link to="/add-expense">Add one now!</Link></p>}
                </ul>
            </div>
        </div>
    );
};

export default ViewExpensesPage;