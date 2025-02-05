"use server";

import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

// Define the TaskType interface with proper types
interface TaskType {
  _id: string;
  title: string;
  description: string;
  dueDate: string | null;
  completed: boolean;
}

// Fetch all tasks, ensuring dueDate is properly handled as a string or null



export async function getTasks(): Promise<TaskType[]> {
  await connectDB();
  const tasks = await Task.find().sort({ createdAt: -1 }).lean();

  return tasks.map((task) => ({
    _id: task._id instanceof mongoose.Types.ObjectId ? task._id.toString() : String(task._id), // ✅ Convert _id to string
    title: task.title,
    description: task.description,
    dueDate: task.dueDate instanceof Date ? task.dueDate.toISOString() : task.dueDate || null, // ✅ Ensure dueDate is string or null
    completed: task.completed,
    createdAt: task.createdAt ? new Date(task.createdAt).toISOString() : null, // ✅ Convert createdAt
    updatedAt: task.updatedAt ? new Date(task.updatedAt).toISOString() : null, // ✅ Convert updatedAt
  }));
}



// Create a new task, handling dueDate correctly
export async function createTask(title: string, description: string, dueDate: string | null) {
  await connectDB();
  const newTask = await Task.create({ title, description, dueDate });
  revalidatePath("/"); // Revalidate the path to refresh the data
  return newTask;
}

// Update an existing task and return the updated task with proper dueDate handling
export async function updateTask(id: string, completed: boolean): Promise<TaskType> {
    await connectDB();
  
    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true }).lean() as TaskType | null;
  
    if (!updatedTask) throw new Error("Task not found");
  
    return {
      _id: updatedTask._id.toString(),
      title: updatedTask.title,
      description: updatedTask.description,
      dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate).toISOString() : null,
      completed: updatedTask.completed,
    };
  }
  

// Delete a task by its id and revalidate the path
export async function deleteTask(id: string): Promise<void> {
  await connectDB();
  await Task.findByIdAndDelete(id);
  revalidatePath("/"); // Revalidate the path to refresh the data
}
