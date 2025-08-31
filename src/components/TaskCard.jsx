import React, { useState } from "react";
import TaskModal from "./TaskModal";

const TaskCard = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);

  const priorities = {
    High: { border: "border-red-500", badge: "bg-red-100 text-red-700" },
    Medium: { border: "border-yellow-500", badge: "bg-yellow-100 text-yellow-700" },
    Low: { border: "border-green-400", badge: "bg-green-100 text-green-700" },
  };

  const priority = priorities[task.priority] || priorities["Low"];

  return (
    <>
      <div
        className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${priority.border} cursor-pointer hover:shadow-lg transition`}
        onClick={() => setIsOpen(true)}
      >
        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-lg">{task.title}</h3>

        {/* Description */}
        {task.desc && (
          <p className="text-sm text-gray-500 line-clamp-2">{task.desc}</p>
        )}

        {/* Badges Section */}
        <div className="flex flex-wrap gap-2 mt-3">
          {/* Priority */}
          <span className={`text-xs px-2 py-1 rounded-full ${priority.badge}`}>
            ⚡ {task.priority}
          </span>

          {/* Status */}
          <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
            📌 {task.status}
          </span>

          {/* Due Date */}
          {task.dueDate && (
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
              📅 {task.dueDate}
            </span>
          )}

          {/* Tags */}
          {task.tags?.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Modal for editing */}
      {isOpen && <TaskModal task={task} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default TaskCard;
