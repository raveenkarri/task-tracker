import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import './index.css'

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
    <div className="taskform-container">
      <button className="taskform-back-btn" onClick={() => navigate("/")}>
        ← Back to My Tasks
      </button>

      <h2 className="taskform-title">Create Task</h2>

      <form className="taskform-form" onSubmit={handleSubmit}>
        <div className="taskform-group">
          <label>Title:</label>
          <input
            type="text"
            className="taskform-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="taskform-group">
          <label>Description:</label>
          <textarea
            className="taskform-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="taskform-group">
          <label>Priority:</label>
          <div className="taskform-radio-group">
            {["Low", "Medium", "High"].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  checked={priority === level}
                  onChange={(e) => setPriority(e.target.value)}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <div className="taskform-group">
          <label>Status:</label>
          <div className="taskform-radio-group">
            {["Open", "In Progress", "Done"].map((state) => (
              <label key={state}>
                <input
                  type="radio"
                  name="status"
                  value={state}
                  checked={status === state}
                  onChange={(e) => setStatus(e.target.value)}
                />
                {state}
              </label>
            ))}
          </div>
        </div>

        <div className="taskform-group">
          <label>Due Date:</label>
          <input
            type="date"
            className="taskform-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        {error && <p className="taskform-error">{error}</p>}
        {success && <p className="taskform-success">{success}</p>}

        <button type="submit" className="taskform-submit-btn">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
