import React, { useEffect, useState } from "react";
import { getColumns, getTasks } from "../api/api";
import Column from "./Column";
import "./TaskColumnStyle.css";

function TaskColumns() {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false); // ✅ State to trigger reload

  const fetchData = async () => {
    try {
      const columnsData = await getColumns();
      const tasksData = await getTasks();
      setColumns(columnsData);
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reload]); // ✅ Reload when state changes

  return (
    <div className="task-columns">
      {columns.length === 0 ? (
        <p>No columns available.</p>
      ) : (
        columns.map((column) => (
          <Column
            key={column.id}
            name={column.name}
            tasks={tasks.filter((task) => task.statusId === column.statusId)}
            onTaskDeleted={() => setReload(!reload)} // ✅ Trigger refresh on deletion
          />
        ))
      )}
    </div>
  );
}

export default TaskColumns;
