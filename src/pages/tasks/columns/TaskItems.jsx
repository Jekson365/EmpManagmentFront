import { Add } from "@mui/icons-material";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UseTasks from "../../../hooks/tasks/UseTasks";
import { AssignTaskContext, TaskItemContext } from "../Tasks";
import TaskStatus from "../../../components/task-statuses/TaskStatus";
import AssignedTo from "../../../components/tasks/AssignedTo";
import CurrentTask from "../current-task/CurrentTask";
import UseCurrentTask from "../../../hooks/tasks/UseCurrentTask";
import UseTaskStatuses from "../../../hooks/task-statuss/UseTaskStatuses";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import UseFilterTask from "../../../hooks/tasks/UseFilterTask";
import CloseIcon from "@mui/icons-material/Close";
function TaskItems() {
  const [currentTaskId, setCurrentTaskId] = useState({});
  const { tasks, taskStatus, setTaskStatus, setTasks } =
    useContext(TaskItemContext);
  const { assignTask, setAssignTask } = useContext(AssignTaskContext);
  const { handleTasks } = useContext(TaskItemContext);
  const { taskStatuses, handleTaskStatuses } = UseTaskStatuses();

  const filterTaskItems = (statusId) => {
    setTaskStatus(statusId);
  };
  const handleRemoveFilter = () => {
    handleTasks(null);
  };
  const handleTaskAssign = (taskId) => {
    setAssignTask({ ...assignTask, taskId: taskId });
  };
  useEffect(() => {
    handleTaskStatuses();
  }, []);
  return (
    <>
      {1 == 2 ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          {currentTaskId != null ? (
            <>
              <CurrentTask
                taskId={currentTaskId}
                setCurrentTaskId={setCurrentTaskId}
              />
            </>
          ) : null}
          <Stack alignItems={"center"} direction={"row"} gap={"30px"}>
            {taskStatuses &&
              taskStatuses.map((e) => {
                return (
                  <>
                    <Stack
                      className="status-item"
                      gap={"5px"}
                      direction={"row"}
                      onClick={() => filterTaskItems(e.id)}
                    >
                      <div
                        className={`active-status-item task-background-status-${e.id}`}
                      ></div>
                      <RadioButtonCheckedIcon
                        className={`task-status-${e.id}`}
                      />
                      <Typography>{e.name}</Typography>
                    </Stack>
                  </>
                );
              })}
            <div>
              <div className="user-button" onClick={handleRemoveFilter}>
                <CloseIcon />
              </div>
            </div>
          </Stack>
          <Box className="task-item-container">
            <Grid mt={2} container columnSpacing={5} rowSpacing={2} pr={5}>
              {tasks &&
                tasks.map((task) => {
                  return (
                    <>
                      <Grid item xs={12} sm={6} lg={3}>
                        <Box
                          className={`task-item task-background-status-${task.statusId}`}
                          width={"100%"}
                        >
                          <Stack
                            direction={"column"}
                            gap={"5px"}
                            alignItems={"flex-start"}
                          >
                            <Typography
                              onClick={() => setCurrentTaskId(task.id)}
                              variant="h6"
                              fontWeight={"bold"}
                              className="c-white"
                            >
                              {task.title}
                            </Typography>
                            <Typography color="white">
                              {new Date(task.endDate).toLocaleString()}
                            </Typography>
                          </Stack>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            gap={"3px"}
                          >
                            {task.assignedUsers.slice(0, 3).map((emp) => {
                              return (
                                <>
                                  <AssignedTo
                                    emp={emp}
                                    taskId={task.id}
                                    setTasks={setTasks}
                                  />
                                </>
                              );
                            })}
                            {task.assignedUsers.length > 3 ? (
                              <>
                                <div
                                  className="assigned-to"
                                  style={{
                                    backgroundColor: "rgba(255,255,255,0.3)",
                                  }}
                                >
                                  +{task.assignedUsers.length - 3}
                                </div>
                              </>
                            ) : null}
                            <div
                              className="assigned-to icon"
                              style={{
                                border: "0",
                              }}
                              onClick={() => handleTaskAssign(task.id)}
                            >
                              <Add />
                            </div>
                          </Stack>
                        </Box>
                      </Grid>
                    </>
                  );
                })}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}

export default TaskItems;
