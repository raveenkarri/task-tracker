import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authenticationRoute from "../middleware/authMiddleware.js";

const router = express.Router();

import { db } from "../db/tasksDb.js";

router.post("/register", async (req, res) => {
  try {
    const { fullname, username, password } = req.body;

    if (!fullname || !username || !password) {
      return res.status(400).json({ message: "All fields are Mandatory" });
    }
    const user = await db.get("select * from users where username = ?", [
      username,
    ]);
    if (user) {
      return res.status(402).json({ message: "User Already Registered!" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const sql = "insert into users(fullname,username,password) values(?,?,?)";

    const dataResponse = await db.run(sql, [
      fullname,
      username,
      hashPassword,
    ]);
    res.status(201).json({
      id: dataResponse.lastId,
      message: "User Account created successfully",
    });
  } catch (err) {
    console.log("Here", err.message);
    res.status(500).json({ error: err.message });
  }
});

//get users
router.get("/users",authenticationRoute, async (req, res) => {
  const users = await db.all("select * from users");
  res.json({ users: users,payload:req.user });
});

//login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are Mandatory" });
    }
    const user = await db.get("select * from users where username = ?", [
      username,
    ]);
    if (!user) {
      return res.status(404).json({ message: "User not Found!" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(404).json({ message: "Password Not Matched!" });
    }
    const token = jwt.sign({ user }, process.env.JWT_TOKEN || "mySecreteKey", {
      expiresIn: "30d",
    });
    res.status(201).json({
      user: user.username,
      message: "User Login successfully",
      jwtToken: token,
    });
  } catch (err) {
    console.log("Here", err.message);
    res.status(500).json({ error: err.message });
  }
});
export default router;
