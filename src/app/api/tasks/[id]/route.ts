import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";


export async function PUT(req: Request, context: { params: { id: string } }) {
  await connectDB();
  

  const { completed } = await req.json();
  
 
  const updatedTask = await Task.findByIdAndUpdate(context.params.id, { completed }, { new: true });


  if (!updatedTask) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Task updated successfully", task: updatedTask });
}


export async function DELETE(req: Request, context: { params: { id: string } }) {
  await connectDB();
  

  const deletedTask = await Task.findByIdAndDelete(context.params.id);

  if (!deletedTask) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Task deleted successfully" });
}
