import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import InsightsPanel from "./components/InsightsPanel";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

export const BASE_URL =  "http://localhost:8080"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TaskList />} />
          <Route path="/taskForm" element={<TaskForm />} />
          <Route path="/insights" element={<InsightsPanel/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
