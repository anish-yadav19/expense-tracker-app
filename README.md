# Full-Stack Expense Tracker Application ExpenseTracker

A complete web application designed to help users track and manage their daily expenses. This project features a secure user authentication system and a clean, interactive user interface for adding and viewing expenses.

## Features

* **User Authentication:** Secure user registration and login system.
* **Password Reset:** "Forgot Password" functionality with token-based password reset.
* **Expense Management:** Full CRUD (Create, Read, Delete) functionality for expenses.
* **Categorization:** Users can categorize each expense (e.g., Food, Transport, Utilities).
* **RESTful API:** A well-structured backend API to handle all data operations.
* **Responsive UI:** A modern and clean user interface built with React.

## Tech Stack

* **Frontend:**
    * React.js
    * React Router for navigation
    * Axios for API requests
* **Backend:**
    * Node.js
    * Express.js
    * PostgreSQL (with the `pg` library)
    * JWT (JSON Web Tokens) for authentication
    * bcrypt.js for password hashing
* **Database:**
    * PostgreSQL

## Screenshots

<table>
  <tr>
    <td align="center"><strong>Login Page</strong></td>
    <td align="center"><strong>Add Expense Page</strong></td>
     <td align="center"><strong>View Expenses Page</strong></td>
  </tr>
  <tr>
    <td><img src="URL_TO_YOUR_LOGIN_SCREENSHOT" width="270"></td>
    <td><img src="URL_TO_YOUR_ADD_EXPENSE_SCREENSHOT" width="270"></td>
    <td><img src="URL_TO_YOUR_VIEW_EXPENSES_SCREENSHOT" width="270"></td>
  </tr>
</table>

*(To add your screenshots, upload the images to your GitHub repository and replace the `URL_TO_YOUR_...` placeholders with the image links.)*

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

You must have the following software installed:
* [Node.js](https://nodejs.org/) (which includes npm)
* [PostgreSQL](https://www.postgresql.org/download/)
* [Git](https://git-scm.com/downloads)

### 1. Backend Setup

First, set up the database and the server.

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/expense-tracker-app.git](https://github.com/your-username/expense-tracker-app.git)
cd expense-tracker-app/backend

# 2. Install dependencies
npm install

# 3. Set up the database
#    - Connect to PostgreSQL using psql
psql -U postgres

#    - Run the following SQL commands to create the database and tables
CREATE DATABASE expensedb;
\c expensedb
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMPTZ
);
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    category VARCHAR(100) DEFAULT 'Uncategorized',
    expense_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
\q

# 4. Create your environment file
#    - In the /backend folder, create a new file named .env
#    - Copy the contents of .env.example (or the block below) into it
#    - Make sure to add your actual database password
```

**`.env` file contents:**
```env
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=expensedb
DB_PASSWORD=your_postgres_password
DB_PORT=5432
JWT_SECRET=thisisareallylongandsecretkeyforjwt
```

```bash
# 5. Run the backend server
npm start
```
The backend server should now be running on `http://localhost:5000`.

### 2. Frontend Setup

Now, set up the React user interface.

```bash
# 1. Open a new terminal and navigate to the frontend folder
cd ../frontend

# 2. Install dependencies
npm install

# 3. Run the frontend application
npm start
```
Your browser will automatically open to `http://localhost:3000`, and you can now use the application.

## API Endpoints

The backend server exposes the following RESTful API endpoints.

| Method | Endpoint                    | Description                           | Protected |
|--------|-----------------------------|---------------------------------------|-----------|
| `POST` | `/api/auth/register`        | Register a new user.                  | No        |
| `POST` | `/api/auth/login`           | Log in an existing user.              | No        |
| `POST` | `/api/auth/forgot-password` | Send a password reset link.           | No        |
| `POST` | `/api/auth/reset-password/:token` | Reset the user's password.      | No        |
| `GET`  | `/api/expenses`             | Get all expenses for the logged-in user. | Yes       |
| `POST` | `/api/expenses`             | Add a new expense.                    | Yes       |
| `DELETE`| `/api/expenses/:id`        | Delete an expense by its ID.          | Yes       |

---
