import {
  Add,
} from "@mui/icons-material";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UseTasks from "../../../hooks/tasks/UseTasks";
import { AssignTaskContext } from "../Tasks";
import TaskStatus from "../../../components/task-statuses/TaskStatus";
import AssignedTo from "../../../components/tasks/AssignedTo";
import CurrentTask from "../current-task/CurrentTask";

function TaskItems() {
  const { assignTask, setAssignTask } = useContext(AssignTaskContext);
  const { tasks, loading, setTasks, handleTasks } = UseTasks();
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    handleTasks();
  }, [assignTask]);
  useEffect(()=> {
    console.log(currentTaskId)
  },[currentTaskId])
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
              taskId={currentTaskId}
              setCurrentTaskId={setCurrentTaskId}
            />
          ) : null}
          <Grid
            className="task-item-container"
            container
            columnSpacing={5}
            rowSpacing={2}
            pr={5}
          >
            {tasks.map((task) => {
              return (
                <>
                  <Grid item xs={3}>
                    <Box className="task-item" width={"100%"}>
                      <TaskStatus params={task} />
                      <Stack direction={"column"} alignItems={"flex-start"}>
                        <Typography
                          onClick={() => setCurrentTaskId(task.id)}
                          variant="h4"
                          className="c-white title"
                        >
                          {task.title}
                        </Typography>
                      </Stack>
                      <Stack direction={"row"} gap={"3px"}>
                        {task.assignedUsers.map((emp) => {
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
