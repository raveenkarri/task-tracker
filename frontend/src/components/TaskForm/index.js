import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Open");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = Cookies.get("jwtToken");
    if (!token) {
      setError("You must be logged in to create a task");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/tasks",
        {
          title,
          description,
          priority,
          due_date: dueDate,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Task created successfully!");

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setStatus("Open");
      setDueDate("");

    
    } catch (err) {
      console.error(err);
      setError("Failed to create task. Please check your input or token.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "left" }}>
        <button onClick={()=>navigate("/")}>My Tasks</button>
      <h2 style={{ textAlign: "center" }}>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", minHeight: "80px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Priority:</label>
          <br />
          <label>
            <input
              type="radio"
              name="priority"
              value="Low"
              checked={priority === "Low"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Low
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="Medium"
              checked={priority === "Medium"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="High"
              checked={priority === "High"}
              onChange={(e) => setPriority(e.target.value)}
            />
            High
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Status:</label>
          <br />
          <label>
            <input
              type="radio"
              name="status"
              value="Open"
              checked={status === "Open"}
              onChange={(e) => setStatus(e.target.value)}
            />
            Open
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="In Progress"
              checked={status === "In Progress"}
              onChange={(e) => setStatus(e.target.value)}
            />
            In Progress
          </label>{" "}
          <label>
            <input
              type="radio"
              name="status"
              value="Done"
              checked={status === "Done"}
              onChange={(e) => setStatus(e.target.value)}
            />
            Done
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button
          type="submit"
          style={{ padding: "10px 20px", width: "100%", marginTop: "10px" }}
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
