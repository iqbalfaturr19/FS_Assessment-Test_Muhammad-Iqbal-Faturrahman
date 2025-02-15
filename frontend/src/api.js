import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Sesuaikan dengan alamat backend kamu

// ✅ Ambil semua task yang belum selesai (todo)
export const getTodoTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks/todo`);
  return response.data;
};

// ✅ Ambil semua task yang sudah selesai (completed)
export const getCompletedTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks/completed`);
  return response.data;
};

// ✅ Tambah task baru
export const addTask = async (task) => {
  const response = await axios.post(`${API_URL}/tasks/`, task);
  return response.data;
};

// ✅ Update task berdasarkan ID
export const updateTask = async (id, updatedTask) => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
  return response.data;
};

// ✅ Hapus task berdasarkan ID
export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};
