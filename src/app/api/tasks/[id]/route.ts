import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const { completed } = await req.json();
  await Task.findByIdAndUpdate(params.id, { completed });
  return NextResponse.json({ message: "Task updated" });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Task.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Task deleted" });
}
