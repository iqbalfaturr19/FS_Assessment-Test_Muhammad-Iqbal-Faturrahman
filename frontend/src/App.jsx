import { useState, useEffect  } from 'react'
import { Pencil, Trash2, CircleX, CircleCheck  } from "lucide-react";
import './App.css'
import { 
  getTodoTasks, 
  getCompletedTasks, 
  addTask, 
  updateTask, 
  deleteTask 
} from "./api";

function App() {
  const [todoTasks, setTodoTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskInput, setTaskInput] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const todoData = await getTodoTasks();
    const completedData = await getCompletedTasks();
    setTodoTasks(todoData);
    setCompletedTasks(completedData);
  };

  const handleAddTask = async () => {
    
    if (!taskInput.trim()){
      alert("Task tidak boleh kosong!");
      return;
    }
    try {
      await addTask({ title: taskInput, completed: false });
      fetchTasks();
      setTaskInput("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  
  const handleDeleteTask = async (id) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus tugas ini?");
    
    if (!isConfirmed) return;

    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
};

   const handleCancel = () => {
    setTaskInput("");
    setEditingTaskId(null);
  };

  const handleEdit = (task) => {
    setTaskInput(task.title);
    setEditingTaskId(task.id);
    setTaskStatus(task.completed);
  };
  
  const handleUpdate = async () => {
    if (!editingTaskId){
      alert("Task tidak ditemukan");
      return;
    }
  
    try {
      await updateTask(editingTaskId, { title: taskInput, completed: taskStatus });
      fetchTasks();
      setTaskInput("");
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      await updateTask(task.id, { 
        title: task.title, 
        completed: !task.completed
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const formatDateWIB = (dateStr) => {
    const date = new Date(dateStr);
    date.setHours(date.getHours() + 7);

    const options = { 
      day: "2-digit", 
      month: "long", 
      year: "numeric", 
      hour: "2-digit", 
      minute: "2-digit", 
      hour12: false 
    };
    
    return date.toLocaleString("id-ID", options);
  };

  return (
    <div className="flex items-center bg-white w-screen justify-center min-h-screen bg-gray-100">
      <div className="w-106 p-6">
        <h1 className="text-5xl font-normal text-center mb-4 text-black">Task Management</h1>

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
                <p className="text-xs text-black whitespace-nowrap mt-1">
                {formatDateWIB(task.created_at)}
                </p>
              </div>
              <div className="flex">
                <CircleX  className="w-4 h-4 text-black cursor-pointer hover:text-gray-900" onClick={() => handleDeleteTask(task.id)}/>
                <div className="rounded-full w-4 h-4 flex items-center border border-black bg-white" onClick={() => handleCompleteTask(task)}></div>
              </div>
            </div>
          ))}
        </div>

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
                <p className="text-xs text-black whitespace-nowrap mt-1">
                  {formatDateWIB(task.created_at)}
                </p>
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
