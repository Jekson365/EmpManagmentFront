import {
  Add,
  BackHand,
  Padding,
  PlusOne,
  PlusOneOutlined,
} from "@mui/icons-material";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import UseTasks from "../../../hooks/tasks/UseTasks";
import { AssignTaskContext } from "../Tasks";
import CloseIcon from "@mui/icons-material/Close";
import UseRemoveAssignedTask from "../../../hooks/tasks/UseRemoveAssignedTask";

function TaskItems() {
  const { assignTask, setAssignTask } = useContext(AssignTaskContext);
  const { tasks, loading, handleTasks } = UseTasks();
  const { result, handleRemoveAssigned } = UseRemoveAssignedTask();

  useEffect(() => {
    handleTasks();
    console.log(result);
  }, [assignTask, result]);
  return (
    <>
      {loading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          <Grid container columnSpacing={5} rowSpacing={2} pr={5}>
            {tasks.map((task) => {
              return (
                <>
                  <Grid item xs={3}>
                    <Box className="task-item" width={"100%"}>
                      <Stack direction={"column"} alignItems={"flex-start"}>
                        <Typography variant="h4" className="c-white title">
                          {task.title}
                        </Typography>
                        <Typography variant="h6" className="c-white description">
                          {task.description}
                        </Typography>
                      </Stack>
                      <Stack direction={"row"} gap={"3px"}>
                        {task.assignedUsers.map((emp) => {
                          return (
                          <>
                              <div
                                className="assigned-to"
                                style={{
                                  backgroundImage: `url('${import.meta.env.VITE_API_URL}/uploads/${emp.iconPath}')`,
                                  backgroundColor:
                                    emp.iconPath == null ? "#f29f67" : null,
                                }}
                              >
                                <div
                                  className="remove-icon"
                                  onClick={() =>
                                    handleRemoveAssigned({
                                      userId: emp.id,
                                      taskId: task.id,
                                    })
                                  }
                                >
                                  <CloseIcon />
                                </div>
                                {emp.iconPath == null
                                  ? emp.name[0] + "" + emp.surname[0]
                                  : null}
                                <Stack className="emp-info">
                                  <Typography>
                                    {emp.name} {emp.surname}
                                  </Typography>
                                </Stack>
                              </div>
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
