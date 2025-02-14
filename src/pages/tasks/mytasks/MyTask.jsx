import React, { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import UseTasks from "../../../hooks/tasks/UseTasks";
import AssignedTo from "../../../components/tasks/AssignedTo";
import { Stack } from "@mui/system";
import TaskStatus from "../../../components/task-statuses/TaskStatus";

const ResizableColumn = ({ children, width, onResize }) => {
  return (
    <ResizableBox
      width={width}
      height={10}
      axis="x"
      resizeHandles={["e"]}
      onResizeStop={(e, { size }) => onResize(size.width)}
    >
      <div style={{ width: "100%", overflow: "hidden" }}>{children}</div>
    </ResizableBox>
  );
};

function MyTask() {
  const { tasks, loading, handleTasks } = UseTasks();
  const [columns, setColumns] = useState([
    { key: "title", label: "დასახელება", width: 500 },
    { key: "status", label: "სტატუსი", width: 500 },
    { key: "assigned_to", label: "მიმაგრებულია", width: 400 },
  ]);

  useEffect(() => {
    handleTasks();
  }, [tasks]);

  const handleResize = (index, newWidth) => {
    const newColumns = [...columns];
    newColumns[index].width = newWidth;
    setColumns(newColumns);
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th
              key={col.key}
              style={{
                width: col.width,
                border: "1px solid #ddd",
                padding: "8px",
              }}
            >
              <ResizableColumn
                width={col.width}
                onResize={(newWidth) => handleResize(index, newWidth)}
              >
                {col.label}
              </ResizableColumn>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tasks &&
          tasks.map((task) => {
            return (
              <>
                <tr height="50px">
                  <td>{task.title}</td>
                  <td>
                    <TaskStatus params={task} />
                  </td>
                  <td>
                    <Stack direction={"row"} gap={"3px"}>
                      {task.assignedUsers.map((emp) => {
                        return (
                          <>
                            <AssignedTo emp={emp} taskId={task.id} />
                          </>
                        );
                      })}
                    </Stack>
                  </td>
                </tr>
              </>
            );
          })}
      </tbody>
    </table>
  );
}

export default MyTask;
