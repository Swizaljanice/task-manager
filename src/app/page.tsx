"use client";

import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./actions";
import { FaCheck, FaTrash } from "react-icons/fa";

interface TaskType {
  _id: string;
  title: string;
  description: string;
  dueDate: string | null;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((error) => console.error("Failed to load tasks:", error));
  }, []);

  async function handleAddTask() {
    try {
      await createTask(title, description, dueDate);
      setTitle("");
      setDescription("");
      setDueDate("");
      setTasks(await getTasks());
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  async function handleToggleComplete(id: string, completed: boolean) {
    try {
      console.log("Before toggle:", { id, completed });
      await updateTask(id, !completed);
      const updatedTasks = await getTasks();
      console.log("After server update:", updatedTasks);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteTask(id);
      setTasks(await getTasks());
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 to-purple-300 p-5">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border border-purple-300">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-6">
          Task Manager
        </h1>

        <div className="bg-purple-50 p-5 rounded-lg shadow-md border border-purple-200">
          <input
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full p-3 mt-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-3 mt-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 mt-4 rounded-lg transition duration-300"
          >
            Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-center text-purple-600 mt-4">No tasks found</p>
        ) : (
          <ul className="mt-6 space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-purple-100 rounded-lg shadow-md border border-purple-300"
              >
                <div>
                  <h3
                    className={`font-bold text-lg ${
                      task.completed ? "line-through text-gray-500" : "text-purple-800"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-purple-600">{task.description}</p>
                  <p className="text-sm text-gray-500">
                    {task.dueDate ? new Date(task.dueDate).toDateString() : "No due date"}
                  </p>

                  {task.completed && (
                    <div className="mt-2">
                      <p className="text-green-600 font-medium">
                        &quot;{task.title}&quot; is completed.
                      </p>
                      <p className="text-red-500 text-sm">
                        Click on the delete button if you wish to delete the task.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-3 md:mt-0">
                  <button onClick={() => handleToggleComplete(task._id, task.completed)}>
                    <FaCheck
                      className={`text-2xl ${
                        task.completed ? "text-green-500" : "text-purple-500"
                      }`}
                    />
                  </button>
                  <button onClick={() => handleDelete(task._id)} className="text-red-500">
                    <FaTrash className="text-2xl" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
