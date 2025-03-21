import axios from "axios";

const API_URL = "http://localhost:8000";

const userId = localStorage.getItem("user_id");

const getHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

export const getTasks = () =>
  axios.get(`${API_URL}/tasks`, {
    params: { userId },
    ...getHeaders(),
  });
export const getAllTasks = () =>
  axios.get(`${API_URL}/admin_tasks`, {
    ...getHeaders(),
  });

export const createTask = (taskData) =>
  axios.post(`${API_URL}/tasks`, { ...taskData, userId }, getHeaders());

export const getTaskById = async (taskId) => {
  return await axios.get(`${API_URL}/tasks/${taskId}`, {
    params: { userId },
    ...getHeaders(),
  });
};

export const updateTask = (id, taskData) =>
  axios.put(`${API_URL}/tasks/${id}`, { ...taskData, userId }, getHeaders());

export const toggleTaskCompletion = (id) =>
  axios.patch(`${API_URL}/tasks/${id}`, { userId }, getHeaders());

export const deleteTask = (id) =>
  axios.delete(`${API_URL}/tasks/${id}`, {
    headers: getHeaders().headers,
    params: { userId },
  });

export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await axios.patch(`${API_URL}/tasks/status/${taskId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task status", error);
    throw error;
  }
};
