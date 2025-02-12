import React, { useContext, useEffect } from "react";
import UseUsers from "../../../hooks/users/UseUsers";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { AssignTaskContext } from "../Tasks";
import UseAssignTask from "../../../hooks/tasks/UseAssignTask";
import { Add } from "@mui/icons-material";

function Employees() {
  const { users, getUsers, loading } = UseUsers();
  const { assignTask, setAssignTask } = useContext(AssignTaskContext);
  const { handleTaskAssign } = UseAssignTask();
  const handleTaskAssing = (userId) => {
    handleTaskAssign({ taskId: assignTask.taskId, userId: userId });
    setAssignTask({ taskId: "", userId: "" });
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
                    <Box className="emp-list-item">
                      {assignTask.taskId != "" ? (
                        <>
                          <div
                            className="user-button"
                            onClick={() => handleTaskAssing(user.id)}
                          >
                            <Add />
                          </div>
                        </>
                      ) : null}
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
