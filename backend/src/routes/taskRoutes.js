import express from "express";
import { db } from "../db/tasksDb.js";
import authenticationRoute from "../middleware/authMiddleware.js";

const router = express.Router();

//POST /tasks
router.post("/tasks", authenticationRoute, async (req, res) => {
  try {
    const { id } = req.user;
    const { title, description, priority, due_date, status } = req.body;
    if (!title || !priority || !due_date) {
      return res.status(404).json({ message: "All fields are Required!" });
    }
    const sql =
      "insert into tasks(user_id,title,description,priority,due_date,status) values(?,?,?,?,?,?)";
    const response = await db.run(sql, [
      id,
      title,
      description,
      priority,
      due_date,
      status,
    ]);

    res
      .status(201)
      .json({ message: "Task Added successfully", id: response.lastId });
  } catch (err) {
    console.log("Error", err.message);
    res.status(400).json({ Error: err.message });
  }
});

//GET /tasks
router.get("/tasks", authenticationRoute, async (req, res) => {
  try {
    const { priority, status, order } = req.query;
    const { id } = req.user;

    let conditions = ["user_id = ?"];
    let queries = [id];

    let sql = "select * from tasks";

    if (priority) {
      conditions.push("priority = ?");
      queries.push(priority);
    }
    if (status) {
      conditions.push("status = ?");
      queries.push(status);
    }
    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }
    if (order) {
      sql += ` order by due_date ${
        order.toUpperCase() === "DESC" ? "DESC" : "ASC"
      }`;
    }
    const tasks = await db.all(sql, queries);
    res.status(200).json({ tasks });
  } catch (err) {
    console.log("Error", err.message);
    res.status(400).json({ Error: err.message });
  }
});

//PATCH /tasks/:id
router.patch("/tasks/:id", authenticationRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;

    const task = await db.get("select * from tasks where id = ?", [id]);
    if (!task) {
      return res.status(404).json({ message: "Task not Found!" });
    }
    await db.run("Update tasks set priority = ?, status = ? where id = ?", [
      priority,
      status,
      id,
    ]);

    const updatedTask = await db.get("select * from tasks where id = ?", [id]);

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (err) {
    console.log("Error", err.message);
    res.status(400).json({ Error: err.message });
  }
});

//insights

router.get("/insights", authenticationRoute, async (req, res) => {
  try {
    const totalOpen = await db.get(
      "SELECT COUNT(*) as count FROM tasks WHERE status = 'Open'"
    );

    const priorityCounts = await db.all(`
      SELECT priority, COUNT(*) as count
      FROM tasks
      GROUP BY priority
    `);

    const dueSoon = await db.get(`
      SELECT COUNT(*) as count
      FROM tasks
      WHERE status = 'Open'
      AND DATE(due_date) <= DATE('now', '+3 days')
    `);

    let dominantPriority = "Medium";
    let maxCount = 0;
    priorityCounts.forEach((p) => {
      if (p.count > maxCount) {
        maxCount = p.count;
        dominantPriority = p.priority;
      }
    });

    let insight = `You have ${totalOpen.count} open tasks.`;
    if (dueSoon.count > 0)
      insight += ` ${dueSoon.count} ${
        dueSoon.count === 1 ? "task is" : "tasks are"
      } due within 3 days.`;
    insight += ` Most of your workload is ${dominantPriority} priority.`;

    res.status(200).json({
      insights: {
        totalOpen: totalOpen.count,
        priorityCounts,
        dueSoon: dueSoon.count,
        summary: insight,
      },
    });
  } catch (err) {
    console.error("Error generating insights:", err.message);
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

export default router;
