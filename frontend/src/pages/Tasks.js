import React, { useState } from "react";
import TaskColumns from "../components/TaskColumns";
import TaskForm from "../components/TaskForm";

function Tasks() {
    const [reload, setReload] = useState(false);
  
    const handleTaskAdded = () => {
      setReload(!reload);
    };
  
    return (
      <div>
        <h1>Task Management</h1>
        <TaskForm onTaskAdded={handleTaskAdded} />
        <TaskColumns reload={reload} />
      </div>
    );
  }

export default Tasks;
