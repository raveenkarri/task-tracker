import sqlite3 from "sqlite3";
import { open } from "sqlite";

import path from "path";


const dbPath = path.join(process.cwd(), "users.db");

export let userDB = null;

export const initializeUsersDb = async () => {
  try {
    userDB = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log("Users Database connected");

    await userDB.run(`
    CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname text not null,
    username text not null unique,
    password text not null)
    `);
     
    return userDB;

  } catch (err) {
    console.log("Error in database connection", err.message);
    process.exit(1)
  }
};

