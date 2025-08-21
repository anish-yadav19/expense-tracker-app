// controllers/expenseController.js
const db = require('../config/db');

exports.getExpenses = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM expenses WHERE user_id = $1 ORDER BY expense_date DESC', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addExpense = async (req, res) => {
  const { description, amount, category, expense_date } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO expenses (user_id, description, amount, category, expense_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, description, amount, category, expense_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const result = await db.query('DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *', [req.params.id, req.user.id]);
    if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Expense not found or user not authorized' });
    }
    res.status(204).send(); // 204 No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};