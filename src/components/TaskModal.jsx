import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { motion, AnimatePresence } from "framer-motion";

const TaskModal = ({ task, onClose }) => {
  const { updateTask, deleteTask } = useTasks();

  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.desc);
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [tags, setTags] = useState(task.tags?.join(", ") || "");
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);

  useEffect(() => {
    setTitle(task.title);
    setDesc(task.desc);
    setDueDate(task.dueDate || "");
    setTags(task.tags?.join(", ") || "");
    setStatus(task.status);
    setPriority(task.priority);
  }, [task]);

  const handleSave = () => {
    updateTask(task.id, {
      title,
      desc,
      dueDate,
      tags: tags.split(",").map((t) => t.trim()),
      status,
      priority,
    });
    onClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📝 Task Details
          </h2>

          {/* Task Title */}
          <input
            className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />

          {/* Description */}
          <textarea
            className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 transition"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Task description"
          />

          {/* Due Date */}
          <label className="text-sm font-medium text-gray-600">📅 Due Date</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 transition"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          {/* Tags */}
          <label className="text-sm font-medium text-gray-600">🏷️ Tags</label>
          <input
            className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 transition"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="comma, separated, tags"
          />

          {/* Status & Priority */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">📌 Status</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">⚡ Priority</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-5 py-2 rounded-lg shadow hover:bg-green-600 transition"
            >
               Save
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
               Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-400 transition"
            >
               Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;
