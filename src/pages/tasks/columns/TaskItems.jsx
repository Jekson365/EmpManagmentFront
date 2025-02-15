import { Add } from "@mui/icons-material";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UseTasks from "../../../hooks/tasks/UseTasks";
import { AssignTaskContext } from "../Tasks";
import TaskStatus from "../../../components/task-statuses/TaskStatus";
import AssignedTo from "../../../components/tasks/AssignedTo";
import CurrentTask from "../current-task/CurrentTask";
import UseCurrentTask from "../../../hooks/tasks/UseCurrentTask";
import UseTaskStatuses from "../../../hooks/task-statuss/UseTaskStatuses";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import UseFilterTask from "../../../hooks/tasks/UseFilterTask";

function TaskItems() {
  const { assignTask, setAssignTask } = useContext(AssignTaskContext);
  const { taskStatuses, handleTaskStatuses } = UseTaskStatuses();
  const { tasks, loading, setTasks, handleTasks } = UseTasks();
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    handleTasks();
  }, [assignTask, currentTaskId]);

  useEffect(() => {
  handleTaskStatuses();
  }, []);

  const handleUpdateStatus = (taskId, statusId, status) => {
    setTasks((prevTasks) => {
      prevTasks.map((task) => {
        task.id === taskId
          ? {
              ...task,
              statusId: statusId,
              status: status,
            }
          : task;
      });
    });
  };
  const updateTasks = (taskId, userId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              assignedUsers: task.assignedUsers.filter(
                (emp) => emp.id !== userId
              ),
            }
          : task
      )
    );
  };
  return (
    <>
      {loading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          {currentTaskId != null ? (
            <CurrentTask
              handleUpdateStatus={handleUpdateStatus}
              taskId={currentTaskId}
              setCurrentTaskId={setCurrentTaskId}
            />
          ) : null}
          <Stack direction={"row"} gap={"30px"}>
            {taskStatuses &&
              taskStatuses.map((e) => {
                return (
                  <>
                    <Stack
                      className="status-item"
                      gap={"5px"}
                      direction={"row"}
                      onClick={() => handleTaskFilter(e.id)}
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
          </Stack>
          <Grid
            mt={2}
            className="task-item-container"
            container
            columnSpacing={5}
            rowSpacing={2}
            pr={5}
          >
            {tasks &&
              tasks.map((task) => {
                return (
                  <>
                    <Grid item xs={12} sm={6} lg={3}>
                      <Box
                        className={`task-item task-background-status-${task.statusId}`}
                        width={"100%"}
                      >
                        {/* <TaskStatus params={task} /> */}
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
                                  updateTasks={updateTasks}
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
                            onClick={() =>
                              setAssignTask({ ...assignTask, taskId: task.id })
                            }
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
        </>
      )}
    </>
  );
}

export default TaskItems;
