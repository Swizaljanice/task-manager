// models/Task.ts
import mongoose, { Schema, Document } from "mongoose";

interface Task extends Document {
  title: string;
  description: string;
  dueDate: string | null;
  completed: boolean;
}

const taskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: false },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.models.Task || mongoose.model<Task>("Task", taskSchema);

export default Task;
