"use server";

import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";


interface TaskType {
  _id: string;
  title: string;
  description: string;
  dueDate: string | null;
  completed: boolean;
}

export async function getTasks(): Promise<TaskType[]> {
    await connectDB();
    const tasks = await Task.find().sort({ createdAt: -1 }).lean(); 
  
    return tasks.map((task): TaskType => ({
      _id: (task._id as string).toString(), // Remove the 'any' casting here
      title: task.title,
      description: task.description,
      dueDate: task.dueDate instanceof Date ? task.dueDate.toISOString() : task.dueDate,
      completed: task.completed,
    }));
  }
  
export async function createTask(title: string, description: string, dueDate: string) {
  await connectDB();
  await Task.create({ title, description, dueDate });
  revalidatePath("/");
}

export async function updateTask(id: string, completed: boolean) {
    await connectDB();
  
    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true }).lean();  
  
    if (!updatedTask) throw new Error("Task not found");
  
    // Handle dueDate type correctly
    const dueDate: string | null = updatedTask.dueDate instanceof Date
      ? updatedTask.dueDate.toISOString()
      : updatedTask.dueDate;
  
    return {
      _id: updatedTask._id.toString(), // Convert _id to string
      title: updatedTask.title,
      description: updatedTask.description,
      dueDate,  // Ensure dueDate is string or null
      completed: updatedTask.completed,
    };
  }
  
export async function deleteTask(id: string) {
  await connectDB();
  await Task.findByIdAndDelete(id);
  revalidatePath("/");
}
