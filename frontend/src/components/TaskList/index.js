import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const TaskList = () => {
  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");

  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    order: "",
  });

  const fetchTasks = async () => {
    try {
      const params = {};
      if (filters.priority) params.priority = filters.priority;
      if (filters.status) params.status = filters.status;
      if (filters.order) params.order = filters.order;

      const res = await axios.get("http://localhost:8080/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const toggleOrder = () => {
    setFilters({
      ...filters,
      order:
        filters.order === "ASC"
          ? "DESC"
          : filters.order === "DESC"
          ? ""
          : "ASC",
    });
  };

  return (
    <div className="tasklist-container">
      <h2 className="tasklist-title">My Tasks</h2>

      <div className="tasklist-filters">
        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          className="tasklist-select"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="tasklist-select"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <button className="tasklist-sort-btn" onClick={toggleOrder}>
          {filters.order === ""
            ? "No Sorting"
            : filters.order === "ASC"
            ? "↑ Due Date Asc"
            : "↓ Due Date Desc"}
        </button>

        <button
          className="tasklist-add-btn"
          onClick={() => navigate("/taskForm")}
        >
          + Add Task
        </button>
      </div>

      <div className="tasklist-list">
        {tasks.length === 0 ? (
          <p className="tasklist-empty">No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div className="tasklist-card" key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>
                <strong>Priority:</strong> {task.priority}
              </p>
              <p>
                <strong>Status:</strong> {task.status}
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(task.due_date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      <button
        className="tasklist-insight-btn"
        onClick={() => navigate("/insights")}
      >
        Insights Panel
      </button>
    </div>
  );
};

export default TaskList;
