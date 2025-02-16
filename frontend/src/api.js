import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getTodoTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks/todo`);
  return response.data;
};

export const getCompletedTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks/completed`);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(`${API_URL}/tasks/`, task);
  return response.data;
};

export const updateTask = async (id, updatedTask) => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};
