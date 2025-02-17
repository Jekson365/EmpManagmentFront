import React, { useContext, useEffect, useState } from "react";
import UseCurrentTask from "../../../hooks/tasks/UseCurrentTask";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UseTaskStatuses from "../../../hooks/task-statuss/UseTaskStatuses";
import UpdateTaskStatus from "../../../components/task-statuses/UpdateTaskStatus";
import { CurrentUserContext } from "../../../App";
import UseUpdateDueDate from "../../../hooks/tasks/UseUpdateDueDate";
import TaskCommnets from "./TaskCommnets";
import CreateComment from "./CreateComment";

function CurrentTask({ taskId, setCurrentTaskId, handleUpdateStatus }) {
  const { result, loading, handleCurrentTask } = UseCurrentTask();
  const { handleDueDateUpdate } = UseUpdateDueDate();
  const [dueDate, setDueDate] = useState("");
  const [comments, setComments] = useState();
  const { user, page, setPage } = useContext(CurrentUserContext);

  const handleReload = (taskId, statusId, status) => {
    setCurrentTaskId(null);
    handleUpdateStatus(taskId, statusId, status);
  };

  const addCommentToState = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  useEffect(() => {
    if (taskId) {
      handleCurrentTask(taskId);
    }
  }, [taskId]);

  useEffect(() => {
    setComments(result?.comments);
  }, [result]);
  const handleDueDate = async (e) => {
    const value = e.target.value;
    if (!value) return;

    const converted = new Date(value).toISOString();
    try {
      await handleDueDateUpdate({ taskId, endDate: converted });
      setDueDate(value);
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
                    handleReload(result.id, result.statusId, result.status)
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
                      justifyContent={"space-between"}
                      gap={"10px"}
                    >
                      <UpdateTaskStatus
                        _currentStatusName={result.status}
                        currentTaskId={result.id}
                        _currentStatusId={result.statusId}
                      />
                      <Stack
                        direction={"row"}
                        gap={"5px"}
                        alignItems={"center"}
                      >
                        <Typography>
                          {dueDate || new Date(result.endDate).toLocaleString()}
                        </Typography>
                        <input
                          onChange={(e) => handleDueDate(e)}
                          type="datetime-local"
                          className="datetime-input"
                        />
                      </Stack>
                    </Stack>
                    <Typography variant="h5">{result?.title}</Typography>
                    <Typography pr={3}>{result.description}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack
                    direction={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                    gap={"10px"}
                  >
                    <TaskCommnets comments={comments} />
                    <CreateComment
                      userId={user.id}
                      taskId={result.id}
                      addCommentToState={addCommentToState}
                    />
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
