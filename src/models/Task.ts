import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  dueDate?: Date | null;
  completed: boolean;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, default: null },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
