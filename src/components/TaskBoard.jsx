import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const TaskBoard = () => {
  const { tasks, updateTask } = useTasks();
  const columns = ["To Do", "In Progress", "Done"];

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const newStatus = columns[destination.droppableId];
    updateTask(draggableId, { status: newStatus });
  };

  // 🎨 custom background colors per column
  const columnColors = {
    "To Do": "bg-orange-100",
    "In Progress": "bg-green-100",
    "Done": "bg-pink-100",
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {columns.map((col, index) => {
          const colTasks = tasks.filter((t) => t.status === col);
          return (
            <Droppable droppableId={`${index}`} key={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${columnColors[col]} rounded-2xl shadow-md p-4 min-h-[400px] flex flex-col transition`}
                >
                  {/* Neutral Column Header */}
                  <h2 className="text-lg font-normal text-gray-800 mb-4 flex items-center justify-between">
                    <span>{col}</span>
                    <span className="text-sm text-gray-500">
                      ({colTasks.length})
                    </span>
                  </h2>

                  {/* Tasks */}
                  {colTasks.map((task, idx) => (
                    <Draggable key={task.id} draggableId={task.id} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-3"
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
