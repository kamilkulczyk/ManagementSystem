import React from "react";
import "./ColumnStyle.css"; // Import the stylesheet

import Task from "./Task";

function Column({ name, tasks, onTaskDeleted }) {
  return (
    <div className="column">
      <h2>{name}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onTaskDeleted={onTaskDeleted} />
      ))}
    </div>
  );
}

export default Column;

