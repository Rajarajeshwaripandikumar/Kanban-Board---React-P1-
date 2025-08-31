import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

const Board = () => {
  const { tasks, updateTask } = useTasks();

  const columns = ["To Do", "In Progress", "Done"];

  // Handle drag end
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = columns[destination.droppableId];

    // Update task status + persist
    updateTask(draggableId, { status: newStatus });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {columns.map((col, index) => (
          <Droppable droppableId={`${index}`} key={col}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 rounded-2xl shadow-md p-4 min-h-[500px] flex flex-col"
              >
                <h2 className="text-xl font-bold text-gray-700 mb-4">{col}</h2>

                {tasks
                  .filter((t) => t.status === col)
                  .map((task, idx) => (
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
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
