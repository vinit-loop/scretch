// client/src/pages/EditTask.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import TaskForm from '../../components/TaskForm';
import { getTaskById } from '../../services/apiService';

const EditTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  const fetchTask = async () => {
    try {
      const response = await getTaskById(taskId);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task', error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const handleTaskUpdated = () => {
    navigate('/tasklist');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-300 to-blue-500 flex items-center justify-center">
    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Edit Task
      </h2>
      {task ? (
        <TaskForm task={task} onSubmit={handleTaskUpdated} />
      ) : (
        <p className="text-center text-gray-600">Loading task...</p>
      )}
    </div>
  </div>
  
  );
};

export default EditTask;
