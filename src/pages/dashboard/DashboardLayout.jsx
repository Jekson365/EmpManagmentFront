import {
  Box,
  CircularProgress,
  Grid,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import TaskItem from "./items/TaskItem";
import "../../styles/dashboard.scss";
import UseTasks from "../../hooks/tasks/UseTasks";
import UseUserTasks from "../../hooks/dashboard/UseUserTasks";
import { CurrentUserContext } from "../../App";

function DashboardLayout() {
  const { result, loading, handleUserTasks } = UseUserTasks();
  const { user } = useContext(CurrentUserContext);
  useEffect(() => {
    handleUserTasks(user.id);
  }, []);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container columnSpacing={1}>
            <Grid item xs={9}>
              <Typography variant="h6">ჩემი თასქები</Typography>
              <Box
                mt={1}
                style={{
                  height: "400px",
                }}
                className="user-task-item-cover"
              >
                <Stack
                  direction={"column"}
                  gap={"10px"}
                  className="user-task-items"
                >
                  {result.map((e) => {
                    return (
                      <>
                        <TaskItem className="task-item" params={e} />
                      </>
                    );
                  })}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">ნოუთები</Typography>
              <Box className="note-item-cover" mt={1} height={"400px"}>
                <Box height={"100%"}>
                  <Stack direction={"column"} gap={"5px"}>
                    <Box className="comment">1</Box>
                    <Box className="comment">1</Box>
                    <Box className="comment">1</Box>
                    <Box className="comment">1</Box>
                    <Box className="comment">1</Box>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* <Grid container columnSpacing={3} rowSpacing={1} height={"400px"} style={{border:"5px solid red"}}>
            <Grid item xs={9} >
              <Typography variant="h6" className="header-title">
                შენი თასქები
              </Typography>
              <Box
                mt={1}
                height={"300px"}
                className="user-task-item-cover"
                sx={{
                  overflowY: "scroll",
                }}
              >
                <Stack
                  // direction={"column"}
                  gap={"10px"}
                  // justifyContent={'space-between'}
                  className="user-task-items"
                >
                  {result.map((e) => {
                    return (
                      <>
                        <TaskItem className="task-item" params={e} />
                      </>
                    );
                  })}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" className="header-title">
                ნოუთი
              </Typography>
              <Box mt={1} className="note-item" bgcolor={"red"} height={"300px"} >
                <Stack direction={"column"} gap={"5px"}>
                  <Box className="comment">1</Box>
                  <Box className="comment">1</Box>
                  <Box className="comment">1</Box>
                  <Box className="comment">1</Box>
                  <Box className="comment">1</Box>
                </Stack>
              </Box>
            </Grid>
          </Grid> */}
        </>
      )}
    </>
  );
}

export default DashboardLayout;
