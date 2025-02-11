import React, { useState, useEffect } from "react";
import { addTask, getStatuses, getUsers } from "../api/api";
import MessageBox from "./MessageBox";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [statusId, setStatusId] = useState("00000000-0000-0000-0000-000000000000"); // Default GUID
  const [userId, setUserId] = useState(""); // Selected User
  const [statuses, setStatuses] = useState([]); // Status list
  const [users, setUsers] = useState([]); // User list
  const [message, setMessage] = useState(""); // Success/Error message

  // Fetch Statuses and Users when component loads
  useEffect(() => {
    const fetchData = async () => {
      const statusData = await getStatuses();
      const userData = await getUsers();
      setStatuses(statusData);
      setUsers(userData);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      statusId,
      creationTime: new Date().toISOString(),
      assignedUser: userId || null, // Allow null users
    };

    try {
      await addTask(newTask);
      setMessage({ type: "success", text: "Task added successfully! ✅" });
      setTitle("");
      setDescription("");
      setStatusId("00000000-0000-0000-0000-000000000000");
      setUserId("");
      onTaskAdded(); // Refresh task list
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
        setMessage({ type: "error", text: error.response?.data?.message || "Error adding task ❌",});
        setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <MessageBox message={message} />

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* Status Dropdown */}
      <select value={statusId} onChange={(e) => setStatusId(e.target.value)}>
        <option value="00000000-0000-0000-0000-000000000000">Select Status</option>
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>

      {/* User Dropdown */}
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="">Assign to User (Optional)</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
