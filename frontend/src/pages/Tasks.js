import React, { useState } from "react";
import TaskColumns from "../components/TaskColumns";
import TaskForm from "../components/TaskForm";

function Tasks() {
    const [reload, setReload] = useState(false);
  
    const handleReload = () => {
        setReload(prev => !prev);
    };
  
    return (
      <div>
        <h1>Task Management</h1>
        <TaskForm onTaskAdded={handleReload} />
        <TaskColumns reload={reload} onTaskDeleted={handleReload}/>
      </div>
    );
  }

export default Tasks;
