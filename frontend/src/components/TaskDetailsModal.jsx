import React from "react";
import "./TaskDetailsModalStyle.css";

function TaskDetailsModal({ task, assignedUser, onClose }) {
  if (!task) return null; // Do not render if task is null
    console.log("task: ", task);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task.title}</h2>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Assigned to:</strong> {assignedUser || "Unassigned"}</p>
        <p><strong>Created At:</strong> {new Date(task.creationTime).toLocaleString()}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
