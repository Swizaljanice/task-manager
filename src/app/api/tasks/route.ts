import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";


export async function GET() {
  await connectDB();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}


export async function POST(req: Request) {
  await connectDB();
  const { title, description, dueDate } = await req.json();
  const newTask = new Task({ title, description, dueDate, completed: false });
  await newTask.save();
  return NextResponse.json(newTask);
}
