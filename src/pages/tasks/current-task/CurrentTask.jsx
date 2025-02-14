import React, { useEffect } from "react";
import UseCurrentTask from "../../../hooks/tasks/UseCurrentTask";
import { CircularProgress, Grid } from "@mui/material";

function CurrentTask({ taskId, setCurrentTaskId }) {
  const { currentTask, taskLoading, handleCurrentTask } = UseCurrentTask();
  useEffect(() => {
    handleCurrentTask(taskId);
  }, []);

  return (
    <>
      {taskLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div
            className="current-task-container"
            onClick={() => setCurrentTaskId(null)}
          >
            <Grid container justifyContent={"space-between"} display={"flex"}>
              <Grid item xs={6}>
                <h1>{currentTask && currentTask.title}</h1>
              </Grid>
              <Grid item xs={6}>
                <h1>hell oworld</h1>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </>
  );
}

export default CurrentTask;
