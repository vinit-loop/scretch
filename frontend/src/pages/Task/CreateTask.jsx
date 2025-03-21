import React from "react";

import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/TaskForm";

const CreateTask = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/tasklist");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-300 to-blue-500 flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create New Task
        </h2>
        <TaskForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateTask;
