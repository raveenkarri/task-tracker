
---

## 🧩 **notes.md**

```markdown
# Design Notes and Implementation Details

This document explains the design rationale, decisions, and implementation flow for the **Task Tracker Application**.

---

## 🧱 1. Architecture Overview

The app follows a **modular full-stack architecture**:

- **Frontend:** React (Create React App)
- **Backend:** Express.js REST API
- **Database:** SQLite (via `sqlite3`)
- **Auth:** JWT stored in cookies
- **Communication:** Axios with Bearer token headers

The project is structured for separation of concerns — database logic, routes, and services are modularized inside `backend/src`.

---

## 🔐 2. Authentication Flow

- On login (`/user/login`), backend issues a **JWT**.
- The frontend stores the token using **js-cookie**.
- On logout, the cookie is removed.
- `ProtectedRoute` ensures that pages like `TaskList` and `TaskForm` are accessible only when a valid cookie token exists.

---

## 🧮 3. Database Schema (SQLite)

    ```sql
    CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT CHECK(priority IN ('Low','Medium','High')) NOT NULL DEFAULT 'Medium',
    due_date TEXT NOT NULL,
    status TEXT CHECK(status IN ('Open','In Progress','Done')) NOT NULL DEFAULT 'Open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    Each task record includes:

    Title and Description — basic info

    Priority and Status — workflow management

    Due Date — used for sorting

    Created At — automatic timestamp

### 📡 4. API Design
        
    /tasks

    **Supports filtering:**
        /tasks?priority=High
        /tasks?status=Done

    **Supports sorting:**

        /tasks?due_date&order=ASC
        /tasks?due_date&order=DESC

    /tasks/:id

    Updates task priority or status.

        /insights

### Aggregates open task data and builds a short summary like:

    “You have 10 open tasks. 5 are High priority, and 2 are due in the next 3 days.”

### ⚙️ 5. Frontend Design
    **Components**

    Component	            Purpose
    Login	                Authenticates user and stores JWT in cookies
    Register	            Creates new users and redirects to Login
    Header	                Displays Login/Logout based on token
    TaskList	            Lists and filters tasks
    TaskForm	            Creates new tasks
    ProtectedRoute	        Blocks access to protected pages without a token

    **Axios Configuration**

        Each protected request sends:
        headers: { Authorization: `Bearer ${token}` }

### 🔍 6. Insights Logic (Rule-Based)

        The /insights endpoint performs aggregation and creates a small natural-language summary.

    **Rules Used:**

        If more than 50% of open tasks are High priority → warn user.

        If more than 3 tasks are due in next 3 days → mention urgency.

        Always display total open task count.

### 🧩 7. Key Design Decisions

        Decision	            Reason

        SQLite	                Portable, single-file DB for easy testing
        Cookies                 for JWT	Persistent and secure login
        React                   Router + ProtectedRoute	Easy route protection logic
        Axios	                Cleaner request handling with headers & params
        Minimal CSS         	Focused on functionality, not design

### 🧠 8. Future Improvements

        Add pagination to task list.

        Implement search by task title.

        Add user-specific task ownership.

        Enhance insights with chart visualizations.

### ✍️ Author

        Raveen Karri
        Full-Stack Developer — THworks Assignment 2025