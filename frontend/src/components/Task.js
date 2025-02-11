import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import TaskDetailsModal from "./TaskDetailsModal";
import { deleteTask, getUsers } from "../api/api";
import "./TaskStyle.css";

function Task({ task, onTaskDeleted }) {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      try {
        await deleteTask(task.id);
        if (onTaskDeleted) {
          onTaskDeleted();
        }
      } catch (error) {
        alert("Failed to delete task.");
      }
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, statusId: task.statusId },
    canDrag: () => !showModal, // ✅ Disable dragging when modal is open
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [showModal]); // ✅ Recalculate when `showModal` changes

  return (
    <div
      ref={!showModal ? drag : null} 
      className={`task-item ${isDragging ? "dragging" : ""}`}
      style={{ cursor: showModal ? "default" : "grab" }} // ✅ Fix cursor issue
    >
      <div className="task-content">
        <h3 onClick={() => setShowModal(true)}>{task.title}</h3>
        <p className="assigned-user"><strong>{users.find(user => user.id === task.assignedUser)?.name || "Unassigned"}</strong></p>
      </div>
      <button className="delete-button" onClick={handleDelete}>🗑</button>

      {showModal && (
        <TaskDetailsModal task={task} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default Task;
