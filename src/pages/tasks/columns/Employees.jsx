import React, { useContext, useEffect, useState } from "react";
import UseUsers from "../../../hooks/users/UseUsers";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { AssignTaskContext, TaskItemContext } from "../Tasks";
import UseAssignTask from "../../../hooks/tasks/UseAssignTask";
import { Add } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CreateNote from "../../../components/notes/CreateNote";

function Employees() {
  const { users, getUsers, loading } = UseUsers();
  const [noteOpen, setNoteOpen] = useState({ open: false, userId: null });
  const { tasks, setTasks } = useContext(TaskItemContext);
  const { assignTask, setAssignTask } = useContext(AssignTaskContext);
  const { handleTaskAssign } = UseAssignTask();
  const handleTaskAssing = (user) => {
    handleTaskAssign({ taskId: assignTask.taskId, userId: user.id });
    const currentTask = tasks.find((t) => t.id == assignTask.taskId);
    const isAdded = currentTask.assignedUsers.find((au) => au.id == user.id);
    if (!isAdded) {
      currentTask.assignedUsers.push(user);
      setTasks(
        tasks.map((task) => (task.id === currentTask.id ? currentTask : task))
      );
      setAssignTask({ taskId: "", userId: "" });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {loading ? (
        <>
          {" "}
          <CircularProgress />
        </>
      ) : (
        <>
          <Stack
            direction={"column"}
            gap={"15px"}
            alignItems={"flex-start"}
            className="emp-list"
          >
            {users &&
              users.map((user) => {
                return (
                  <>
                    <Grid container display={"flex"} alignItems={"center"}>
                      <Grid item xs={1}>
                        {assignTask.taskId != "" ? (
                          <>
                            <div
                              className="user-button"
                              onClick={() => handleTaskAssing(user)}
                            >
                              <Add />
                            </div>
                          </>
                        ) : null}
                      </Grid>
                      <Grid item xs={11}>
                        <div
                          className={`note-container ${user.id == noteOpen.userId && noteOpen.open ? "note-container-active" : null}`}
                        >
                          <CreateNote
                            setNoteOpen={setNoteOpen}
                            userId={noteOpen.userId}
                          />
                        </div>
                        <Box className="emp-list-item">
                          <Stack direction={"row"}>
                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              width={"100%"}
                              p={1}
                            >
                              <Box
                                className="emp-item-image"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  borderRadius: "50px",
                                  backgroundImage: `url('${import.meta.env.VITE_API_URL}/uploads/${user.iconPath}')`,
                                  backgroundColor:
                                    user.iconPath == null ? "#f29f67" : null,
                                }}
                              >
                                <div
                                  className="note-icon"
                                  onClick={() =>
                                    setNoteOpen({
                                      userId: user.id,
                                      open: true,
                                    })
                                  }
                                >
                                  <EditNoteIcon />
                                </div>
                                {user.iconPath === null
                                  ? user.name[0] + " " + user.surname[0]
                                  : null}
                              </Box>
                              <Typography color="white">
                                {user.name} {user.surname}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                );
              })}
          </Stack>
        </>
      )}
    </>
  );
}

export default Employees;
