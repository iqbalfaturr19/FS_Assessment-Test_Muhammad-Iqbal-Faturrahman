import { useState, useEffect  } from 'react'
import { Pencil, Trash2, CircleX, CircleCheck  } from "lucide-react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { 
  getTodoTasks, 
  getCompletedTasks, 
  addTask, 
  updateTask, 
  deleteTask 
} from "./api";
import axios from "axios";

function App() {
  const [todoTasks, setTodoTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskInput, setTaskInput] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔄 Ambil semua task dari backend
  const fetchTasks = async () => {
    const todoData = await getTodoTasks();
    const completedData = await getCompletedTasks();
    setTodoTasks(todoData);
    setCompletedTasks(completedData);
  };

  // ➕ Tambah Task Baru
  const handleAddTask = async () => {
    
    if (!taskInput.trim()) return; // Cegah pengiriman task kosong
    
    try {
      await addTask({ title: taskInput, completed: false }); // Kirim data yang benar
      fetchTasks(); // Refresh daftar task
      setTaskInput(""); // Reset input setelah berhasil ditambahkan
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ❌ Hapus Task
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

   // Fungsi untuk membatalkan edit
   const handleCancel = () => {
    setTaskInput("");
    setEditingTaskId(null);
  };

  // 🔄 Edit Task
  const handleEdit = (task) => {
    setTaskInput(task.title);
    setEditingTaskId(task.id);
    setTaskStatus(task.completed);
  };
  
  const handleUpdate = async () => {
    if (!editingTaskId) return;
  
    try {
      await updateTask(editingTaskId, { title: taskInput, completed: taskStatus }); // Sesuaikan dengan API
      fetchTasks(); // Ambil ulang daftar tugas setelah update
      setTaskInput(""); // Kosongkan input
      setEditingTaskId(null); // Reset mode edit
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ✅ Tandai Task sebagai Selesai
  const handleCompleteTask = async (task) => {
    try {
      await updateTask(task.id, { 
        title: task.title, 
        completed: !task.completed // Toggle status completed
      });
      fetchTasks(); // Refresh daftar task setelah update
    } catch (error) {
      console.error("Error updating task:", error);
    }
};

  return (
    <div className="flex items-center bg-white w-screen justify-center min-h-screen bg-gray-100">
      <div className="w-106 p-6">
        <h1 className="text-5xl font-normal text-center mb-4 text-black">Task Management</h1>

        {/* Input & Button */}
        <label className="block mb-2 text-sm font-medium text-black">Title</label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="border border-black p-2 flex-1 rounded-lg bg-white focus:outline-none text-black"
          />
        </div>
        <div className="mb-4 justify-center flex space-x-2">
          {editingTaskId ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-orange-400 text-black text-sm font-normal px-3 py-1 rounded-lg hover:bg-orange-300"
              >
                Update Task
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-400 text-white text-sm font-normal px-3 py-1 rounded-lg hover:bg-red-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="bg-blue-350 text-black text-sm font-normal px-3 py-1 rounded-lg hover:bg-blue-300" onClick={handleAddTask}>
              Add Task
            </button>
          )}
        </div>

        {/* List Tugas */}
        <label className="block mb-2 text-sm font-bold text-black">Ongoing Task</label>
        <div className="space-y-2">
          {todoTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center border p-3 bg-todo text-black rounded-lg"
            >
              <div className="justify-between w-full">
                <div className="flex items-center space-x-2">
                  <p className="">{task.title}</p>
                  <Pencil className="w-4 h-4 text-black cursor-pointer hover:text-gray-900" onClick={() => handleEdit(task)}/>
                </div>
                <p className="text-xs text-black whitespace-nowrap mt-1">{task.created_at}</p>
              </div>
              <div className="flex">
                <CircleX  className="w-4 h-4 text-black cursor-pointer hover:text-gray-900" onClick={() => handleDeleteTask(task.id)}/>
                <div className="rounded-full w-4 h-4 flex items-center border border-black bg-white" onClick={() => handleCompleteTask(task)}></div>
              </div>
            </div>
          ))}
        </div>

        {/* List Completed */}
        <label className="block mb-2 mt-2 text-sm font-bold text-black">Completed Task</label>
        <div className="space-y-2">
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center border p-3 bg-todo text-black rounded-lg"
            >
              <div className="justify-between w-full">
                <div className="flex items-center space-x-2">
                  <p className="line-through">{task.title}</p>
                  <Pencil className="w-4 h-4 text-black cursor-pointer hover:text-gray-900" onClick={() => handleEdit(task)}/>
                </div>
                <p className="text-xs text-black whitespace-nowrap mt-1">{task.created_at}</p>
              </div>
              <div className="flex">
                <CircleX  className="w-4 h-4 text-black cursor-pointer hover:text-gray-900" onClick={() => handleDeleteTask(task.id)}/>
                <CircleCheck  className="w-4 h-4 text-black cursor-pointer hover:text-gray-900" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
