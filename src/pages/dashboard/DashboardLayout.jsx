import {
  Box,
  CircularProgress,
  Grid,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TaskItem from "./items/TaskItem";
import "../../styles/dashboard.scss";
import UseTasks from "../../hooks/tasks/UseTasks";
import UseUserTasks from "../../hooks/dashboard/UseUserTasks";
import { CurrentUserContext } from "../../App";
import UseNoteByUser from "../../hooks/notes/UseNoteByUser";
import CurrentTask from "../tasks/current-task/CurrentTask";
import Profile from "./profile/Profile";

function DashboardLayout() {
  const { result, loading, handleUserTasks } = UseUserTasks();
  const [currentTaskId, setCurrentTaskUd] = useState({});
  const { notes, notesLoading, handleNotes } = UseNoteByUser();
  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    handleUserTasks(user.id);
    handleNotes(user.id);
  }, []);
  return (
    <>
      {currentTaskId != null ? (
        <>
          <CurrentTask
            taskId={currentTaskId}
            setCurrentTaskId={setCurrentTaskUd}
          />
        </>
      ) : null}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container height={"90vh"} direction={"column"}>
            <Grid item sx={{ flex: 1 }}>
              <Profile />
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <Grid container columnSpacing={1}>
                <Grid item xs={12}>
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
                            <div onClick={() => setCurrentTaskUd(e.id)}>
                              <TaskItem cla-ssName="task-item" params={e} />
                            </div>
                          </>
                        );
                      })}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default DashboardLayout;
