import { Grid } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import TaskItems from "./columns/TaskItems";
import Employees from "./columns/Employees";
import "../../styles/tasks.scss";
import UseTasks from "../../hooks/tasks/UseTasks";

export const AssignTaskContext = createContext();
export const TaskItemContext = createContext();
function Tasks() {
  const [assignTask, setAssignTask] = useState({ taskId: "", userId: "" });
  const [taskStatus, setTaskStatus] = useState(null);
  const { tasks, setTasks, handleTasks } = UseTasks();

  useEffect(() => {
    handleTasks(taskStatus);
  }, [taskStatus]);
  return (
    <>
      <TaskItemContext.Provider
        value={{ tasks, taskStatus, setTaskStatus, handleTasks, setTasks }}
      >
        <AssignTaskContext.Provider value={{ assignTask, setAssignTask }}>
          <Grid container>
            <Grid item xs={9}>
              <TaskItems tasks={tasks} setTaskStatus={setTaskStatus} />
            </Grid>
            <Grid item xs={3}>
              <Employees />
            </Grid>
          </Grid>
        </AssignTaskContext.Provider>
      </TaskItemContext.Provider>
    </>
  );
}

export default Tasks;
