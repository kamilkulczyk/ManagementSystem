import React from "react";
import { deleteTask } from "../api/api";
import "./TaskStyle.css"; // Import styles

function Task({ task, onTaskDeleted }) {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      try {
        await deleteTask(task.id);
        onTaskDeleted(); // ✅ Refresh tasks after deletion
      } catch (error) {
        alert("Failed to delete task.");
      }
    }
  };

  return (
    <div className="task">
      <button className="delete-button" onClick={handleDelete}>✖</button>
      <p>{task.title}</p>
    </div>
  );
}

export default Task;
