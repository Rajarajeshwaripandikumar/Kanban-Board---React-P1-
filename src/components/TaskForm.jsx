import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskForm = () => {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      desc,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      status,
      priority,
      dueDate,
    });

    // reset form
    setTitle("");
    setDesc("");
    setTags("");
    setStatus("To Do");
    setPriority("Low");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-3 p-4 bg-white rounded-lg shadow-md mb-6"
    >
      <input
        className="flex-1 border rounded-lg px-3 py-2"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="flex-1 border rounded-lg px-3 py-2"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="date"
        className="border rounded-lg px-3 py-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        className="flex-1 border rounded-lg px-3 py-2"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <select
        className="border rounded-lg px-3 py-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <select
        className="border rounded-lg px-3 py-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
