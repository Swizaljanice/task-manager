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
  const tasks = await Task.find().sort({ createdAt: -1 }).lean(); // Convert Mongoose docs to plain objects

  return tasks.map((task): TaskType => ({
    _id: (task._id as any).toString(), // ✅ Convert ObjectId to string
    title: task.title,
    description: task.description,
    dueDate: task.dueDate instanceof Date ? task.dueDate.toISOString() : task.dueDate, // ✅ Ensure Date is converted
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

  // Get the updated task from MongoDB and explicitly cast the result to TaskType
  const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });  // Explicitly cast the result of lean() to TaskType

  if (!updatedTask) throw new Error("Task not found");

  // Safely handle the `dueDate`
  const dueDate: string | null = updatedTask.dueDate instanceof Date
    ? updatedTask.dueDate.toISOString()
    : updatedTask.dueDate;

  // Return the updated task with correct type
  return {
    _id: updatedTask._id.toString(), // `ObjectId` to string
    title: updatedTask.title,
    description: updatedTask.description,
    dueDate, // `dueDate` is either string or null
    completed: updatedTask.completed,
  };
}

export async function deleteTask(id: string) {
  await connectDB();
  await Task.findByIdAndDelete(id);
  revalidatePath("/");
}
