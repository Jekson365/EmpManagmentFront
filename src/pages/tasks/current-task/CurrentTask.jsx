import React, { useContext, useEffect, useState } from "react";
import UseCurrentTask from "../../../hooks/tasks/UseCurrentTask";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UseTaskStatuses from "../../../hooks/task-statuss/UseTaskStatuses";
import UpdateTaskStatus from "../../../components/task-statuses/UpdateTaskStatus";
import { CurrentUserContext } from "../../../App";

function CurrentTask({ taskId, setCurrentTaskId, handleUpdateStatus }) {
  const { result, loading, handleCurrentTask } = UseCurrentTask();
  const { page, setPage } = useContext(CurrentUserContext);
  const arr = [1, 2, 3, 4, 5, 6];

  const handleReload = (taskId, statusId, status) => {
    setCurrentTaskId(null);
    handleUpdateStatus(taskId, statusId, status);
  };
  useEffect(() => {
    if (taskId) {
      handleCurrentTask(taskId);
    }
  }, [taskId]);

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
                    <UpdateTaskStatus
                      _currentStatusName={result.status}
                      currentTaskId={result.id}
                      _currentStatusId={result.statusId}
                    />
                    <Typography variant="h5">{result?.title}</Typography>
                    <Typography>{result.description}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack
                    direction={"column"}
                    alignItems={"flex-start"}
                    gap={"10px"}
                  >
                    <Stack
                      direction={"column"}
                      justifyContent={"space-between"}
                      alignItems="flex-start"
                      width={"100%"}
                      gap={"20px"}
                      className="comments"
                    >
                      {arr.map((e) => {
                        return (
                          <>
                            <div className="comment-box">
                              <Typography m={2}>კომენტარი...</Typography>
                            </div>
                          </>
                        );
                      })}
                    </Stack>
                    <Stack
                      className="make-comment"
                      direction={"row"}
                      justifyContent={"space-between"}
                      gap={"10px"}
                    >
                      <input type="text" style={{ width: "100%" }} />
                      <button>გაგზავნა</button>
                    </Stack>
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
