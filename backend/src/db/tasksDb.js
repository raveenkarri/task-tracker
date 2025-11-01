import sqlite3 from "sqlite3";
import { open } from "sqlite";

import path from "path";

const dbPath = path.join(process.cwd(), "task_tracker.db");
export let db = null;

export const initializeTasksDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log("Tasks Database connected");

    await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT CHECK(priority IN ('Low','Medium','High')) NOT NULL DEFAULT 'Medium',
    due_date TEXT NOT NULL,
    status TEXT CHECK(status IN ('Open','In Progress','Done')) NOT NULL DEFAULT 'Open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
    `);
     
    return db;
  } catch (err) {
    console.log("Error in database connection", err.message);
  }
};
