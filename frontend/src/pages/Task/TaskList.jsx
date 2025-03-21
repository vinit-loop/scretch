// client/src/pages/TaskListPage.js
import React, { useState, useEffect } from "react";

import TaskList from "../../components/TaskList";
import { getAllTasks, getTasks } from "../../services/apiService";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [role, setItem] = useState(localStorage.getItem("role"));
  

  const loadTasks = async () => {
    try {
      const api = role === "admin" ? getAllTasks() : getTasks();
      const response = await api;
      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks", error);
    }
  };

  useEffect(() => {
    loadTasks();
    
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-300 to-blue-500 flex items-center justify-center">
    <div className="w-full max-w-4xl p-6 bg-gradient-to-r from-teal-100 via-gray-50 to-blue-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Task List
      </h2>
  
      <TaskList tasks={tasks} loadTasks={loadTasks} />
    </div>
  </div>
  
  
  );
};

export default TaskListPage;
