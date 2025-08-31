import React from "react";
import TaskCard from "./TaskCard";
import { Draggable } from "react-beautiful-dnd";

const Column = ({ tasks }) => {
  return (
    <div className="flex-1">
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              className="mb-3"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard task={task} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default Column;
