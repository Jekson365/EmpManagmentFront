import { Grid } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import TaskItems from "./columns/TaskItems";
import Employees from "./columns/Employees";
import "../../styles/tasks.scss";

export const AssignTaskContext = createContext();
function Tasks() {
  const [assignTask, setAssignTask] = useState({ taskId: "", userId: "" });

  useEffect(() => {
    console.log(assignTask);
  }, [assignTask]);
  return (
    <>
      <AssignTaskContext value={{ assignTask, setAssignTask }}>
        <Grid container>
          <Grid item xs={9}>
            <TaskItems />
          </Grid>
          <Grid item xs={3}>
            <Employees />
          </Grid>
        </Grid>
      </AssignTaskContext>
    </>
  );
}

export default Tasks;
