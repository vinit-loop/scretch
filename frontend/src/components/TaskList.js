import React from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "../services/apiService";

const TaskList = ({ tasks, loadTasks }) => {
  const navigate = useNavigate();

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleCompleteToggle = async (taskId, isCompleted) => {
    console.log(taskId, isCompleted);
    try {
      await updateTaskStatus(taskId, { completed: !isCompleted });
      loadTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6 px-4 sm:px-6 lg:px-8">
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task._id}
            className="p-6 border border-gray-300 rounded-xl shadow-lg bg-white transition-all transform hover:scale-105 hover:shadow-xl"
          >
            {/* Task Status Circle */}
            <div
              className={`w-4 h-4 rounded-full ${
                task?.completed ? "bg-green-400" : "bg-red-400"
              }`}
            ></div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                <p className="text-xs text-gray-500 mt-1">{task.status}</p>
              </div>

              <div className="flex items-center space-x-3">
                {/* Mark Complete Button */}
                <button
                  onClick={() => handleCompleteToggle(task._id, "Completed")}
                  className={`px-4 py-2 text-xs rounded-full transition-all duration-300 ease-in-out ${
                    task.completed
                      ? "bg-green-500 text-white hover:bg-green-600 cursor-not-allowed"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
                  disabled={task.completed} // Disable button when task is completed
                >
                  {task.completed ? "Completed" : "Mark Complete"}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/edit/${task._id}`)}
                  className="px-4 py-2 text-xs bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all duration-300"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-4 py-2 text-xs bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg">No records found</p>
      )}
    </div>
  );
};

export default TaskList;
