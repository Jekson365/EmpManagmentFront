import React, { useContext, useEffect, useState } from "react";
import UseCurrentTask from "../../../hooks/tasks/UseCurrentTask";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UpdateTaskStatus from "../../../components/task-statuses/UpdateTaskStatus";
import { CurrentUserContext } from "../../../App";
import UseUpdateDueDate from "../../../hooks/tasks/UseUpdateDueDate";
import TaskCommnets from "./TaskCommnets";
import CreateComment from "./CreateComment";

function CurrentTask({ taskId, setCurrentTaskId, handleUpdateStatus }) {
  const { task, loading, handleCurrentTask } = UseCurrentTask();
  const { handleDueDateUpdate } = UseUpdateDueDate();
  const [dueDate, setDueDate] = useState("");
  const { user, page, setPage } = useContext(CurrentUserContext);

  const handleReload = (taskId, statusId, status) => {
    setCurrentTaskId(null);
    handleUpdateStatus(taskId, statusId, status);
  };

  useEffect(() => {
    if (taskId) {
      handleCurrentTask(taskId);
    }
  }, [taskId]);

  const handleDueDate = async (e) => {
    const value = e.target.value;
    if (!value) return;

    const converted = new Date(value).toLocaleTimeString();
    try {
      await handleDueDateUpdate({ taskId, endDate: converted });
      setDueDate(new Date(value).toISOString().slice(0, 16));
    } catch (err) {
      console.error("Error updating due date:", err);
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="cover">
            <div className="current-task-container">
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Box></Box>
                <Box
                  className="close-icon-button"
                  onClick={() =>
                    handleReload(task.id, task.statusId, task.status)
                  }
                >
                  <CloseIcon />
                </Box>
              </Stack>
              <Grid container justifyContent={"space-between"} display={"flex"}>
                <Grid item xs={8}>
                  <Stack direction={"column"} gap={"10px"}>
                    <Stack
                      direction={"row"}
                      pr={3}
                      justifyContent={"flex-start"}
                      gap={"10px"}
                    >
                      <UpdateTaskStatus
                        _currentStatusName={task.status}
                        currentTaskId={task.id}
                        _currentStatusId={task.statusId}
                      />
                      <Stack
                        className="datetime-cover"
                        direction={"row"}
                        gap={"5px"}
                        alignItems={"center"}
                      >
                        {/* <Typography className="deadline-title"> */}
                        {/* {dueDate || new Date(task.endDate).toLocaleString()} */}
                        {/* </Typography> */}
                        <input
                          onChange={(e) => handleDueDate(e)}
                          type="datetime-local"
                          className="datetime-input"
                          value={
                            dueDate ||
                            new Date(task.endDate).toISOString().slice(0, 16)
                          }
                        />
                      </Stack>
                    </Stack>
                    <Typography variant="h5">{task?.title}</Typography>
                    <Typography pr={3}>{task.description}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack
                    direction={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                    gap={"10px"}
                  >
                    <TaskCommnets taskId={task.id} />
                    <CreateComment userId={user.id} taskId={task.id} />
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CurrentTask;
