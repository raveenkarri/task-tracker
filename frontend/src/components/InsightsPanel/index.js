import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import './index.css'

const InsightsPanel = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axios.get("http://localhost:8080/insights", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInsights(res.data.insights);
      } catch (err) {
        console.error("Error fetching insights:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, [token]);

  if (loading)
    return <p className="insight-loading">Loading insights...</p>;

  if (!insights)
    return <p className="insight-error">No insights available.</p>;

  return (
    <div className="insight-container">
      <div className="insight-header">
        <h2>Smart Insights</h2>
        <button
          className="insight-back-btn"
          onClick={() => navigate("/taskList")}
        >
          ← Back to Task List
        </button>
      </div>

      <div className="insight-summary-card">
        <p className="insight-summary-text">{insights.summary}</p>
      </div>

      <div className="insight-stats-grid">
        <div className="insight-stat-card">
          <h3>{insights.totalOpen}</h3>
          <p>Open Tasks</p>
        </div>

        <div className="insight-stat-card">
          <h3>{insights.dueSoon}</h3>
          <p>Due Soon (3 days)</p>
        </div>
      </div>

      <div className="insight-priority-section">
        <h4>Priority Breakdown</h4>
        <ul>
          {insights.priorityCounts.map((p) => (
            <li key={p.priority}>
              <span className="insight-priority-name">{p.priority}</span>
              <span className="insight-priority-count">{p.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsightsPanel;
