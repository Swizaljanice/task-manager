# Task Manager App
A simple task management application built with Next.js, Server Actions, and MongoDB. This app allows users to add, update, mark as complete, and delete tasks.

# Features
- Add tasks with title, description, and due date
- Update task status (Mark as completed)
- Delete tasks
- Responsive UI with a pastel purple theme

# Tech Stack
- Frontend: Next.js 15 (App Router)
- Backend: Next.js Server Actions
- Database: MongoDB (Mongoose ODM)
- UI: Tailwind CSS

# Project Structure
```
task-manager/
│── src/
│   ├── app/
│   │   ├── page.tsx        <-- Main UI (Frontend)
│   │   ├── actions.ts      <-- Server Actions (Backend)
│   ├── lib/
│   │   ├── mongodb.ts      <-- MongoDB Connection
│   ├── models/
│   │   ├── Task.ts         <-- Mongoose Model
│── .env.local              <-- MongoDB URI
│── package.json
│── next.config.js
│── tsconfig.json
│── README.md               <-- This file
```


# Screenshots
![Add task](<Screenshot 2025-02-05 123608.png>)
![Description](<Screenshot 2025-02-05 123624.png>)
![Delete task](<Screenshot 2025-02-05 123639.png>)
