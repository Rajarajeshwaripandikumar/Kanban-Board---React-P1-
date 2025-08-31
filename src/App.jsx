import React from "react";
import TaskBoard from "./components/TaskBoard";
import TaskForm from "./components/TaskForm";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        {/*  Fancy Heading */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
             Kanban Board
          </h1>
          
          <div className="w-40 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto rounded-full mt-3"></div>
        </div>

        {/* Task Form & Board */}
        <div className="max-w-7xl mx-auto px-4">
          <TaskForm />
          <TaskBoard />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
