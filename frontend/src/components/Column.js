import React from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import { updateTaskStatus } from "../api/api"; // Import update function
import "./ColumnStyle.css";

function Column({ name, statusId, tasks, onTaskUpdated }) {
  // Enable drop functionality
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: async (item) => {
      if (item.statusId !== statusId) {
        await updateTaskStatus(item.id, statusId);
        onTaskUpdated(); // Refresh tasks
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`column ${isOver ? "highlight" : ""}`}>
      <h2>{name}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onTaskDeleted={onTaskUpdated} />
      ))}
    </div>
  );
}

export default Column;
