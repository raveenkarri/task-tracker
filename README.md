# Task Tracker Application

A full-stack **Task Management App** built with **React (frontend)** and **Node.js + Express (backend)** using **SQLite** as the database.  
This project was created as part of the **THworks Full-Stack Assignment** to demonstrate CRUD functionality, authentication, and simple insights.

---

## 🚀 Features

- **User Authentication**

  - Register and login using JWT.
  - Token stored securely in browser cookies.

- **Task Management**

  - Create, read, and update tasks.
  - Tasks include: `title`, `description`, `priority`, `status`, and `due_date`.
  - Filter by **priority** or **status**, and sort by **due date**.

- **Protected Routes**

  - Access to task pages is restricted to authenticated users.
  - JWT token verification on the backend.

- **Rule-Based Insights**
  - Simple analytics endpoint to summarize workload (“AI-like” logic).

---

## 🧩 Tech Stack

| Layer        | Technology                                                   |
| ------------ | ------------------------------------------------------------ |
| **Frontend** | React (Create React App), Axios, React Router DOM, js-cookie |
| **Backend**  | Node.js, Express, SQLite3                                    |
| **Database** | SQLite (single `.db` file)                                   |
| **Auth**     | JWT stored in cookies                                        |

---

## ⚙️ Installation and Setup

### 1. Clone the repository

    git clone https://github.com/raveenkarri/task-tracker.git
    cd task-tracker

### 2. Backend Setup

    cd backend
    npm install
    npm start


### This runs the Express server at --- http://localhost:8080

    The database (task_tracker.db) will be auto-created on first run.

### 3. Frontend Setup
    cd frontend
    npm install
    npm start


### This runs the React app at --- 📍 http://localhost:3000


### 🔗 API Endpoints

        **User Routes**

        Method	            Endpoint	                Description

        POST	            /user/register	            Register new user (fullname, username, password)
        POST	            /user/login	                Authenticate user and return JWT token

        **Task Routes (Protected)**

        Method	            Endpoint	                Description

        GET	                /tasks	                    List all tasks with optional filters (priority, status, order)
        POST	            /tasks	                    Create a new task
        PATCH	            /tasks/:id	                Update task status or priority

       ** Insights Route**
        Method	            Endpoint	                Description

        GET	                /insights	                Returns a brief “AI-like” summary of user tasks

### 🧱 Folder Structure
    task-tracker/
    ├── backend/
    │   ├── server.js
    │   ├── package.json
    │   ├── task_tracker.db
    |   ├── users.db
    |   ├── .env
    │   └── src/
    │       ├── routes/
    |       |   ├── loginRoutes.js
    |       |   └── taskRoutes.js
    |       ├── middleware/
    |       |   └── authMiddleware.js 
    │       └── db/
    │           ├── taskDb.js
    |           └── userDb.js
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── Header/
    │   │   │   ├── Login/
    │   │   │   ├── Register/
    │   │   │   ├── TaskForm/
    │   │   │   └── TaskList/
    │   │   ├── App.js
    │   │   └── ProtectedRoute.js
    │   ├── package.json
    │   └── public/
    │
    ├── README.md
    ├── DECLARATION.md
    └── notes.md

### 🧠 Smart Insight Example

    A possible example response from /insights:

{
  "summary": "You have 8 open tasks. 4 are High priority and 3 are due within the next 3 days."
}

### ✍️ Author

    Raveen Karri
    THworks Assignment 2025
