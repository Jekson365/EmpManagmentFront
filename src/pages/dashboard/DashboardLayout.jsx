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

function DashboardLayout() {
  const { result, loading, handleUserTasks } = UseUserTasks();
  const { notes, notesLoading, handleNotes } = UseNoteByUser();
  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    handleUserTasks(user.id);
    handleNotes(user.id);
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
                  {notesLoading ? (
                    <CircularProgress />
                  ) : (
                    <>
                      <Stack direction={"column"} gap={"5px"}>
                        {notes &&
                          notes.map((note) => {
                            return (
                              <>
                                <Box className="comment">
                                  <div
                                    className="user-icon"
                                    style={{
                                      backgroundImage: `url('${import.meta.env.VITE_API_URL}/uploads/${note.iconPath}')`,
                                    }}
                                  ></div>
                                  <div className="content">
                                    <div className="content-cover">
                                      {note.content}
                                    </div>
                                  </div>
                                </Box>
                              </>
                            );
                          })}
                      </Stack>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default DashboardLayout;
