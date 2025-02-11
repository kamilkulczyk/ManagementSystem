import React, { useEffect, useState } from "react";
import { getColumns, getTasks } from "../api/api";
import Column from "./Column";
import { DndProvider } from "react-dnd"; // Import Drag-and-Drop provider
import { HTML5Backend } from "react-dnd-html5-backend";
import "./TaskColumnStyle.css";

function TaskColumns({ reload }) {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

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
  }, [reload]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-columns">
        {columns.length === 0 ? (
          <p>No columns available.</p>
        ) : (
          columns.map((column) => (
            <Column
              key={column.id}
              name={column.name}
              statusId={column.statusId} // ✅ Pass statusId
              tasks={tasks.filter((task) => task.statusId === column.statusId)}
              onTaskUpdated={fetchData} // ✅ Refresh tasks on update
            />
          ))
        )}
      </div>
    </DndProvider>
  );
}

export default TaskColumns;
